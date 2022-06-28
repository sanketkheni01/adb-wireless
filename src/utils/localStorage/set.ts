import nconf from 'nconf'

export default async function set(key: string, value: string | number) {
  await nconf.set(key, value)
  nconf.save(function (err: { message: any }) {
    if (err) {
      console.error(err.message)
      return
    }
  })
}
