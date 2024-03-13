const { app, BrowserWindow, ipcMain } = require('electron');
const { Client } = require('whatsapp-web.js');
const qrCode = require('qrcode');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            backgroundThrottling: false,
            devTools: true,
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

const client = new Client();

client.on('qr', (qrCodeData) => {
    // Send the QR code data to the renderer process
    
    // Convert QR code data to a data URL for rendering in the console
    qrCode.toDataURL(qrCodeData, (err, url) => {
        if (err) return console.error(err);
        
        // Log the data URL to the console
        mainWindow.webContents.send('updateQrCode', url);
        console.log(url);
    });
});

client.initialize();

// Add this part to send QR code to the renderer process
ipcMain.on('getQrCode', (event) => {
    // Send the QR code data to the renderer process
    event.reply('updateQrCode', "hello");
});
