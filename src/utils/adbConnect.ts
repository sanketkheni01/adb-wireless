import { exec } from 'child_process'

export default function adbConnect(ip: string, port: number) {
  // run command "adb connect ip:port"
  let command = `adb connect ${ip}:${port}`
  exec(command, (err, stdout, stderr) => {
    err && console.log(err)
    if (stdout) {
      if (stdout.startsWith('failed to connect')) {
        console.log(`First pair your device => "adb pair ${ip}:{port}"`)
      } else {
        console.log(stdout)
      }
    }
    stderr && console.log(stderr)
  })
}
