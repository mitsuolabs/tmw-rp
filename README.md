# TMW-RP

TMW-RP is a premium, browser-native radio player built as a single HTML file. It is designed to feel more like a polished broadcast desk or a luxury in-car listening console than a basic web radio widget. The project is intentionally local-first, no-backend, and public-source friendly.

This is not a SaaS wrapper pretending to be a radio app. It is a deliberately stripped-down, high-end browser experience for people who want direct access to public streams and open station discovery without locking themselves into proprietary walled gardens.

## What makes it different

- Single-file architecture: everything lives in one browser page.
- No backend required: the app runs directly in a browser without a server.js or an app service.
- Public-source discovery: Radio Browser is the primary discovery layer.
- Browser-safe stream handling: direct URL input, CSV import, and explicit HLS handling.
- Premium UX: premium console layout, signal dashboard, HUD mode, metadata cards, live visualizer, and queue/favorite flow.
- Computationally local: DSP and audio processing happen in the browser on the user’s machine.

## Core mission

The mission is simple: make the public internet radio experience feel premium again, without surrendering your freedom to a monopolist ecosystem.

This project is for:
- desktop listeners
- car dashboard browser use
- kiosk-style media consoles
- people who want open radio access without a subscription trap
- anyone who wants a no-backend, open browser radio interface that still feels premium

## Features

- Radio Browser station discovery
- direct custom stream URL support
- CSV import for station lists
- HLS detection and playback handling for .m3u8 sources
- station favorites and listening queue
- browsing history
- live metadata cards and stream payload inspection
- visualizer and DSP controls
- HUD mode for compact or car-like viewing
- local recording / capture support
- strong browser-only local-first logic

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
- `GUIDE.md` — practical operating guide
- `CONTRIBUTING.md` — contribution standards
- `LICENSE` — Apache License 2.0
- `CodeOfConduct.md` — project ethics and expected behavior
- `CodeOfDrivingCars.md` — responsible technical stewardship philosophy

## Browser reality note

This app is intentionally designed for browser constraints. It does not claim to control or own any stream source, and it does not guarantee that every public station will expose perfect metadata or a title in the browser. For many stations, the browser can only show what the stream itself exposes or what a public metadata endpoint makes available.

The app tries to surface real stream title data when the station exposes it, but the final metadata quality still depends on upstream source behavior and browser network limitations.

## Public sources used

The project intentionally relies on public, open data sources where available, including:

- Radio Browser API
- MusicBrainz
- Wikipedia
- custom stream URLs supplied by the user
- CSV station lists supplied by the user

## Project stance

This project is not a “consumer lock-in” product. It is a public radio interface built with a clear stance:

- no proprietary radio gatekeeping
- no forced backend
- no subscription lock-in
- local-first user control
- open-source respect for public sources and attribution

## Access and requirements

This project is intentionally designed to require no online accounts, no LLM, no ID or age attestation, and no first-party telemetry*.

*The project does not add a first-party telemetry layer by default. It does not require a backend or an account; it runs locally in the browser and relies on public upstream sources and the user’s own local environment.

## Maintainer and review policy

The repository includes a maintainer review gate and a maintainer intake pathway:

- all pull requests require at least one review
- maintainers may bypass the review requirement only when listed in [MAINTAINERS.md](MAINTAINERS.md)
- maintainer applications are tracked via the maintainer issue template
- rival-affiliation checks are part of the governance flow
- the protected deployment branch is `indie-branch`
- `main` and `master` are rejected as branch aliases in the repository policy and CI checkpoints

## Release and automation

The project is designed to package and release a tarball whenever the public app entry changes. The build and release pipeline also runs browser and API testing to keep long-term quality high.

## Rights and legal posture

This project does not own any station, channel, or broadcast network. It is a local-first browser client that resolves public sources and respects upstream source terms and licensing. The project does not impose an age gate because there is no central server or hosted service layer to regulate as a broadcast operator would. The local-first design is the core reason the age-gate requirement does not apply in the same way it might for a centralized commercial radio operator or regulated broadcast service.

## License

This project is licensed under the Apache License 2.0.

See `LICENSE` for the full legal text.
