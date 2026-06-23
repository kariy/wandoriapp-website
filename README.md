# Wandori — Waitlist

A single-screen waitlist landing page for **Wandori**, a travel content discovery
app for iOS. Built with [Vite](https://vitejs.dev) (vanilla, no framework),
deployed to GitHub Pages, with signups captured via [Formspree](https://formspree.io).

> Tagline: **Find your next memory.**

## Local development

```bash
npm install
npm run dev      # start the dev server (prints a localhost URL)
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

The page works out of the box in **DEMO mode** — submitting an email shows the
success state locally without sending anything. Wire up Formspree to collect
real signups.

## Connect Formspree (collect real emails)

1. Create a free account at <https://formspree.io> and add a new form that
   delivers to **ammr.arf@gmail.com**.
2. Copy the form's endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. In [`src/main.js`](src/main.js), replace the placeholder:

   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/abcdwxyz";
   ```

That's it — `DEMO_MODE` turns off automatically once the placeholder is gone.
Signups appear in the Formspree dashboard (with CSV export). The form already
includes a honeypot field for spam protection.

## Deploy to GitHub Pages

This isn't a git repo yet. To publish:

```bash
git init && git add -A && git commit -m "Wandori waitlist landing"
# create a repo on GitHub, then:
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Build and deployment →
Source: GitHub Actions**. The workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
deploys on every push to `main`.

- **Project page** (`https://<user>.github.io/<repo>/`): works as-is — the build
  uses relative asset paths (`base: "./"` in `vite.config.js`).
- **Custom domain**: add a `public/CNAME` file containing your domain and
  configure it under Settings → Pages.

## Design

Brand pulled from the iOS app's design tokens (warm cream paper, ink text, sand
accent, sunset-gradient CTA). Type: **Fraunces** (editorial display) + **Hanken
Grotesk** (body), loaded from Google Fonts.

## Structure

```
index.html                  # the landing screen + SEO/OG tags
thanks.html                 # standalone "You're on the list." confirmation page
src/main.js                 # form submit → Formspree (AJAX), then redirect to thanks.html
src/thanks.js               # loads shared styles for the thanks page
src/style.css               # brand tokens + layout + animations
public/favicon.svg          # location-pin mark in the sunset gradient
public/og-image.png         # (optional) social share image — add your own
vite.config.js              # base path for GitHub Pages
.github/workflows/deploy.yml
```

### Optional polish (later)

- Add a real `public/og-image.png` (1200×630) for richer social link previews.
- Drop in app screenshots / a phone mockup once available.
