import { ADB } from 'appium-adb'

type Device = {
  udid: string
  state: string
}

export default async function isAlreadyConnected(ip: string, port: number) {
  const adb = await ADB.createADB()
  const devices: Device[] = await adb.getConnectedDevices()
  console.log(devices[0].udid, `${ip}:${port}`)
  for (const device of devices) {
    if (device.udid === `${ip}:${port}`) {
      return true
    }
  }
}
