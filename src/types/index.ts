export type EvilScan = {
  ip: string
  port: number
  banner: string
  status: 'closed (timeout)' | 'open'
}
