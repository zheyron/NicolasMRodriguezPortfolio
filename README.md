# Nicolás Rodríguez — game portfolio

An English-language, static portfolio for a Game Producer & Game Designer. Astro 7.4.2, TypeScript strict, Markdown Content Collections, and plain CSS. No runtime backend, account system, analytics, or remote content dependency.

## Requirements and local setup

Use Node **24.19.0** (see `.nvmrc`) and npm **12.2.0**. Dependencies are pinned in `package.json` and `package-lock.json`.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Astro. In the original Windows workspace, npm was installed locally without administrator privileges. If npm is not on PATH there, replace `npm` with `node .tools/package/bin/npm-cli.js` in these commands. `.tools` is ignored and is not a dependency of a fresh clone with standard Node/npm installed.

```sh
npm run check
npm test
npm run build
npm run preview
npm run test:bases
```

`build` includes generated HTML, links, assets, canonical, sitemap, 404 and output-safety checks. `test:bases` builds both `/` and `/portfolio-personal/`; run `npm run build` afterwards to restore the release configuration. Stop preview before `npm ci` on Windows to avoid locking native dependencies.

Browser tests:

```sh
npx playwright install chromium
npm run test:e2e
```

The original workspace stores test browsers in `.tools/browsers`; set `PLAYWRIGHT_BROWSERS_PATH` to that directory to reuse them. The tests cover five widths, keyboard navigation, project/mechanic crosslinks, no-JavaScript navigation, console errors and axe WCAG rules. Automated checks do not certify full WCAG conformance.

## Structure

```text
src/content/projects/       Project Markdown and frontmatter
src/content/mechanics/      Mechanic Markdown and frontmatter
src/content.config.ts      Astro collection definitions
src/lib/schemas.ts          Publication and evidence contracts
src/lib/content.ts          Collection access and cross-validation
src/lib/contracts.ts        Sorting and publication helpers
src/lib/paths.ts            Base-aware URLs
src/data/site.ts            Personal identity and public profile links
src/components/             Cards, navigation, evidence, video and SEO
src/layouts/                Shared semantic page layout
src/pages/                  Static route templates
src/styles/global.css      Responsive visual system
public/                    Approved static assets only
tests/                     Unit and browser tests
scripts/                   Build and output checks
.github/workflows/         CI and GitHub Pages deployment
```

## Add or edit a project

Edit a Markdown file in `src/content/projects/`. Its filename is its stable lowercase kebab-case URL slug. Frontmatter is YAML; the existing files use JSON syntax, which is valid YAML. Preserve slugs once shared.

Use these fields:

- `title`, `shortDescription` (up to 120 characters), `roles`, `attribution`.
- `projectType`: `game`, `modding`, `collaboration`, or `experiment`.
- Optional `context`: `indie`, `academic`, `personal`, `external-collaboration`.
- Optional `productStatus`: `coming_soon`, `demo`, `prototype`, `in_development`, `released`, `published_mod`. Unknown status is omitted.
- `published`: portfolio publication permission, independent of product release status.
- `sortOrder`: explicit listing order, with slug as a deterministic tie-breaker.
- `claims`: relevant factual claims with unique IDs, `sourceType` (`author` or `public`), `lastVerifiedAt`, and `reviewStatus`. Public claims require a public HTTPS `sourceUrl`; author accounts must not be misrepresented as independent verification.
- Optional `technologies`, `credits`, `links`, `availability`, `cover`, `video`, `decisions`, and `evidence`.

Long narrative belongs below the frontmatter. Keep unknown dates, engines, team sizes, metrics and outcomes out. Never copy collaborators’ credits into personal ownership. All published entries require approved claims and nonempty title, description, roles and attribution; drafts can be partial.

**Do not put private drafts, internal source documents, credentials or unapproved assets in this repository.** `published: false` removes routes, cards, sitemap and relationships, but is not a security mechanism for a public source repository. Keep sensitive drafts outside the checkout. Everything in `public/` is copied into the site.

## Featured projects

Set `featured: true` and `featuredOrder` to control Home. `src/data/home.ts` selects the main spotlight and its editorial copy; that project is excluded from the secondary featured grid to avoid duplication. The main catalogue continues to use `sortOrder`. Three projects are currently selected. Fewer strong entries are preferable to filler.

