import generateQr from './createQrCode.js'
import { startMdnsScanQr } from './mdnsScan.js'

export default async function pair() {
  try {
    const { password, showQr } = generateQr()
    showQr()
    await new Promise<void>((resolve, reject) => {
      startMdnsScanQr(password, resolve, reject)
    })
    process.exit(0);
  } catch (error) {
    console.log(error)
  }
}
