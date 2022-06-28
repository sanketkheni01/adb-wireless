import isIpAlive from './isIpAlive.js'
import get from './localStorage/get.js'
import set from './localStorage/set.js'

export default async function parseIp(ipAddress: string) {
  // get IP address from storage if not exits in args
  if (!ipAddress) {
    ipAddress = await get('ipAddress')
    const isAlive = await isIpAlive(ipAddress)
    if (!isAlive) {
      throw new Error('Unable to reach IP address')
    }
  } else {
    set('ipAddress', ipAddress)
  }

  return ipAddress
}
