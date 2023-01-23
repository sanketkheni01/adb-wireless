import delay from 'delay'
import connect from '../connect.js'
import generateQr from './createQrCode.js'
import { startMdnsScanQr } from './mdnsScan.js'

export default async function pair() {
  try {
    const { password, showQr } = generateQr()
    showQr()
    const res = await new Promise<{ ip: string } | void>((resolve, reject) => {
      startMdnsScanQr(password, resolve, reject)
    })
    console.log('✅ Paired successfully')
    const ip = res?.ip
    if (ip) {
      console.log(`Connecting to ${ip}...`)
      delay(1000)
      await connect({ ip, port: undefined })
    }
    process.exit(0)
  } catch (error) {
    console.log(error)
  }
}
