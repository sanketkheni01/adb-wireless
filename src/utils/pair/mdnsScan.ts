import bonjour from 'bonjour'
import { Readable } from 'stream'
import { AdbConnect, AdbPair } from './adbService.js'

import { MdnsDeviceData } from './mdnsDeviceData.js'

// Mdns Scanning for QR code connection pairing.
async function startMdnsScanQr(
  password: String,
  resolve: Function,
  reject: Function
): Promise<void> {
  //Timer variable to dispose everything if no device connect within 30 sec.
  let timer: NodeJS.Timeout

  const scanner: bonjour.Browser = bonjour().find(
    { type: 'adb-tls-pairing' },
    async function (service: any) {
      // console.log(service)
      if (!(service.addresses[0] == undefined)) {
        var device = new MdnsDeviceData(
          service.name,
          service.addresses[0],
          service.port
        )

        let isPaired = AdbPair(device, password)

        if (isPaired) {
          console.log('ADB QR: Device Paired Successfully')

          await new Promise<void>(async (_resolve) => {
            await AdbConnect(_resolve)
            scanner.stop()
            bonjour().destroy()
            clearTimeout(timer)
            resolve({ ip: device.ipAddress })
          })
        } else {
          reject('ADB QR: Unable to pair device')
        }
      }
    }
  )

  scanner.addListener('up', () => {
    // console.log('QR Scanning Stopped...')
  })

  scanner.on('up', () => {
    // console.log('up')
  })

  scanner.on('down', () => {
    // console.log('down')
  })

  timer = setTimeout(() => {
    scanner.stop()
    bonjour().destroy()
    reject('ADB QR: TimeOut: No Device Found')
  }, 30000)
}

async function startMdnsScanPairingCode(
  resolve?: Function
): Promise<{ stream: Readable; dispose: Function }> {
  var timer: NodeJS.Timeout

  var stream = new Readable()

  var scanner = bonjour().find(
    { type: 'adb-tls-pairing' },
    function (service: any) {
      // console.log(service)
      if (!(service.addresses[0] == undefined)) {
        var device = new MdnsDeviceData(
          service.name,
          service.addresses[0],
          service.port
        )
        stream.emit('data', device)
      }
    }
  )

  timer = setTimeout(() => {
    scanner.stop()
    bonjour().destroy()
    stream.destroy()
    throw new Error('ADB QR: TimeOut: Scanning Stopped')
  }, 30000)

  var dispose: Function = () => {
    scanner.stop()
    bonjour().destroy()
    stream.destroy()
    clearTimeout(timer)
    resolve!()
  }
  return { stream, dispose }
}

export { startMdnsScanQr, startMdnsScanPairingCode }
