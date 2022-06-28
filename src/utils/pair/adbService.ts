import bonjour from 'bonjour'
import { spawnSync } from 'child_process'

import { MdnsDeviceData } from './mdnsDeviceData'

function isAdbVersionSupported(): boolean {
  try {
    var commandOutput = executeCommand('adb --version')

    const output = commandOutput[1]?.toString()
    const exitCode = commandOutput[0]

    if (exitCode == 0) {
      var versionIndex = output!.lastIndexOf('Version')
      var currentFullVersion = output!.substring(versionIndex + 8)
      var currentVersion = Number.parseInt(
        currentFullVersion.charAt(0) + currentFullVersion.charAt(1)
      )

      if (currentVersion >= 32) {
        return true
      } else {
        return false
      }
    } else {
      throw new Error('ADB Qr ' + commandOutput[2])
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

function isAdbInstalled(): boolean {
  try {
    var commandOutput = executeCommand('adb --version')
    if (commandOutput[0] == 0) {
      return true
    } else {
      throw new Error('ADB Qr ' + commandOutput[2])
    }
  } catch (e) {
    console.log('Something Went Wrong', e)
    return false
  }
}

function AdbPair(device: MdnsDeviceData, password: String): boolean {
  try {
    var commandOutput = executeCommand(
      'adb pair ' + device.ipAddress + ':' + device.port + ' ' + password
    )
    // console.log('Output was:\n', commandOutput)
    if (commandOutput[0] == 0) {
      // console.log('ADB-QR: ' + commandOutput[1])
      return true
    } else {
      throw new Error('ADB Qr ' + commandOutput[2])
    }
  } catch (e) {
    throw new Error('ADB QR: Unable to Pair With Device')
  }
}

async function AdbConnect(resolve?: Function): Promise<void> {
  var timer: NodeJS.Timeout

  var scanner = bonjour().find(
    { type: 'adb-tls-connect' },
    function (service: any) {
      scanner.stop()
      bonjour().destroy()

      try {
        var commandOutput = executeCommand(
          'adb connect ' + service.addresses[0] + ':' + service.port
        )

        if (commandOutput[0] !== 0) {
          throw new Error('ADB QR ' + commandOutput[2])
        }
        clearTimeout(timer)
        if (resolve != null) {
          resolve(true)
        }
      } catch (e) {
        clearTimeout(timer)
        if (resolve != null) {
          resolve(true)
        }
        throw new Error('ADB QR: Unable to Connect With Device')
      }
    }
  )

  timer = setTimeout(() => {
    scanner.stop()

    clearTimeout(timer)
    if (resolve != null) {
      resolve()
    }
    throw new Error('ADB QR: TimeOut: Unable to connect with device')
  }, 30000)
}

function getDeviceName(address: string, port: number) {
  try {
    var commandOutput = executeCommand(
      'adb -s ' + address + ':' + port + ' shell getprop ro.product.model'
    )
    console.log('Output was:\n', commandOutput)

    if (commandOutput[0] == 0) {
      var output: string = commandOutput[1]?.toString() ?? ''
      console.log('ADB QR:Connected To ' + output)
    } else {
      throw new Error('ADB Qr ' + commandOutput[2])
    }
  } catch (e) {
    console.log('Unable to get Device Name', e)
    throw new Error('ADB QR: Something Went Wrong')
  }
}

function executeCommand(command: string) {
  var child
  try {
    child = spawnSync(command, {
      encoding: 'utf-8',
      timeout: 30000,
      shell: true,
    })
  } catch (e) {
    console.log(e)
    throw new Error(
      'ADB-QR: Timeout in executing ADB command Try restarting ADB..'
    )
  }

  return [child?.status ?? 1, child?.stdout ?? '', child?.stderr ?? '']
}

export { isAdbVersionSupported, isAdbInstalled, AdbConnect, AdbPair }
