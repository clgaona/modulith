import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://modulith.com.co',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
