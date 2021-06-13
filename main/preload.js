const { contextBridge, ipcRenderer } = require('electron');

const validIpcEvents = ['read-folder'];

const request = (event, props) => {
  return new Promise((resolve, reject) => {
    if (validIpcEvents.includes(event)) {
      ipcRenderer.send(event, props);
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(event, (event, data) => {
        if (data.success) {
          resolve(data);
        } else {
          reject(data);
        }
      });
    } else {
      reject({
        result: false,
        reason: '[preload] Unknown event type',
      });
    }
  });
};

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipc', {
  request,
});
