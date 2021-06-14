const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const URL = require('url').URL;

const IS_DEV = process.env.NODE_ENV === 'development' ? true : false;
const APP_URL = IS_DEV
  ? 'http://localhost:3000/'
  : `file://${path.resolve(__dirname, 'dist', 'index.html')}`;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    nodeIntegration: false,
    contextIsolation: true,
    resizable: false,
  });

  win.loadURL(APP_URL);

  win.webContents.on('did-fail-load', () => {
    if (IS_DEV) {
      dialog.showErrorBox(
        'The dev server is not up!',
        'There is no dev server currently running on port 3000.'
      );
      app.exit();
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Restrict navigation from the current page
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (parsedUrl.origin !== APP_URL) {
      event.preventDefault();
    }
  });
});

require('./api/index.js');
