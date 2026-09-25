const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright');

const appUrl = `file://${path.resolve(__dirname, '../index.html')}`;

async function launchPage() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-gpu', '--no-sandbox']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto(appUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
  return { browser, page };
}

test('index.html loads in headless Chromium', async () => {
  const { browser, page } = await launchPage();
  try {
    const title = await page.title();
    assert.match(title, /TMW-RP|MitsuoLabs|Web Radio/i);
    const bodyText = await page.locator('body').innerText();
    assert.match(bodyText, /MitsuoLabs|Now Playing|Engage Link|Signal Discovery/i);
  } finally {
    await browser.close();
  }
});

test('critical radio controls are present in the browser UI', async () => {
  const { browser, page } = await launchPage();
  try {
    await page.waitForSelector('#registry-base');
    await page.waitForSelector('#target-station');
    await page.waitForSelector('#btn-play');
    await page.waitForSelector('#btn-stop');
    const stationLabel = await page.locator('#registry-base').textContent();
    assert.match(stationLabel || '', /Radio Browser|Direct Stream|CSV/i);
  } finally {
    await browser.close();
  }
});

test('Radio Browser API remains reachable and returns a usable station shape', async () => {
  const response = await fetch('https://de1.api.radio-browser.info/json/stations/search?name=ambient&limit=3&hidebroken=true', {
    headers: { Accept: 'application/json' }
  });
  assert.equal(response.ok, true, `radio-browser request failed: ${response.status}`);
  const payload = await response.json();
  assert.ok(Array.isArray(payload), 'Radio Browser response should be an array');
  assert.ok(payload.length >= 1, 'expected at least one station entry');
  const first = payload[0];
  assert.ok(first.name, 'station entry must include a name');
  assert.ok(first.url, 'station entry must include a stream URL');
});

test('MusicBrainz API is responding and structured as expected', async () => {
  const response = await fetch('https://musicbrainz.org/ws/2/artist?query=radiohead&limit=1&fmt=json', {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'tmw-rp-test/1.0 (https://example.com)'
    }
  });
  assert.equal(response.ok, true, `musicbrainz request failed: ${response.status}`);
  const payload = await response.json();
  assert.ok(payload.artists && Array.isArray(payload.artists), 'MusicBrainz response should contain an artist array');
  assert.ok(payload.artists.length >= 1, 'expected at least one artist result');
  assert.ok(payload.artists[0].name, 'artist result should include a name');
});

test('Wikipedia search API is reachable and returns a useful result set', async () => {
  const response = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Radiohead&format=json&origin=*', {
    headers: { Accept: 'application/json' }
  });
  assert.equal(response.ok, true, `wikipedia request failed: ${response.status}`);
  const payload = await response.json();
  assert.ok(payload.query && Array.isArray(payload.query.search), 'Wikipedia response should include a searchable result array');
  assert.ok(payload.query.search.length >= 1, 'expected at least one Wikipedia result');
});

test('index.html includes the core public metadata integration surfaces', async () => {
  const html = require('node:fs').readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const requiredMarkers = [
    'Radio Browser',
    'MusicBrainz',
    'Wikipedia',
    'custom-url',
    'csv',
    'btn-play',
    'live-title-pill'
  ];

  requiredMarkers.forEach((marker) => {
    assert.match(html, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing required marker: ${marker}`);
  });
});
