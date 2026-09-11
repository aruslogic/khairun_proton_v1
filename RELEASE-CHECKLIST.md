# Khairun Proton — Release readiness

## Completed

- Added manifest.json, relative start URL/scope, standalone display, theme metadata, PNG icons (192, 512, maskable 512, Apple 180).
- Added versioned, project-scoped service worker. Precache is atomic; activation of updates requires customer action. External requests are not cached. Offline status explains WhatsApp needs internet.
- Hardened session restoration: malformed JSON, invalid answer types, duplicate comparison IDs, invalid purpose, non-string trade-in data and oversized fields are normalized.
- Invalid model routes remain blocked. Removed duplicate 'Proton' in image alt text. Route changes move keyboard focus to main content.
- Improved narrow-screen layout for header, primary buttons, cards and offline notice.
- Preserved Khairun contact and separate ArusLogic developer link.
- Added GitHub Actions workflow: validation before Pages deployment, read-only source permissions, scoped deployment permissions, public-asset staging only.
- Local automated checks passed: JavaScript syntax, HTML asset references, image existence, PNG dimensions, manifest paths, 14 routes with valid state, malformed sessions, five-model allowlist, seven-seat restriction, WhatsApp recipient and context, sharing exclusions, service worker install/cache behavior and project cache isolation.
- Checked public files for common private-key, GitHub token and OpenAI key signatures. No secrets found; .env and dependencies excluded.

## Not yet verified / launch gate

- Real browser/mobile rendering, browser console/network, PWA installation and real offline/update lifecycle have NOT been verified. The managed cloud browser cannot open the local static server, and this plain static project has no compatible supervised preview server. Unit checks are not equivalent to browser testing.
- Nine Proton product/announcement URLs returned HTTP 200. Two brochure PDF requests timed out; their live availability is unverified. WhatsApp destinations were checked for URL/recipient correctness without sending messages. See tests/external-links.json.
- No GitHub repository was created or pushed. Connected account is aruslogic; connector lacks repository creation and Pages settings operations. Requested destination name was a placeholder; proposed new name is khairun-proton.
- Before launch, run on HTTPS, install on Android/iOS, check 320/390/768/1440px layouts, finish quiz → compare → model → trade-in → WhatsApp, reload offline, and test a RELEASE update with saved answers.
- Prices, rebate/voucher availability, stock and product variants need confirmation by Khairun. No guaranteed promotion or finance approval is advertised. Image usage rights are documented separately.

## Scope

This is a static customer-acquisition PWA MVP, not a backend lead database. No loan calculator, automated vehicle valuation, analytics or messaging API is included. Important business rules remain client-visible on GitHub Pages.

Do not describe this release as fully production-verified until the open launch gates above are completed.
