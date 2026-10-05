# Deploying to GitHub Pages

This portfolio is preconfigured for **GitHub Pages** — a free static host that's perfect for a Next.js static export. You can be live in under 10 minutes.

---

## TL;DR (3 steps)

1. Create a new GitHub repo (e.g. `portfolio`) and push this project to it.
2. In the repo: **Settings → Pages → Source = GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

You'll get a URL like `https://mahmudul286.github.io/portfolio/`.

---

## Option A — Project page (recommended, easiest)

A project page lives at `https://<username>.github.io/<repo-name>/`. This is the default mode and requires zero configuration.

### Step 1 — Initialize git and push

```bash
cd /home/z/my-project

# Initialize git (if not already)
git init
git add .
git commit -m "Initial portfolio commit"

# Create the repo on GitHub first (https://github.com/new)
# Name it e.g. "portfolio" — public or private, both work for Pages
git branch -M main
git remote add origin https://github.com/mahmudul286/portfolio.git
git push -u origin main
```

### Step 2 — Enable Pages

1. Open your repo on GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions** (not "Deploy from a branch").
4. Save.

### Step 3 — Trigger the deploy

Push to `main` (you just did in Step 1). The workflow runs automatically:

- **Actions tab** → you'll see "Deploy to GitHub Pages" running
- Takes ~1–2 minutes
- When green: your site is live at `https://mahmudul286.github.io/portfolio/`

The `NEXT_PUBLIC_BASE_PATH` defaults to `/portfolio` (your repo name). If you named your repo something else, set a repository variable:

> **Settings → Secrets and variables → Actions → Variables → New repository variable**
> Name: `BASE_PATH`  ·  Value: `/<your-repo-name>` (e.g. `/my-portfolio`)

---

## Option B — User page (custom URL `https://mahmudul286.github.io/`)

User pages must live in a repo named **exactly** `<username>.github.io` (e.g. `mahmudul286.github.io`).

```bash
# Create repo at https://github.com/new named:  mahmudul286.github.io
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/mahmudul286/mahmudul286.github.io.git
git push -u origin main
```

Then add a repository variable to make the base path empty:

> **Settings → Secrets and variables → Actions → Variables → New repository variable**
> Name: `BASE_PATH`  ·  Value: *(leave the value empty — but you must create the variable)*

> ⚠️ Without the empty `BASE_PATH` variable, the workflow defaults to `/<repo-name>` and your assets will 404.

Enable Pages the same way (Settings → Pages → Source = GitHub Actions).

---

## Option C — Custom domain (e.g. `mahmudulhasan.dev`)

After either Option A or B works:

1. Buy a domain (Namecheap, Cloudflare, Porkbun, etc.).
2. Add DNS records:
   - **A records** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a **CNAME**: `www → <username>.github.io`
3. In your repo: **Settings → Pages → Custom domain** → enter `mahmudulhasan.dev` → **Save**.
4. Check "Enforce HTTPS".
5. Commit a `CNAME` file at the repo root with your domain (GitHub does this automatically).
6. Update `seo.url` in `src/config/site.ts` to your real domain so metadata + sitemap point to it.

Wait ~10–30 minutes for DNS to propagate and HTTPS to provision.

---

## How the deployment works (technical)

```
push to main
   ↓
GitHub Actions: .github/workflows/deploy.yml
   ↓
bun install → bun run build:static (Next.js static export)
   ↓
out/ directory is uploaded as a Pages artifact
   ↓
GitHub publishes the artifact at your *.github.io URL
```

Key configuration files:

| File | Purpose |
|------|---------|
| `next.config.ts` | `output: "export"` + `basePath` + `images.unoptimized` for static hosting |
| `.github/workflows/deploy.yml` | Builds & deploys on every push to main |
| `public/.nojekyll` | Tells GitHub Pages to serve `_next/` assets (Jekyll would otherwise strip them) |
| `public/manifest.webmanifest` | Static PWA manifest (Next.js dynamic manifest doesn't work with static export) |
| `public/sitemap.xml` | Static sitemap (same reason) |
| `public/robots.txt` | Updated with sitemap URL |

---

## Updating the site after deployment

Any push to `main` triggers a redeploy:

```bash
git add .
git commit -m "Update projects"
git push
```

The Actions workflow rebuilds and publishes within ~1–2 minutes.

---

## Verifying the deploy worked

1. **Actions tab** — the workflow should be green.
2. **Settings → Pages** — shows the live URL at the top.
3. Visit the URL — you should see the portfolio.
4. Test the **Download CV** button — it should download `Mahmudul-Hasan-CV.pdf` directly.
5. Test the **GitHub** and **LinkedIn** links.

---

## Common issues

| Issue | Fix |
|-------|-----|
| Site loads but CSS/JS 404 | `basePath` is wrong. Set `BASE_PATH` repo variable to match your repo name (e.g. `/portfolio`). |
| `_next/` assets missing | Make sure `public/.nojekyll` is committed. |
| Workflow doesn't run | Branch must be `main` or `master`. Push to that branch. |
| 404 on root URL | Pages Source must be **GitHub Actions**, not "Deploy from a branch". |
| Build fails with "export const dynamic" | Already fixed — `src/app/api/route.ts` has `export const dynamic = "force-static"`. |
| Images don't load | `images.unoptimized: true` is set in next.config — all images must be in `public/`. |
| Custom domain shows GitHub 404 | Wait 10–30 min for DNS, or check CNAME file in repo root. |

---

## What to do before going live

Before the first deploy, replace these placeholders (see `download/README.md`):

1. **Email** — change `ADD_EMAIL` in `src/config/site.ts` to your real email.
2. **CV** — replace `public/Mahmudul-Hasan-CV.pdf` with your real CV PDF.
3. **Unknown project links** — replace `ADD_REPO_LINK` / `ADD_LIVE_LINK` in `src/data/projects.ts` when known.
4. **SEO URL** — update `seo.url` in `src/config/site.ts` to your final domain.
5. **OG image** — drop a 1200×630 PNG at `public/og-image.png` for social sharing previews.

Then commit and push — you're live.
