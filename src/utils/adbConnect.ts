import { exec } from 'child_process'

export default function adbConnect(ip: string, port: number) {
  // run command "adb connect ip:port"
  let command = `adb connect ${ip}:${port}`
  exec(command, (err, stdout, stderr) => {
    err && console.log(err)
    stdout && console.log(stdout)
    stderr && console.log(stderr)
  })
}
