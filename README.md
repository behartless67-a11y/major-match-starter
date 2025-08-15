# UVA Batten — Major & Program Match (Local Tester)

This starter lets you run your JSX tool locally in a browser *and* as a desktop app (Electron).

## 0) Install Node.js
- Windows/macOS: install the **LTS** version from https://nodejs.org (reopen your terminal after install).

## 1) Put your JSX in place
- Open `src/App.jsx` and paste your component (make sure it `export default` a React component).
- If your code references images/data files, put them in `public/` (they'll be served at `/`), or import them from `src/`.

## 2) Run it locally (hot reload)
```bash
npm i
npm run dev
```
Open the printed `http://localhost:5173` URL in your browser.

## 3) Test the production build (what you'd deploy)
```bash
npm run build
npm run preview
```
Open the printed URL to view the built app.

## 4) Make a desktop app (Electron)
```bash
npm run build
npm run build:electron
```
- On Windows: you'll get an `.exe` installer in `dist/`.
- On macOS: you'll get a `.dmg` in `dist/`.
(First run may prompt for code-signing; you can build unsigned for internal testing.)

### Dev mode with Electron (optional)
If you want the Electron window to show live changes:
```bash
npm run dev
```
This runs Vite and automatically launches Electron against it.

## Notes
- If you see a blank screen by double-clicking `index.html`, use `npm run preview` instead—`file://` breaks routing/paths.
- To embed in Teams later, you'll add a `Content-Security-Policy` header on the web host. For pure desktop testing, nothing extra is needed.
- If you need Node packages (CSV/Markdown/etc.), `npm i <package>` then import in your component.

---

Need help? Ping me with the exact error message and your OS (Windows/macOS). I'll give you the copy‑paste fix.
