const { ipcMain } = require('electron');
const { readFolder } = require('./readFolder');
const { getAvailableDrives } = require('./getAvailableDrivers');
const { READ_FOLDER, GET_DISKS } = require('./types');

// Exposed to renderer API
ipcMain.on(READ_FOLDER, readFolder);
ipcMain.on(GET_DISKS, getAvailableDrives);
