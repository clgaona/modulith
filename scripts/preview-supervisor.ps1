param([switch]$Once)

$ErrorActionPreference = 'Stop'
$server = 'C:\Users\CRISTIAN\.codex\.chatgpt-projects\g-p-6ac3c74ed79c81919acc3c861c305719\creative-sprint\round-1\preview-server.cjs'
$node = 'C:\Users\CRISTIAN\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$logDirectory = Join-Path $PSScriptRoot '..\artifacts\preview'
$url = 'http://127.0.0.1:4317/index.html'
$mutex = New-Object System.Threading.Mutex($false, 'Local\ModulithPreview4317Supervisor')
$ownsMutex = $false

function Write-PreviewLog([string]$Message) {
    Add-Content -LiteralPath (Join-Path $logDirectory 'supervisor.log') -Value ('{0:o} {1}' -f (Get-Date), $Message)
}

function Test-Preview {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200 -and $response.Content.Contains('id="hero-title"')) { return 'ready' }
        return 'occupied'
    } catch {
        if ($_.Exception.Response) { return 'occupied' }
        return 'unavailable'
    }
}

try {
    $ownsMutex = $mutex.WaitOne(0)
    if (-not $ownsMutex) { exit 0 }
    New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null
    if (-not (Test-Path -LiteralPath $server -PathType Leaf)) { throw "Preview server missing: $server" }
    if (-not (Test-Path -LiteralPath $node -PathType Leaf)) {
        $installedNode = Get-Command node.exe -ErrorAction SilentlyContinue
        if (-not $installedNode) { throw 'Node.js runtime not found.' }
        $node = $installedNode.Source
    }
    Write-PreviewLog 'Supervisor started; monitoring localhost:4317.'
    $child = $null
    $lastState = ''
    do {
        $state = Test-Preview
        if ($state -eq 'unavailable') {
            # Never replace an unrelated listener or start duplicate server processes.
            $listener = Get-NetTCPConnection -LocalPort 4317 -State Listen -ErrorAction SilentlyContinue
            if ($listener) {
                $state = 'occupied'
            } elseif (-not $child -or $child.HasExited) {
                $child = Start-Process -FilePath $node -ArgumentList ('"{0}"' -f $server) -WorkingDirectory (Split-Path -Parent $server) -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $logDirectory 'server.log') -RedirectStandardError (Join-Path $logDirectory 'server-error.log')
                Write-PreviewLog ("Started preview server PID {0}." -f $child.Id)
                Start-Sleep -Seconds 2
                $state = Test-Preview
            }
        }
        if ($state -ne $lastState) {
            Write-PreviewLog ("Preview state: {0}." -f $state)
            $lastState = $state
        }
        if ($Once) {
            if ($state -ne 'ready') { throw "Preview is not ready: $state" }
            Write-Output $url
            break
        }
        Start-Sleep -Seconds 20
    } while ($true)
} finally {
    if ($ownsMutex) { $mutex.ReleaseMutex() }
    $mutex.Dispose()
}
