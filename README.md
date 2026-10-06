# Toraman Hukuk — v1

Astro + React, original Three.js balance sculpture, continuous scroll-driven scene and Turkish service pages. The revised UI follows the requested Grlica spatial rhythm: fixed scene, left section navigation, staggered unboxed text and light transitions.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify
```

See [PROJECT.md](PROJECT.md) for approved design/content decisions and [TEAM.md](TEAM.md) for shared agent responsibilities.

## Hosting

Static output: `dist/`. Build command: `npm run build`. Node 24 supported by the installed Astro release. Set `PUBLIC_SITE_URL` to the confirmed production domain before publication. Default domain is a draft, not a claim of existing ownership/configuration.

Vercel import: framework Astro, build command `npm run build`, output directory `dist`. `vercel.json` includes these settings. Preview builds are intentionally `noindex`; leave `PUBLIC_INDEXABLE=false` for client previews. Once the actual production origin and content are confirmed, set `PUBLIC_SITE_URL` and `PUBLIC_INDEXABLE=true`, then redeploy.

The local `assets` script imports owner-provided portraits from their original Windows paths. Optimized public images are checked into the repository; running that script is not required for CI.

No backend form, analytics or external map embed. Contact links open phone/email/address directions. No private conversation screenshots included in public assets.
