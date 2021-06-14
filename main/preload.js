const { contextBridge, ipcRenderer } = require('electron');

const validEventNames = ['read-folder'];

const request = (eventName, props) => {
  return new Promise((resolve, reject) => {
    if (validEventNames.includes(eventName)) {
      ipcRenderer.send(eventName, props);
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(eventName, (event, data) => {
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
