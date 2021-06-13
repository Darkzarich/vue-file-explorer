const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development' ? true : false;

if (isDev) {
  // require('electron-reload')(path.resolve(__dirname, './dist/'));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000/'
      : `file://${path.resolve(__dirname, 'dist', 'index.html')}`
  );

  win.webContents.on('did-fail-load', () => {
    if (isDev) {
      dialog.showErrorBox(
        'The dev server is not up!',
        'There is no dev server currently running on port 3000.'
      );
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
