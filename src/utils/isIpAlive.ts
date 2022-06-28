import ping from 'ping'

export default async function isIpAlive(ip: string) {
  let res = await ping.promise.probe(ip)
  return res.alive
}
