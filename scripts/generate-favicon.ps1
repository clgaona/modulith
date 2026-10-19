$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root 'public/assets/logo-modulith.svg'
$target = Join-Path $root 'public/favicon.svg'
[xml]$document = [System.IO.File]::ReadAllText($source)
$symbol = $document.DocumentElement
if ($symbol.LocalName -ne 'svg' -or $symbol.GetAttribute('viewBox') -ne '0 0 1024 1024') {
    throw 'Unexpected authorized logo format.'
}
# Reframe the existing symbol, preserving every path, fill and transform.
$symbol.SetAttribute('viewBox', '280 278 464 464')
$symbol.SetAttribute('width', '32')
$symbol.SetAttribute('height', '32')
$symbol.RemoveAttribute('id')
[System.IO.File]::WriteAllText($target, $symbol.OuterXml + "`n", [System.Text.UTF8Encoding]::new($false))
Push-Location $root
try {
    node --input-type=module -e "import sharp from 'sharp'; for(const size of [16,32]) await sharp('public/favicon.svg').resize(size,size).png().toFile('public/favicon-'+size+'.png');"
    if ($LASTEXITCODE -ne 0) { throw 'Favicon PNG generation failed.' }
} finally {
    Pop-Location
}
