// preload.js
const { ipcRenderer, remote } = require('electron');

window.ipcRenderer = ipcRenderer;
window.mainProcess = remote.require('./main');
