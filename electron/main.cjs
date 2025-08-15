// electron/main.cjs
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const os = require('os');

// ---- put caches in temp to avoid Windows permission issues ----
const tmpRoot = path.join(os.tmpdir(), 'batten-major-match');
app.setPath('userData', path.join(tmpRoot, 'user-data'));         // whole app profile
app.commandLine.appendSwitch('disk-cache-dir', path.join(tmpRoot, 'disk-cache'));
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');    // avoid GPU cache writes
// Optional: uncomment to avoid HTTP cache during dev
// app.commandLine.appendSwitch('disable-http-cache');

function createWindow () {
  const icon =
    process.platform === 'win32'
      ? path.join(__dirname, '../build/BattenMajorMatch-icon.ico')
      : process.platform === 'darwin'
      ? path.join(__dirname, '../build/icon.icns')
      : path.join(__dirname, '../build/BattenMajorMatch-icon-1024.png');

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'Batten Major Match',
    backgroundColor: '#f6f7fb',
    autoHideMenuBar: true,
    icon,
    webPreferences: { contextIsolation: true }
  });

  if (process.env.ELECTRON_START_URL) {
    win.loadURL(process.env.ELECTRON_START_URL); // dev (Vite)
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));     // packaged
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.setAppUserModelId('edu.virginia.batten.majormatch');
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
