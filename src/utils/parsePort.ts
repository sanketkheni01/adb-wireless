import getPortFromRange from './getPortFromRange.js'
import isPortActive from './isPortActive.js'
import get from './localStorage/get.js'
import set from './localStorage/set.js'

export default async function parsePort(port: number, ipAddress: string) {
  // if port is not exits in args, get port from the storage
  if (!port) {
    port = await get('port')
    try {
      await isPortActive(port, ipAddress)
    } catch (err) {
      port = await getPortFromRange(ipAddress)
      set('port', port)
    }
  } else {
    const isPortOpen = await isPortActive(port, ipAddress)
    if (!isPortOpen) {
      throw new Error('Port is not open')
    }
    set('port', port)
  }
  return port
}
