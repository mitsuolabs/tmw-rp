# TMW-RP Version Reports

## Current release

- Version 1.2
- Release date: 2026-10-08

## Update report

### v1.2 — Maximum viable radio engine
This release turns the app into a more complete, more resilient browser radio workstation while keeping it lightweight, local-first, and portable.

Key changes:
- Improved Radio Browser search reliability with multi-fallback station discovery.
- Added direct stream URL support with stronger custom station handling.
- Added CSV/M3U playlist import for offline and curated station lists.
- Expanded favorites, queue, and history management with persistent local storage.
- Added a clock-based scheduler for timed station switching, stop commands, and EQ preset actions.
- Added a richer 5-band EQ system with six presets and persistent settings.
- Improved audio lifecycle handling for play, retry, pause, and station changes.
- Added live diagnostics for buffer, SNR, latency, and stream quality.
- Added multiple visualizer modes: spectrum, waveform, and radial.
- Added HUD overlay mode for compact, dashboard-style monitoring.
- Added dark/light theme switching.
- Added export tooling for saving session state and preferences.
- Improved metadata card accuracy and station refresh flow.
- Strengthened UI polish with more responsive layout behavior and clearer interaction states.

### v1.1 — Performance and stability pass
This update improves the app’s responsiveness and reduces unnecessary work in the browser while preserving the existing feature set.

Key changes:
- Simplified and tightened the CSS for lower render cost.
- Reduced redundant DOM work and expensive reflows.
- Optimized the visualizer loop to avoid unnecessary frame work.
- Hardened playback lifecycle handling for better station switching and cleanup.
- Improved state management around metadata, favorites, and custom stream inputs.
- Reduced unnecessary event churn during UI updates.
- Kept the app lightweight without removing existing functionality.

### v1.0 — Initial release
The project launched as a premium single-file browser radio player focused on open access, browser-native listening, and a polished console interface.

---

For current release notes and future updates, keep this document in sync with the project README.
