const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const { ipcRenderer } = require('electron');

const client = new Client();

client.on('qr', (qrCode) => {
    qrcode.toDataURL(qrCode, (err, url) => {
        if (err) return console.error(err);

        // Send the QR code to the main process
        ipcRenderer.send('qrCode', url);
    });
});

client.initialize();