const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');
const URL = require('url').URL;

const IS_WIN = process.platform === 'win32';
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

// Exposed to renderer API
ipcMain.on('read-folder', async (event, props) => {
  try {
    const infoArray = [];
    const normalizedPath = path.resolve(path.normalize(props.path));
    const symLinks = await fsPromises.readdir(normalizedPath, {
      withFileTypes: true,
    });

    for (const file of symLinks) {
      const commonInfo = {
        name: file.name,
        extension: file.name.slice(file.name.lastIndexOf('.')),
      };

      try {
        const info = fs.statSync(path.join(normalizedPath, file.name));

        infoArray.push({
          ...commonInfo,
          folder: info.isDirectory(),
          ...info,
        });
      } catch (e) {
        // permission error when trying to get info
        if (e.code === 'EPERM') {
          infoArray.push({
            ...commonInfo,
            protected: true,
          });
        }
      }
    }

    event.reply('read-folder', {
      success: true,
      data: infoArray,
    });
  } catch (e) {
    console.error(e);
    event.reply('read-folder', {
      success: false,
      reason: `[main] ${e.message}`,
    });
  }
});
