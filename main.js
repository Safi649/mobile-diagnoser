const { app, BrowserWindow, ipcMain } = require("electron");
const adb = require("./adb");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:3000");
}

ipcMain.handle("check-device", async () => {
  try {
    const connected = await adb.checkDeviceConnected();
    return connected;
  } catch (err) {
    return false;
  }
});

ipcMain.handle("get-battery-info", async () => {
  try {
    const batteryInfo = await adb.getBatteryInfo();
    return batteryInfo;
  } catch (err) {
    return "Error fetching battery info";
  }
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
