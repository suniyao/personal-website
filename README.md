# Personal website

This Next.js site builds to static files for GitHub Pages. Run `npm ci` and
`npm run build` locally; the publishable files are written to `out/`.

## Publish at suniyao.github.io

1. Rename the existing `suniyao.github.io` repository to preserve the old site
   and free the repository name.
2. Rename this repository (`personal-website`) to `suniyao.github.io`.
3. In this repository's **Settings → Pages**, set **Build and deployment → Source**
   to **GitHub Actions**.
4. Commit and push the site changes. Then run **Actions → Deploy to GitHub
   Pages → Run workflow** if the repository rename did not start a deployment.

The deployment workflow only runs after this repository has the
`suniyao.github.io` name. New posts must be committed to `public/posts/` before
the workflow can publish them. The `suniyao.github.io` address is GitHub's
default address for this repository, so it does not need a `CNAME` file or DNS
records. GitHub Pages cannot run server endpoints; the old Spotify API has been
removed.
