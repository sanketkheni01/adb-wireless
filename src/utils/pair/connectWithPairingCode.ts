import { isAdbInstalled, isAdbVersionSupported } from './adbService'
import { MdnsDeviceData } from './mdnsDeviceData'

var deviceList: QuickPickTile[] = []

async function connectWithPairingCode() {
  //check if adb is installed in system or not
  if (!isAdbInstalled()) {
    throw new Error('ADB is not installed or PATH is not Configured')
  } else if (!isAdbVersionSupported()) {
    throw new Error('ADB is not updated. Please update to version 32 or later')
  }
}

class QuickPickTile {
  device: MdnsDeviceData

  constructor(device: MdnsDeviceData) {
    this.label = device.ipAddress + ':' + device.port
    this.device = device
  }
  label: string

  description?: string | undefined
  detail?: string | undefined
  picked?: boolean | undefined
  alwaysShow?: boolean | undefined
}

export { connectWithPairingCode }
