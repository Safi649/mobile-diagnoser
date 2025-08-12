import { useState } from "react";

const { ipcRenderer } = require("electron");

export default function Home() {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [batteryInfo, setBatteryInfo] = useState("");

  async function checkDevice() {
    const connected = await ipcRenderer.invoke("check-device");
    setDeviceConnected(connected);
  }

  async function fetchBattery() {
    if (!deviceConnected) {
      alert("No device connected!");
      return;
    }
    const info = await ipcRenderer.invoke("get-battery-info");
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
      <pre style={{ whiteSpace: "pre-wrap", background: "#f0f0f0", padding: 10 }}>
        {batteryInfo}
      </pre>
    </div>
  );
}
