# Repurpose MVP — Replit setup

1. Create a new Repl → choose the **Node.js** template.
2. Replace/add these three files with the ones here: `server.js`, `package.json`, and `public/index.html` (create a `public` folder first).
3. In the left sidebar, open **Secrets** (the padlock icon) and add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key (from console.anthropic.com)
4. Click **Run**. Replit will install `express` automatically from `package.json`.
5. Open the webview that pops up — that's your live app.

That's it. No other config needed. The frontend never sees your API key; it only ever talks to your own `/api/repurpose` endpoint, which holds the key server-side.
