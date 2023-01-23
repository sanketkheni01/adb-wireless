import fs from 'fs-extra'
import nconf from 'nconf'
import os from 'os'

export const initConfig = () => {
  const configPath = `${os.homedir()}/.config/adb_wireless`
  fs.ensureDirSync(configPath)

  let data = fs.readJSONSync(`${configPath}/config.json`, { throws: false })
  if (!data) {
    data = {}
    fs.writeJSONSync(`${configPath}/config.json`, data)
  }

  nconf.file({ file: `${configPath}/config.json` })
  nconf.load()
}
