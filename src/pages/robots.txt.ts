import type { APIRoute } from 'astro';import {absoluteUrl} from '../lib/paths';
export const GET:APIRoute=({site})=>new Response(`User-agent: *\nAllow: /\nSitemap: ${absoluteUrl('/sitemap-index.xml',site!,import.meta.env.BASE_URL)}\n`,{headers:{'Content-Type':'text/plain'}});
