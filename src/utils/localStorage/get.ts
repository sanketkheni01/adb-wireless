import nconf from 'nconf'

export default async function get(key: string) {
  const value = await nconf.get(key)
  return value
}
