import type { APIRoute } from 'astro';
import { absoluteUrl, allowIndexing } from '../data/content';

export const prerender = true;

export const GET: APIRoute = () => new Response(
  allowIndexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
    : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
