const { exec } = require("child_process");

function runAdbCommand(command) {
  return new Promise((resolve, reject) => {
    exec(`adb ${command}`, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function checkDeviceConnected() {
  const devicesOutput = await runAdbCommand("devices");
  const lines = devicesOutput.trim().split("\n");
  // first line is "List of devices attached"
  const devices = lines.slice(1).filter(line => line.trim() !== "");
  return devices.length > 0;
}

async function getBatteryInfo() {
  const batteryOutput = await runAdbCommand("shell dumpsys battery");
  return batteryOutput;
}

module.exports = {
  runAdbCommand,
  checkDeviceConnected,
  getBatteryInfo,
};
