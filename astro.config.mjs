import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://toramanhukuk.com',
  output: 'static',
  integrations: [react()],
  trailingSlash: 'always',
});
