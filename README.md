# Export Microsoft Copilot Chat Transcripts

Enterprise Copilot deployments sometimes disable native chat export for
security reasons. This is a small workaround: a browser-console script that
pulls the current chat transcript out of the page DOM and copies it to your
clipboard as Markdown, so you can drop it into an email, doc, or Teams
message when you need to share a work-related conversation with a boss or
colleague.

## Quick Start

Pick one:

- **One click (recommended for sharing):** see [bookmarklet.md](bookmarklet.md)
- **Console paste:** copy [`src/export-chat.js`](src/export-chat.js), paste
  into DevTools console (`F12` → Console tab) on your open Copilot chat,
  press Enter. Full walkthrough in [docs/USAGE.md](docs/USAGE.md).

Either way, the transcript ends up on your clipboard as Markdown, ready to
paste.

## Repo Layout

```
src/export-chat.js   — the extraction script (source of truth)
bookmarklet.md        — one-click javascript: URI version + install steps
docs/USAGE.md          — full step-by-step, incl. DevTools/Self-XSS notes
CHANGELOG.md           — notable changes, esp. when Copilot's UI shifts
```

## How It Works

Copilot's UI doesn't expose an export button in restricted tenants, but the
transcript still lives in the DOM. The script queries known message-
container selectors, walks each turn, tags it `### User` / `### Copilot`,
and copies the resulting Markdown via the console's `copy()` helper. If
Microsoft changes the markup and no selectors match, it falls back to
grabbing all visible paragraph/list/code text on the page.

## Caveats

- Selectors are reverse-engineered from the current Copilot web UI and will
  break when Microsoft ships a redesign. If your export comes back empty,
  check [docs/USAGE.md](docs/USAGE.md#troubleshooting).
- Only pull transcripts you're authorized to share — this is a convenience
  tool, not a bypass of any access control on the conversation content
  itself.

## License

See [LICENSE](LICENSE).
