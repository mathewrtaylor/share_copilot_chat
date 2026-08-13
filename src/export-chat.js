(async () => {
  const root = document.querySelector('main') || document.body;

  // Copilot's code editor virtualizes lines — only visible ones exist in the
  // DOM. Click "Show more lines" until it's gone so long blocks aren't
  // silently truncated.
  async function expandCodeBlock(block) {
    for (let i = 0; i < 100; i++) {
      const btn = block.querySelector('button[aria-label="Show more lines"]');
      if (!btn) break;
      btn.click();
      await new Promise((r) => setTimeout(r, 60));
    }
  }

  function extractCode(block) {
    const badge = block.querySelector('#language-badge');
    const lang = (badge?.getAttribute('aria-label') || '').toLowerCase();
    const lines = Array.from(block.querySelectorAll('[data-line-index]'))
      .sort((a, b) => Number(a.dataset.lineIndex) - Number(b.dataset.lineIndex))
      .map((l) => l.textContent);
    return { lang, code: lines.join('\n') };
  }

  // Stable hooks: [data-testid="chatOutput"] for the user's own text, and
  // .scriptor-component-code-block for code (no <pre>/<code> tags — a
  // custom line-per-div editor widget). Everything else (headings,
  // paragraphs, lists) belongs to whichever turn it trails in DOM order.
  const nodes = root.querySelectorAll(
    '[data-testid="chatOutput"], .scriptor-component-code-block, h1, h2, h3, h4, h5, h6, p, ul, ol'
  );

  if (nodes.length === 0) {
    console.warn('No chat content found — Copilot may have changed its markup again.');
  }

  let exportText = `# Copilot Chat Export - ${new Date().toLocaleString()}\n\n`;
  let currentSender = null;
  let firstTurn = true;

  for (const el of nodes) {
    if (el.matches('[data-testid="chatOutput"]')) {
      const text = el.innerText.trim();
      if (!text) continue;
      if (!firstTurn) exportText += '---\n\n';
      firstTurn = false;
      exportText += `### User\n${text}\n\n`;
      currentSender = 'user';
      continue;
    }

    if (currentSender !== 'assistant') {
      exportText += '### Copilot\n';
      currentSender = 'assistant';
    }

    if (el.matches('.scriptor-component-code-block')) {
      await expandCodeBlock(el);
      const { lang, code } = extractCode(el);
      if (code.trim()) exportText += `\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
      continue;
    }

    const text = el.innerText.trim();
    if (!text) continue;
    if (el.tagName === 'H1') exportText += `# ${text}\n\n`;
    else if (el.tagName === 'H2') exportText += `## ${text}\n\n`;
    else if (/^H[3-6]$/.test(el.tagName)) exportText += `### ${text}\n\n`;
    else exportText += `${text}\n\n`;
  }

  // Copy structured Markdown directly to system clipboard.
  // navigator.clipboard works in both the DevTools console and page context
  // (bookmarklets); the DevTools-only `copy()` helper does not.
  navigator.clipboard.writeText(exportText).then(() => {
    console.log('Success! Transcript copied to clipboard in Markdown format.');
  }).catch((err) => {
    console.error('Clipboard write failed, logging text instead:', err);
    console.log(exportText);
  });
})();
