# Bookmarklet Version

Same script as [`src/export-chat.js`](src/export-chat.js), minified into a
`javascript:` URI. No DevTools, no "allow pasting" step — good for sharing
with a boss or colleague who just wants a one-click button.

## Install

1. Show your bookmarks bar (`Ctrl+Shift+B` in Chrome/Edge).
2. Right-click the bar → **Add page** (or drag the link below onto the bar,
   if your Markdown viewer renders links as clickable).
3. Name it something like `Export Copilot Chat`.
4. Paste the code block below into the **URL** field.

```text
javascript:(async%20()%20%3D%3E%20%7B%20const%20root%20%3D%20document.querySelector('main')%20%7C%7C%20document.body%3B%20async%20function%20expandCodeBlock(block)%20%7B%20for%20(let%20i%20%3D%200%3B%20i%20%3C%20100%3B%20i%2B%2B)%20%7B%20const%20btn%20%3D%20block.querySelector('button%5Baria-label%3D%22Show%20more%20lines%22%5D')%3B%20if%20(!btn)%20break%3B%20btn.click()%3B%20await%20new%20Promise((r)%20%3D%3E%20setTimeout(r%2C%2060))%3B%20%7D%20%7D%20function%20extractCode(block)%20%7B%20const%20badge%20%3D%20block.querySelector('%23language-badge')%3B%20const%20lang%20%3D%20(badge%3F.getAttribute('aria-label')%20%7C%7C%20'').toLowerCase()%3B%20const%20lines%20%3D%20Array.from(block.querySelectorAll('%5Bdata-line-index%5D'))%20.sort((a%2C%20b)%20%3D%3E%20Number(a.dataset.lineIndex)%20-%20Number(b.dataset.lineIndex))%20.map((l)%20%3D%3E%20l.textContent)%3B%20return%20%7B%20lang%2C%20code%3A%20lines.join('%5Cn')%20%7D%3B%20%7D%20const%20nodes%20%3D%20root.querySelectorAll(%20'%5Bdata-testid%3D%22chatOutput%22%5D%2C%20.scriptor-component-code-block%2C%20h1%2C%20h2%2C%20h3%2C%20h4%2C%20h5%2C%20h6%2C%20p%2C%20ul%2C%20ol'%20)%3B%20if%20(nodes.length%20%3D%3D%3D%200)%20%7B%20console.warn('No%20chat%20content%20found%20%E2%80%94%20Copilot%20may%20have%20changed%20its%20markup%20again.')%3B%20%7D%20let%20exportText%20%3D%20%60%23%20Copilot%20Chat%20Export%20-%20%24%7Bnew%20Date().toLocaleString()%7D%5Cn%5Cn%60%3B%20let%20currentSender%20%3D%20null%3B%20let%20firstTurn%20%3D%20true%3B%20for%20(const%20el%20of%20nodes)%20%7B%20if%20(el.matches('%5Bdata-testid%3D%22chatOutput%22%5D'))%20%7B%20const%20text%20%3D%20el.innerText.trim()%3B%20if%20(!text)%20continue%3B%20if%20(!firstTurn)%20exportText%20%2B%3D%20'---%5Cn%5Cn'%3B%20firstTurn%20%3D%20false%3B%20exportText%20%2B%3D%20%60%23%23%23%20User%5Cn%24%7Btext%7D%5Cn%5Cn%60%3B%20currentSender%20%3D%20'user'%3B%20continue%3B%20%7D%20if%20(currentSender%20!%3D%3D%20'assistant')%20%7B%20exportText%20%2B%3D%20'%23%23%23%20Copilot%5Cn'%3B%20currentSender%20%3D%20'assistant'%3B%20%7D%20if%20(el.matches('.scriptor-component-code-block'))%20%7B%20await%20expandCodeBlock(el)%3B%20const%20%7B%20lang%2C%20code%20%7D%20%3D%20extractCode(el)%3B%20if%20(code.trim())%20exportText%20%2B%3D%20%60%5C%60%5C%60%5C%60%24%7Blang%7D%5Cn%24%7Bcode%7D%5Cn%5C%60%5C%60%5C%60%5Cn%5Cn%60%3B%20continue%3B%20%7D%20const%20text%20%3D%20el.innerText.trim()%3B%20if%20(!text)%20continue%3B%20if%20(el.tagName%20%3D%3D%3D%20'H1')%20exportText%20%2B%3D%20%60%23%20%24%7Btext%7D%5Cn%5Cn%60%3B%20else%20if%20(el.tagName%20%3D%3D%3D%20'H2')%20exportText%20%2B%3D%20%60%23%23%20%24%7Btext%7D%5Cn%5Cn%60%3B%20else%20if%20(%2F%5EH%5B3-6%5D%24%2F.test(el.tagName))%20exportText%20%2B%3D%20%60%23%23%23%20%24%7Btext%7D%5Cn%5Cn%60%3B%20else%20exportText%20%2B%3D%20%60%24%7Btext%7D%5Cn%5Cn%60%3B%20%7D%20navigator.clipboard.writeText(exportText).then(()%20%3D%3E%20%7B%20console.log('Success!%20Transcript%20copied%20to%20clipboard%20in%20Markdown%20format.')%3B%20%7D).catch((err)%20%3D%3E%20%7B%20console.error('Clipboard%20write%20failed%2C%20logging%20text%20instead%3A'%2C%20err)%3B%20console.log(exportText)%3B%20%7D)%3B%20%7D)()%3B
```

Long code blocks take a moment to export — the script has to click through
Copilot's virtualized "Show more lines" control before it can read the full
content, so don't be surprised by a short delay before the success message.

## Use

1. Open your Copilot chat session.
2. Click the `Export Copilot Chat` bookmark.
3. Transcript is copied to your clipboard as Markdown — paste it wherever
   you need it.

> Note: the browser may prompt for clipboard permission the first time
> (native permission dialog, not a console warning) — allow it.

If the bookmarklet stops working, regenerate it from the latest
`src/export-chat.js` (minify + `encodeURIComponent`, prefix with
`javascript:`) rather than hand-editing the URI.
