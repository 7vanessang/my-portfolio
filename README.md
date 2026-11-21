# vanessa ng — portfolio

A static site: plain HTML, CSS and JavaScript. There's no build step and nothing to install.

```
index.html      page structure (header, intro panel, contact box, wheel)
styles.css      all styling — colours and fonts are at the top in :root
script.js       the wheel + every section's content
images/         one background photo per section
favicon.svg     tab icon
vercel.json     Vercel settings (clean URLs, image caching)
```

## Deploy on Vercel

**Option A: through GitHub (recommended, auto-redeploys on every push)**

1. Create a new repository on GitHub (e.g. `portfolio`) and upload everything in this folder to it.
2. Go to vercel.com, sign in with GitHub, and click **Add New → Project**.
3. Import the repository. Set **Framework Preset** to **Other**. Leave the build command and output directory empty.
4. Click **Deploy**. You'll get a `*.vercel.app` link.

**Option B: from your terminal**

```
npm i -g vercel
cd vanessa-ng-portfolio
vercel          # first run links the project and gives a preview URL
vercel --prod   # publishes to your production URL
```

To use your own domain, open the project in Vercel, go to **Settings → Domains**, and add it.

## Preview locally

```
cd vanessa-ng-portfolio
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Editing content

Everything you'd want to change is near the top of `script.js`:

- `S`: the wheel. Each entry has the section's name, the short line under it, and its photo. Words in `{curly braces}` show as scrambled text until hovered. Add or remove entries and the wheel re-spaces itself.
- `EXP`, `PROJ`, `JOUR`, `AW`, `TK`, `EDU`, `CAMPUS`, `OFF`: the content of each section.
- The intro paragraphs are in `BODY[""]`. A word starting with `_` is shown in italics.

Your email is in `index.html`, inside the contact box. The LinkedIn link is in the header row of `index.html`.

## Swapping the photos

The photos in `images/` are placeholders: small, blurred copies taken from yao-space.com. Replace them with your own before you share the site publicly.

Keep the same file names (`intro.webp`, `experience.webp`, …) or update the paths in `S`. About 1600px wide is plenty, since the page blurs them. JPG works too: just change the extension in `S`.
