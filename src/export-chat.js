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

  // Copy structured Markdown directly to system clipboard.
  // navigator.clipboard works in both the DevTools console and page context
  // (bookmarklets); the DevTools-only `copy()` helper does not.
  navigator.clipboard.writeText(exportText).then(() => {
    console.log("Success! Transcript copied to clipboard in Markdown format.");
  }).catch((err) => {
    console.error("Clipboard write failed, logging text instead:", err);
    console.log(exportText);
  });
})();
