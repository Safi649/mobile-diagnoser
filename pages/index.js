import { useState } from "react";

export default function Home() {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [batteryInfo, setBatteryInfo] = useState("");

  async function checkDevice() {
    const connected = await window.electron.ipcRenderer.invoke("check-device");
    setDeviceConnected(connected);
  }

  async function fetchBattery() {
    if (!deviceConnected) {
      alert("No device connected!");
      return;
    }
    const info = await window.electron.ipcRenderer.invoke("get-battery-info");
    setBatteryInfo(info);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Mobile Diagnoser</h1>
      <button onClick={checkDevice}>Check Device Connection</button>
      <p>{deviceConnected ? "Device is connected ✅" : "No device connected ❌"}</p>

      <button onClick={fetchBattery} disabled={!deviceConnected}>
        Get Battery Info
      </button>
      <pre>{batteryInfo}</pre>
    </div>
  );
}
