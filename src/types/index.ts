export type EvilScan = {
  ip: string
  port: number
  banner: string
  status: 'closed (timeout)' | 'open'
}

class MdnsDeviceData {
  name: string
  ipAddress: string
  port: number
  constructor(name: string, address: string, port: number) {
    this.name = name
    this.ipAddress = address
    this.port = port
  }
}

export { MdnsDeviceData }
