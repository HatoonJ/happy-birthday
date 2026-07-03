# Happy Birthday 🎉

A collection of personalized birthday landing pages, one folder per person, each with its own design.

## Structure

- `index.html` — hub page linking to each person's page
- `yara/` — Yara's 28th birthday (July 7th). Balloons, matrix-rain hero, purple/teal/gold palette (no pink). Pop a balloon to reveal the message.
- `reem/` — Reem's 26th birthday. IT/hacker terminal theme, green/cyan monospace. Run `./celebrate.sh` in the terminal to reveal the message.

Each person folder has its own `assets/style.css`, `assets/script.js`, and `assets/img/` with a photo placeholder to swap for a real photo.

## Publish with GitHub Pages

1. Push this repo to GitHub (public repo, needed for free GitHub Pages).
2. On GitHub: **Settings → Pages → Source → Deploy from a branch**, choose `main` branch, `/ (root)` folder, then **Save**.
3. Pages will be live at:
   - Hub: `https://<your-username>.github.io/happy-birthday/`
   - Yara: `https://<your-username>.github.io/happy-birthday/yara/`
   - Reem: `https://<your-username>.github.io/happy-birthday/reem/`

## Adding a new person

Copy an existing folder (e.g. `yara/`) as a starting point, give it its own design, and add a link card to it in the root `index.html`.
