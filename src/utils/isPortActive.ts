// @ts-ignore
import Evilscan from 'evilscan'

export default function isPortActive(port: number, ip: string) {
  const options = {
    target: ip,
    port: port,
    status: 'TROU', // Timeout, Refused, Open, Unreachable
    banner: true,
  }

  const isPortActivePromise = new Promise<boolean>((resolve, reject) => {
    const evilscan = new Evilscan(options)

    evilscan.on('result', (data: Evilscan) => {
      if (data.status === 'open') {
        resolve(true)
      }
    })

    evilscan.on('error', (err: any) => {
      reject(err)
    })

    evilscan.on('done', () => {
      reject()
    })

    evilscan.run()
  })

  return isPortActivePromise
}
