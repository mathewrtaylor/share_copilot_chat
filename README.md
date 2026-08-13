# Guide: How to Export Microsoft Copilot Chat Transcripts

This guide provides step-by-step instructions for extracting a full Microsoft Copilot conversation transcript into Markdown format using your web browser's Developer Tools.

---

## Prerequisites

* **Browser:** Microsoft Edge, Google Chrome, or any Chromium-based browser.
* **Access:** Open the Microsoft Copilot chat session you wish to export in your active browser window.

---

## Step-by-Step Instructions

### Step 1: Open Browser Developer Tools

1. Open your active Copilot conversation in the browser.
2. Press **`F12`** (or **`Ctrl + Shift + I`** on Windows) to open Developer Tools.
3. Select the **Console** tab at the top of the Developer Tools panel.

---

### Step 2: Bypass Browser Anti-Pasting Security Protection

Chromium browsers include a security feature (Self-XSS protection) that blocks users from pasting code into the console until explicitly allowed.

1. If you attempt to paste code, a yellow warning message will appear:
> *Warning: Don’t paste code into the DevTools Console that you don’t understand... Please type “allow pasting” below and press Enter to allow pasting.*


2. Type the following text directly into the console prompt:
```text
allow pasting

```


3. Press **Enter**. (You only need to perform this step once per browser profile/session).

---

### Step 3: Copy and Paste the Extraction Script

Copy the following JavaScript snippet in its entirety:

```javascript
(() => {
  // Query message containers across Copilot UI revisions
  const messageElements = document.querySelectorAll(
    '[data-content="user-message"], [data-content="ai-message"], ' +
    '[class*="user-message"], [class*="bot-message"], ' +
    'c-chat-message, gds-chat-message, [class*="chat-turn"]'
  );

  let exportText = `# Copilot Chat Export - ${new Date().toLocaleString()}\n\n`;

  if (messageElements.length === 0) {
    // Fallback traversal if specific selectors update
    const mainContent = document.querySelector('main') || document.body;
    const paragraphs = Array.from(mainContent.querySelectorAll('p, pre, code, ul, ol'))
      .map(el => el.innerText.trim())
      .filter(text => text.length > 0);
    
    exportText += paragraphs.join('\n\n');
  } else {
    messageElements.forEach((el) => {
      const isUser = el.matches('[data-content="user-message"], [class*="user"]') || 
                     el.getAttribute('data-author') === 'user';
      const sender = isUser ? "### User" : "### Copilot";
      exportText += `${sender}\n${el.innerText.trim()}\n\n---\n\n`;
    });
  }

  // Copy structured Markdown directly to system clipboard
  copy(exportText);
  console.log("Success! Transcript copied to clipboard in Markdown format.");
})();

```

Paste the code into the console prompt and press **Enter**.

---

### Step 4: Save Your Transcript

1. Once executed, you will see the confirmation message:
`Success! Transcript copied to clipboard in Markdown format.`
2. Open your preferred application (e.g., VS Code, OneNote, Microsoft Word, Notepad, or Teams).
3. Press **`Ctrl + V`** to paste the complete structured transcript.
