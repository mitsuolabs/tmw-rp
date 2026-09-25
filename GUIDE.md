# TMW-RP Guide

This guide explains how to use the project in practice and how the browser-native radio flow is meant to work.

## 1. What the app is

TMW-RP is a single-file browser radio station player that runs without a backend. It is designed to browse public station sources, play direct stream URLs, and present the whole experience inside one polished interface.

The app is intentionally optimized for:
- local browser playback
- direct URL streams
- Radio Browser discovery
- CSV station ingestion
- premium dashboard presentation

## 2. How to launch it

The most direct method is to open the file in a browser.

- Open `index.html` in a modern browser.
- If needed, host the folder with a static local web server.
- Do not expect a server-side app layer: this is intentionally a frontend-only radio console.

A browser tab is enough. There is no required Node backend for basic use.

## 3. Discovery flow

Use the left console as the control stack.

### Station source selector

The selector provides three main modes:

- Radio Browser API
- Direct Stream URL
- CSV loader

### Search field

Use the search field to look up stations by name, city, genre, or station style. The app then populates the station selector with compatible public results.

### Direct URL mode

Use this if you have a raw stream URL. It works for:
- MP3 streams
- AAC streams
- OGG streams
- HLS .m3u8 streams

This is the simplest way to test a station you already know.

### CSV mode

CSV mode is for importing station lists. The app accepts common station list formats and converts them into playable entries.

## 4. Playback flow

After selecting or redirecting to a station:

1. click Engage Link
2. wait for the playback engine to attach
3. monitor the live title and station metadata
4. use EQ, volume, and visualizer controls as desired

The stop button disconnects the stream and clears the active play state.

## 5. Controls and DSP

The left pane includes the core controls:

- master volume
- balance
- stereo width
- playback rate
- loudness
- crossfade
- EQ presets
- denoiser
- 3D orbit spatializer
- bass boost
- sleep timer

These controls are part of the premium player experience and are designed to work locally without server support.

## 6. Metadata behavior

The app shows metadata in the right-side stage and metadata cards. It attempts to surface:

- current stream title
- station name
- genre
- country
- bitrate
- reference/homepage

Real stream metadata is not guaranteed to be perfect. Some stations expose clean title data, while others only expose sparse or no metadata in-browser. The app tries to detect this and displays the best available result.

## 7. Favorites, queue, and history

The app tracks:

- favorites
- queued stations
- recent listening history

These entries are stored in the browser local storage layer. They do not require a backend and remain available on the same browser profile.

## 8. HUD mode

HUD mode creates a minimized overlay for a more compact experience. It is especially useful for car dashboards, compact embedded browsers, or a minimal “live” monitoring view.

## 9. Visualizer and tuning

The visualizer responds to the audio signal and is designed to feel like part of a broadcast console rather than a toy equalizer. It is intentionally stylized to work as a premium front-end while keeping the project light.

## 10. Browser constraints and expectations

The app is built to be realistic about browser limitations.

Important limitations:
- Some public stations do not expose live title metadata at all.
- Some stations may reject browser fetches or provide metadata only through restrictive endpoints.
- HLS playback can require the browser to accept the stream format directly.
- The browser does not guarantee full raw ICY metadata access across all providers.

The app handles these cases as gracefully as possible, but it cannot force a source to expose metadata if the source does not provide it.

## 11. Troubleshooting

### No audio plays

- confirm the stream URL is valid
- check whether the source is actually reachable from the browser
- test direct MP3 or HLS URLs separately
- verify the station is not blocked by CORS or an unsupported format

### Metadata is blank

- try another station source
- use a station that exposes title information
- check whether the browser can read metadata from the stream at all

### CSV import fails

- ensure the file is UTF-8 text
- use the common station columns such as name and url
- test a minimal CSV file first

### HUD mode feels cramped

- toggle it off and on
- reduce the browser zoom and keep the panel focused on live title + signal status

## 12. Why this project matters

The project exists to push back against closed ecosystems, subscription lock-in, and brittle platform control. A browser-first public radio app can be elegant, locally controlled, and genuinely useful without pretending to be a giant streaming service.

The philosophy is simple:

- public radio should stay public
- the user should remain in control
- open sources should be respected
- local-first tooling should feel premium

## 13. Recommended usage pattern

For the best experience:

- use Radio Browser for discovery
- keep your favorite source URLs saved
- use CSV import for curated station sets
- keep HUD mode for compact displays
- don’t over-rely on metadata for stations that do not provide it

That is the most stable and realistic way to use the project.
