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
javascript:(()%20%3D%3E%20%7B%20const%20messageElements%20%3D%20document.querySelectorAll(%20'%5Bdata-content%3D%22user-message%22%5D%2C%20%5Bdata-content%3D%22ai-message%22%5D%2C%20'%20%2B%20'%5Bclass*%3D%22user-message%22%5D%2C%20%5Bclass*%3D%22bot-message%22%5D%2C%20'%20%2B%20'c-chat-message%2C%20gds-chat-message%2C%20%5Bclass*%3D%22chat-turn%22%5D'%20)%3B%20let%20exportText%20%3D%20%60%23%20Copilot%20Chat%20Export%20-%20%24%7Bnew%20Date().toLocaleString()%7D%5Cn%5Cn%60%3B%20if%20(messageElements.length%20%3D%3D%3D%200)%20%7B%20const%20mainContent%20%3D%20document.querySelector('main')%20%7C%7C%20document.body%3B%20const%20paragraphs%20%3D%20Array.from(mainContent.querySelectorAll('p%2C%20pre%2C%20code%2C%20ul%2C%20ol'))%20.map(el%20%3D%3E%20el.innerText.trim())%20.filter(text%20%3D%3E%20text.length%20%3E%200)%3B%20exportText%20%2B%3D%20paragraphs.join('%5Cn%5Cn')%3B%20%7D%20else%20%7B%20messageElements.forEach((el)%20%3D%3E%20%7B%20const%20isUser%20%3D%20el.matches('%5Bdata-content%3D%22user-message%22%5D%2C%20%5Bclass*%3D%22user%22%5D')%20%7C%7C%20el.getAttribute('data-author')%20%3D%3D%3D%20'user'%3B%20const%20sender%20%3D%20isUser%20%3F%20%22%23%23%23%20User%22%20%3A%20%22%23%23%23%20Copilot%22%3B%20exportText%20%2B%3D%20%60%24%7Bsender%7D%5Cn%24%7Bel.innerText.trim()%7D%5Cn%5Cn---%5Cn%5Cn%60%3B%20%7D)%3B%20%7D%20copy(exportText)%3B%20console.log(%22Success!%20Transcript%20copied%20to%20clipboard%20in%20Markdown%20format.%22)%3B%20%7D)()%3B
```

## Use

1. Open your Copilot chat session.
2. Click the `Export Copilot Chat` bookmark.
3. Transcript is copied to your clipboard as Markdown — paste it wherever
   you need it.

> Note: some browsers still show the Self-XSS "allow pasting" warning the
> *first* time any bookmarklet runs on a fresh profile — it does not recur
> after that, and there's no console interaction needed.

If the bookmarklet stops working, regenerate it from the latest
`src/export-chat.js` (minify + `encodeURIComponent`, prefix with
`javascript:`) rather than hand-editing the URI.
