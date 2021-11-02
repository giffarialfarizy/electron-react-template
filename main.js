/*
    main.js
    Electron entry file. Run the main process: creating browser window.
*/

// Include the Node.js 'path' module at the top of your file
const path = require('path');

// Include electron js. Electron using common module system
const { app, BrowserWindow } = require('electron');

const isDev = !app.isPackaged;

// Function that loads index.html into a new BrowserWindow instance.
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // For security reason
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,

      // To preload the browser
      preload: path.join(__dirname, 'src', 'preload.js'),
    },
  });

  // Load the index.html of the app.
  win.loadFile('public/index.html');
}

// Electron-reload
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(
      __dirname,
      'node_modules',
      '.bin',
      'electron'
    ),
  });
}

// Function to open your window.
app.whenReady().then(() => {
  createWindow();

  // Open a window if none are open (macOS)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit the app when all windows are closed (Windows & Linux)​
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
