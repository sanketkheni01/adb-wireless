import adbConnect from './adbConnect.js'
import parseIp from './parseIp.js'
import parsePort from './parsePort.js'

export default async function connect(options: { ip: string; port: number }) {
  try {
    let ipAddress = options.ip
    let port = options.port

    ipAddress = await parseIp(ipAddress)
    port = await parsePort(port, ipAddress)

    adbConnect(ipAddress, port)
  } catch (error: any) {
    console.log(error.message)
  }
}
