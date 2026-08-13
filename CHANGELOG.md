# Changelog

## 2026-08-13 (2)

- Fixed `ReferenceError: copy is not defined` in the bookmarklet — `copy()`
  is a DevTools-console-only helper, unavailable in page context. Switched
  both script and bookmarklet to `navigator.clipboard.writeText()`, with a
  console-log fallback if the write fails.

## 2026-08-13

- Restructured repo: extracted script from README into `src/export-chat.js`
- Added `bookmarklet.md` — one-click `javascript:` URI version, no DevTools required
- Added `docs/USAGE.md` — full console walkthrough + troubleshooting
- Rewrote `README.md` as a short overview/index pointing to the above
