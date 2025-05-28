const {
  app,
  BrowserWindow
} = require('electron');

let appWindow;

function createWindow() {
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800
  })
  appWindow.loadFile('dist/admin-booking/browser/index.html');

  appWindow.on('closed', () => {
    appWindow = null;
  })
}

app.whenReady().then(() => {
  createWindow();
})
