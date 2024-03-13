const { ipcRenderer } = require('electron');

// Listen for the 'updateQrCode' event from the main process
ipcRenderer.on('updateQrCode', (event, qrCodeData) => {
    // Update the QR code in the HTML
    document.getElementById('qrcode').innerHTML = `<img src="${qrCodeData}" alt="QR Code" />`;
});

// Request QR code from the main process
ipcRenderer.send('getQrCode');