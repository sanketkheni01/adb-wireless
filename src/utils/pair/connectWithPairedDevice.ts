import { isAdbInstalled, isAdbVersionSupported } from './adbService'

function connectWithPairedDevice() {
  if (!isAdbInstalled()) {
    throw new Error('ADB is not installed or PATH is not Configured')
  } else if (!isAdbVersionSupported()) {
    throw new Error('ADB is not updated. Please update to version 32 or later')
  } else {
    // showProgress('ADB-QR:Connecting...', async () => {
    //   await new Promise<void>(async (resolve) => {
    //     await AdbConnect(null, resolve)
    //   })
    // })
  }
}

export { connectWithPairedDevice }
