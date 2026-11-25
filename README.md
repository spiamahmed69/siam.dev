# SIAM.DEV — SP Siam Ahmed

Personal portfolio website for **SP Siam Ahmed**, Full Stack Web Developer from Bangladesh.

- Live site (after deployment): https://siam.dev/
- Stack: plain **HTML5 + CSS3 + vanilla JavaScript (ES6+)**. No frameworks, no build step.
- Architecture: **HTML-first**. All content is written directly in the HTML files. JavaScript is only for interactions (mobile menu, theme toggle, scroll reveal, back-to-top, blog search/filter, contact validation, copy-code buttons). The site is fully readable with JavaScript disabled.

## Structure

- `index.html` — homepage
- `about/`, `skills/`, `projects/`, `services/`, `journey/`, `contact/`, `privacy-policy/` — main pages (pretty URLs via `index.html` in each folder)
- `blog/` — blog homepage, category pages and 12 full articles (HTML, CSS, JavaScript, SEO)
- `404.html` — custom 404 page
- `style.css`, `responsive.css`, `script.js` — main styles and interactions
- `blog/blog.css`, `blog/blog.js` — blog-only styles and search/filter
- `assets/images/` — SVG profile image, project cover art, favicon
- `robots.txt`, `sitemap.xml`, `CNAME` (contains `siam.dev`), `site.webmanifest`

## Deploy (GitHub Pages + custom domain)

1. Create a GitHub repository (e.g. `Spsiamahmed/siam.dev`) and push this folder's contents to the `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Deploy from a branch**, select branch `main`, folder `/ (root)`, and save.
3. The site will be live at `https://spsiamahmed.github.io/siam.dev/` (or `https://<username>.github.io/` if the repo is named `<username>.github.io`).
4. Custom domain `siam.dev`: the `CNAME` file already contains `siam.dev`. At your domain registrar, add A records for the apex domain pointing to GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 — verify current addresses in the GitHub Pages docs) and a CNAME record for `www` pointing to `<username>.github.io`. Then enable **Enforce HTTPS** in Settings → Pages.
5. After launch, verify the site in Google Search Console and submit `https://siam.dev/sitemap.xml`.

## Notes

- The contact form does **not** send messages automatically. It validates input and opens the visitor's email app addressed to spsiamahmed1111@gmail.com. A form service is not connected yet — the form says so on the page.
- All project links, social links and article references were verified on 2026-11-26. No invented statistics, clients, testimonials or employment history are published anywhere on the site.
