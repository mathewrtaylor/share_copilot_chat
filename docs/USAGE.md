# Usage: Export a Microsoft Copilot Chat Transcript

Two ways to run the extraction script: **console** (works everywhere, needs
DevTools) or **bookmarklet** (one click, better for sharing with non-technical
colleagues). See [bookmarklet.md](../bookmarklet.md) for the latter.

## Console Method

### Prerequisites

* **Browser:** Microsoft Edge, Google Chrome, or any Chromium-based browser.
* **Access:** Open the Microsoft Copilot chat session you wish to export in
  your active browser window.

### Step 1: Open Browser Developer Tools

1. Open your active Copilot conversation in the browser.
2. Press **`F12`** (or **`Ctrl + Shift + I`** on Windows) to open Developer
   Tools.
3. Select the **Console** tab at the top of the Developer Tools panel.

### Step 2: Bypass Browser Anti-Pasting Security Protection

Chromium browsers include a security feature (Self-XSS protection) that
blocks users from pasting code into the console until explicitly allowed.

1. If you attempt to paste code, a yellow warning message will appear:
   > *Warning: Don't paste code into the DevTools Console that you don't
   > understand... Please type "allow pasting" below and press Enter to
   > allow pasting.*
2. Type the following text directly into the console prompt:
   ```text
   allow pasting
   ```
3. Press **Enter**. (You only need to do this once per browser profile.)

### Step 3: Copy and Paste the Extraction Script

Copy the contents of [`src/export-chat.js`](../src/export-chat.js) in its
entirety, paste it into the console prompt, and press **Enter**.

### Step 4: Save Your Transcript

1. Once executed, you'll see the confirmation message:
   `Success! Transcript copied to clipboard in Markdown format.`
2. Open your preferred application (VS Code, OneNote, Word, Notepad, Teams).
3. Press **`Ctrl + V`** to paste the complete structured transcript.

## Troubleshooting

* **No messages found / empty export** — logs a console warning
  (`No chat content found...`) if none of `[data-testid="chatOutput"]`,
  `.scriptor-component-code-block`, or `p`/`ul`/`ol`/heading tags match
  anything under `<main>`. Means Copilot changed its markup again — grab
  fresh selectors via DevTools → Inspect on a message and a code block, see
  [`src/export-chat.js`](../src/export-chat.js) for where they're used.
* **Code blocks missing or truncated** — Copilot's code editor renders one
  `<div data-line-index>` per line and virtualizes long blocks (only visible
  lines exist in the DOM). The script clicks through the "Show more lines"
  control before reading each block; if that control's `aria-label` changes,
  extraction silently stops early.
* **Clipboard write fails / permission prompt** — the script uses
  `navigator.clipboard.writeText()`, which requires a secure context
  (`https://`, which Copilot is) and may prompt for clipboard permission the
  first time. If it's denied or unsupported, the script logs the full
  Markdown text to the console instead — select and copy it manually.
