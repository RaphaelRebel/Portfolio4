# Raphael Rebel portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4, with a small CMS at `/admin`. Dutch content, light theme.

## Stack

- **Content:** SQLite via Drizzle ORM and libSQL. Locally a plain `local.db` file, on Vercel a Turso database (hosted SQLite)
- **Uploads (images, cv):** Vercel Blob, uploaded straight from the browser so there is no 4.5 MB function limit
- **Login:** one password (scrypt hash in an env var) and a signed, http-only session cookie (jose), checked in middleware and again in every server action
- **Cache:** public pages are cached and refreshed with `revalidateTag('content')` after every save

## Local setup

The database is a single SQLite file, `local.db`, created in the project folder. No database server needed.

```bash
npm install
cp .env.example .env.local
npm run hash-password -- "a long password you will remember"   # paste into ADMIN_PASSWORD_HASH
openssl rand -base64 48                                          # paste into SESSION_SECRET
npm run db:push    # creates local.db with the tables
npm run db:seed    # fills it with the current content
npm run dev        # http://localhost:3000/admin
```

Uploads need a `BLOB_READ_WRITE_TOKEN`. Create a Blob store in Vercel and copy the token, or run `vercel env pull .env.local` once the project is linked.

## Deploy on Vercel (free Hobby plan)

Everything here runs on the free tiers: Vercel Hobby for the site, Vercel Blob for uploads and Turso for the database. There is no separate server to pay for.

Vercel cannot keep a SQLite file: every deploy and every function starts from a clean disk, so saves from /admin would disappear. That is why the live site uses Turso, which is SQLite hosted for you.

1. Put the code on GitHub and import the repository in Vercel (Add New › Project). The defaults for Next.js are fine.
2. Create the database. In the Vercel project go to Storage › Marketplace › Turso, or use the Turso CLI:

   ```bash
   turso db create raphael-portfolio
   turso db show raphael-portfolio --url     # DATABASE_URL, starts with libsql://
   turso db tokens create raphael-portfolio  # DATABASE_AUTH_TOKEN
   ```

3. Create a Blob store in the Vercel project (Storage › Blob). Vercel adds `BLOB_READ_WRITE_TOKEN` for you.
4. Add these environment variables in Vercel (Settings › Environment Variables): `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET` and `NEXT_PUBLIC_SITE_URL` (for example `https://raphaelrebel.vercel.app`).
5. Fill the Turso database once from your laptop: put the two Turso values in `.env.local`, then run `npm run db:push` and `npm run db:seed`.
6. Deploy (or redeploy, so the build can read the database).

The build reads the database to prerender the project, blog and organisation pages, so the database values must be set before the first deploy. After that, saving in /admin refreshes the pages without a new deploy.

If you host on your own server instead, the `local.db` file is enough. Keep it out of git and back it up.

## Scripts

| Script | What it does |
| --- | --- |
| `dev`, `build`, `start` | Next.js |
| `typecheck` | `tsc --noEmit` |
| `db:push` | Creates or updates the tables from `src/db/schema.ts` |
| `db:seed` | Loads the starting content. Add `-- --force` to overwrite existing content |
| `hash-password` | Prints an `ADMIN_PASSWORD_HASH` line |

## What you can edit in /admin

- **Projecten:** title, slug, type, period, role, techniques, live link, summary, problem, solution, square card image, wide cover image and extra gallery images with alt texts. Reorder with the arrows.
- **Ervaring:** role, organisation, period, one line and the hover image. Reorder with the arrows.
- **Skills:** groups with a short description and comma-separated skills. Together they also fill the scrolling band.
- **Over mij:** paragraphs (blank line between them) and the portrait.
- **Contact en cv:** e-mail, phone, LinkedIn and the cv PDF.
- **Blog:** title, slug, year, reading time, tags, short description, text, optional cover and extra images. In the text a blank line starts a new paragraph, `## ` a heading, `- ` a list, `1. ` a numbered list, `| a | b |` a table and `[text](https://...)` a link.

The organisation ticker, the organisation pages, hero text and section headings stay in code (`src/content` and `src/components/sections`). Workplaces in Ervaring link to the organisation page whose name appears in the organisation field.

## Routes

| Route | Content |
| --- | --- |
| `/` | Hero, projecten (the first three), ervaring, wat ik doe, over mij, contact |
| `/projecten` | Galerij (default) and `?weergave=index` |
| `/projecten/[slug]` | Project detail |
| `/ervaring`, `/wat-ik-doe`, `/over-mij`, `/contact` | One section per page |
| `/ervaring/[slug]` | Organisation page (content in `src/content/organisations.ts`) |
| `/blog`, `/blog/[slug]` | Blog list and posts |
| `/admin` | CMS, behind login |

## Structure

```
src/
  app/
    (site)/       public pages and their layout (header, footer, providers)
    admin/        login and the (panel) group behind requireAdmin
    api/admin/upload/route.ts   Vercel Blob upload tokens, only for logged-in users
  db/             schema, client, ordering helper, seed data
  server/         auth, cached public queries, admin queries, validation, server actions
  components/
    admin/        shell, list, forms, upload and gallery fields
    layout/ sections/ projects/ ui/ cursor/ motion/
  hooks/          useMediaQuery, useDragScroll, useBlobUpload
  lib/            cn, format, routes, shared class strings, clipboard
```

## Known limits

- Deleting a project or replacing an image does not delete the old file from Blob storage. Clean up in the Vercel dashboard if storage grows.
- Login has a delay after a wrong password but no lockout. With one strong password that is enough for a personal site.
- The problem and solution texts in the seed were drafted from the facts on the old site. Review them in /admin.

## Commits

```
chore: scaffold next.js app with typescript and tailwind v4
feat(theme): add broadsheet colour tokens, fonts and keyframes
feat(layout): add header, radix menu dialog, footer and skip link
feat(home): add hero, project cards, experience list and tickers
feat(projects): add gallery, index and detail pages
feat(routes): add separate pages per section
feat(cursor): add cursor labels and follow image on hover
fix(a11y): respect reduced motion and announce carousel only on click
feat(db): add drizzle schema, sqlite client and seed script
feat(auth): add password login with signed session cookie and middleware
feat(cms): add admin shell, lists with reordering and delete
feat(cms): add forms for projects, experience, skills, about and contact
feat(cms): upload images and cv to vercel blob from the browser
refactor(site): read content from the database with tag revalidation
docs: describe cms setup
```
