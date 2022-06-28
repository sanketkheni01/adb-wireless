import { portRange } from '../constants/index.js'

// @ts-ignore
import Evilscan from 'evilscan'
import { EvilScan } from '../types/index.js'

export default function getPortFromRange(ip: string) {
  const getPortPromise = new Promise<number>((resolve, reject) => {
    const options = {
      target: ip,
      port: portRange,
      status: 'TROU', // Timeout, Refused, Open, Unreachable
      banner: true,
      concurrency: 8000,
    }

    const evilscan = new Evilscan(options)

    evilscan.on('result', (data: EvilScan) => {
      if (data.status === 'open') {
        evilscan.abort()
        resolve(data.port)
      }
    })

    evilscan.on('error', (err: any) => {
      reject('Unable to scan ports')
    })

    evilscan.on('done', () => {
      // finished !
      reject('Port is not open')
    })

    evilscan.run()
  })
  return getPortPromise
}
