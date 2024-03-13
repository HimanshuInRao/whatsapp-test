const { ipcRenderer } = require('electron');

ipcRenderer.on('updateQrCode', (event, qrCode) => {
    const qrcodeContainer = document.getElementById('qrcode-container');
    qrcodeContainer.innerHTML = `<img src="${qrCode}" alt="QR Code">`;
});