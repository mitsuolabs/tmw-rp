# TMW-RP

TMW-RP is a premium, browser-native radio player built as a single HTML file. It is designed to feel more like a polished broadcast desk or a luxury in-car listening console than a basic web radio app.

This project stays intentionally local-first: it runs in the browser without a backend, it uses public station discovery where available, and it keeps the listening experience direct and transparent.

Current version: 1.1

## What makes it different

- Single-file architecture: everything lives in one browser page.
- No backend required: it runs directly in a browser.
- Public-source discovery: Radio Browser is the primary discovery layer.
- Browser-safe stream handling: direct URL input, CSV import, and HLS-aware playback.
- Premium UX: console layout, metadata panels, HUD mode, visualizer, queue/favorite flow.
- Computationally local: DSP and audio processing happen in the browser.

## Core mission

The mission is simple: make the public internet radio experience feel premium again without surrendering freedom to a lock-in ecosystem.

This project is for:
- desktop listeners
- car dashboard browser use
- kiosk-style media consoles
- people who want open radio access without a subscription trap
- anyone who wants a no-backend, browser-based radio interface that still feels premium

## Features

- Radio Browser station discovery
- direct custom stream URL support
- CSV import for station lists
- HLS detection and playback handling for .m3u8 sources
- station favorites and queue
- browsing history
- live metadata cards and stream payload inspection
- visualizer and DSP controls
- HUD mode for compact or car-like viewing
- browser-only local-first behavior

## Version status

This project is currently at version 1.1.

For change logs and update reports, see [versions.md](./versions.md).

## How to run it

Open the file directly in a modern browser:

1. Open `index.html` in a browser.
2. Use the discovery panel to search stations.
3. Choose a station or paste a direct URL.
4. Press Engage Link.
5. Adjust volume, EQ, HUD, or visualizer settings as needed.

If you prefer a local preview server, you can also serve the project folder with any static file host. The app does not require a backend to function.

## Files in this project

- `index.html` — the complete browser app and UI engine
- `README.md` — overview and project philosophy
- `versions.md` — release notes and update reports
- `LICENSE` — Apache License 2.0

## Browser reality note

This app is intentionally designed for browser constraints. It does not claim to control or own any stream source, and it does not guarantee that every public station will expose perfect metadata.

The app tries to surface real stream title data when the station exposes it, but the final metadata quality still depends on upstream source behavior and browser network limitations.

## Project stance

This project is not a “consumer lock-in” product. It is a public radio interface built with a clear stance:

- no proprietary radio gatekeeping
- no forced backend
- no subscription lock-in
- local-first user control
- open-source respect for public sources and attribution

## License

This project is licensed under the Apache License 2.0.

See `LICENSE` for the full legal text.
