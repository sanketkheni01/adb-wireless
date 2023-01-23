import adbConnect from './adbConnect.js'
import adbCheck from './pair/adbCheck.js'
import parseIp from './parseIp.js'
import parsePort from './parsePort.js'

export default async function connect(options: {
  ip: string | undefined
  port: number | undefined
}) {
  try {
    // Check Adb version and if installed
    adbCheck()

    let ipAddress = options.ip
    let port: number | undefined = options.port

    ipAddress = await parseIp(ipAddress)

    try {
      port = await parsePort(port, ipAddress)
      if (!port) {
        throw new Error('Port is not open')
      }
      await adbConnect(ipAddress, port)
    } catch (error: any) {
      console.log(
        'Device is unreachable, please use different IP address with -i option'
      )
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