## Add a mechanic

Add a Markdown file under `src/content/mechanics/` with `parentProject` matching the project filename, `discipline`, `depth` (`overview` or `case-study`), `reviewStatus: approved`, and the common publication metadata. Parent projects must exist and be published. Reverse links are derived automatically; do not maintain a second list on the project.

A `case-study` requires real evidence, `problem`, `intent`, `designSummary`, `iterations`, and `outcomes`. Optional `constraints`, `implementationSummary`, `decisions`, and `learnings` populate the complete template. An `overview` must be clearly introductory and must not imply a completed technical study. Evidence entries need unique IDs; every decision's `evidenceIds` must resolve.

## Covers, evidence and videos

Snowballing now uses original project artwork and real local-build captures. Jigsaw Jab and Martial Village use their official public cover images. Remaining projects use original CSS typography, not simulated gameplay. No reference-portfolio assets were copied. See the media manifest in `docs/content-audit.md` for capture conditions and provenance.

For a real cover, add an **approved, already optimized** image under `public/media/<slug>/` and set:

```yaml
cover:
  src: /media/project-slug/cover.webp
  width: 1200
  height: 675
  alt: "Describe the actual scene and relevant feature."
  caption: "Project/build and what the image demonstrates."
  credit: "Actual author or team credit"
  permission: approved
```

Use 16:9 covers, WebP/AVIF where appropriate, explicit dimensions and small files. Card images load lazily; detail hero media loads eagerly. Put contextual visual evidence in `evidence[].image` with the same fields. Record the license or team permission in the media manifest before adding files.

Use optional `pixelArt: true` for pixel-art media. `gallery` accepts an array of the same media objects, renders readable captions, and links to full images. Captions must identify controlled test conditions when applicable. Project pages can add `tagline`, `summary`, and `contributions` entries with `title` and `description`. Mechanics can add `flow` steps with `label` and `detail`; these produce an accessible, responsive system diagram. Project and mechanic covers are also used for their Open Graph previews.

`video` accepts a public HTTPS `url`, a descriptive `label`, and an optional approved `poster`. The component links out only after a click, so no iframe or video is loaded automatically. Provide captions on the hosted video. No CV button is shown until there is a verified file and a deliberate link.

## Site URL and GitHub Pages

`SITE_URL` is the origin; `BASE_PATH` is the path prefix. Local development defaults to the root. The dedicated repository is `zheyron/NicolasMRodriguezPortfolio`; its release URL is `https://zheyron.github.io/NicolasMRodriguezPortfolio/`. Deployment derives this subpath automatically from GitHub's repository context.

```sh
# Project site example (POSIX shell)
SITE_URL=https://OWNER.github.io BASE_PATH=/REPO/ npm run build
```

On PowerShell use `$env:SITE_URL='https://OWNER.github.io'` and `$env:BASE_PATH='/REPO/'`. Do not include the repository path in `SITE_URL`. For a user site named `OWNER.github.io`, use `/`. Every internal URL, canonical, OG URL and sitemap must use the same base.

## CI/CD and publishing updates

- `ci.yml`: on pull request or main push, installs from lockfile, checks types, tests contracts, builds both bases and runs browser/accessibility tests.
- `deploy.yml`: on main push or manual dispatch, derives the origin/base from the actual owner/repository, installs, checks, tests, builds, uploads `dist`, and deploys to the `github-pages` environment.
- Enable **Settings → Pages → Source: GitHub Actions** on the new repository. Deployment requires Pages and OIDC permissions only in the deploy job. PR events do not publish.

After the initial repository and authentication are ready:

```sh
git add <reviewed files>
git commit -m "[UPDATE] Refine portfolio content"
git push origin main
```

Check both workflows, then open the public Home, Work, a project, a mechanic, Contact, and an unknown URL. Never infer successful publication from a successful local build. No domain purchase, DNS changes or analytics setup is needed.

## Editorial provenance

See `docs/content-audit.md` for the public sources, ownership boundaries and missing materials. Site implementation does not grant permission to publish private game documents. Dates in evidence records are review dates, not release dates.
