# Changelog

## 2026-08-13 (3)

- Rewrote extraction logic for Copilot's current UI (Fluent/`scriptor`
  components) — old selectors matched nothing, silently dropping into a
  fallback that lost code blocks and headings.
  - User turns: `div[id^="user-message-"] [data-testid="chatOutput"]`
  - Code blocks: `.scriptor-component-code-block`, extracted via
    `[data-line-index]` and fenced with the `#language-badge` language
  - Auto-clicks "Show more lines" to defeat code-block virtualization
    before extracting, so long snippets aren't truncated
  - Headings (`h1`-`h6`) now preserved as Markdown headings

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
