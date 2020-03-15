# Refresh Browser (VS Code extension)

Refresh your web-browser with ⌘R without switching from Code. **Only works on macOS!**

#### Why macOS only?

The extension relies on AppleScript to communicate with the browser.

#### Which browsers are supported?

Safari, Chrome and Chromium-based browsers, such as Edge, Opera etc. Firefox is not supported, because it lacks the AppleScript API. For Firefox and other browsers, use @fabiospampinatoʼs [Browser Refresh](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-browser-refresh) extension.

#### How is Refresh Browser different to @fabiospampinatoʼs [Browser Refresh](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-browser-refresh) extension?

Refresh Browser (this extension) communicates with the browser directly via the browserʼs AppleScript API. For this reason:

- it works slightly faster;
- Code always stays in focus;
- it can find a tab to refresh by URL (configure this behavior using the `refreshBrowser.findTabByUrlStartingWith` setting).

At the same time, it has limited browser support annd it canʼt “force refresh” the browser.

Another extension, @fabiospampinatoʼs [Browser Refresh](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-browser-refresh), uses AppleScript to simulate the ⌘R keystroke in the browser window, resulting in Code window losing focus for a fraction of a second. The keystrokes method has its advantages: it can be used to simulate the “force refresh” keystroke (Cmd-Shift-R) and it is more universal in terms of browser support.

#### I need “force refresh”. What can I do?
Keep your browsers console always open and disable caching. Alternative solution: use @fabiospampinatoʼs [Browser Refresh](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-browser-refresh) extension.

## Installation

[Click Install on the Marketplace](https://marketplace.visualstudio.com/items?itemName=dae.vscode-refresh-browser), or run the following in the command palette:

```
ext install dae.vscode-refresh-browser
```

## Usage

Press Cmd-R or select `Refresh Browser` in the command palette (Cmd-Shift-P).

## Settings

- `refreshBrowser.browser` — the browser to refresh, `Google Chrome` by default.

- `refreshBrowser.urlPrefixes` — *(optional)* Refresh the tab whose URL starts with one of the prefixes specified below. For example, if you add `https://localhost`, a tab whose URL is `https://localhost/website/index.html` will be refreshed. If there are multiple tabs with matching URLs, only the first one will be refreshed. If there are no tabs with a matching URL, the active tab will be refreshed.

## License

MIT License © Eugene Zuyev (dae@dae.me).
