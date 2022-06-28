import { exec } from 'child_process'

export default function adbConnect(ip: string, port: number) {
  let command = `adb connect ${ip}:${port}`
  exec(command, (err, stdout, stderr) => {
    err && console.log(err)
    if (stdout) {
      if (stdout.startsWith('failed to connect')) {
        console.log(`First pair your device => "adb-wireless pair"`)
      } else {
        console.log(stdout)
      }
    }
    stderr && console.log(stderr)
  })
}
