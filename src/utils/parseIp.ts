import isIpAlive from './isIpAlive.js'
import get from './localStorage/get.js'
import set from './localStorage/set.js'

export default async function parseIp(ipAddress: string | undefined) {
  // get IP address from storage if not exits in args
  if (!ipAddress) {
    ipAddress = await get('ipAddress')
    if (!ipAddress) {
      throw new Error('Please provide a valid IP address for the first time')
    }
    const isAlive = await isIpAlive(ipAddress)
    if (!isAlive) {
      throw new Error('IP unreachable, please provide a valid IP address')
    }
  } else {
    set('ipAddress', ipAddress)
  }

  return ipAddress
}
