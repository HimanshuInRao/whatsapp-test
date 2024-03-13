const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { app, BrowserWindow, ipcMain } = require('electron');
const client = new Client();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

// app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

client.on('qr', (qrCode) => {
    // Print the QR code in the terminal
    qrcode.generate(qrCode, { small: true });

    console.log('Scan the QR code with your phone to log in.');
});

client.on('authenticated', (session) => {
    console.log('Authenticated as', session.user);
});

client.on('ready', () => {
    console.log('Client is ready');
});

client.on('message', (message) => {
    console.log('Received message:', message.body);
});

client.initialize();
