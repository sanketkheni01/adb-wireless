#! /usr/bin/env node

import { program } from 'commander'
import fs from 'fs-extra'
import nconf from 'nconf'
import { getConfigHome } from 'platform-folders'
import connect from './utils/connect.js'
import pair from './utils/pair/index.js'

const configPath = `${getConfigHome()}/adb_wireless`

fs.ensureDirSync(configPath)
nconf.file({ file: `${configPath}/config.json` })
nconf.load()

program
  .command('connect')
  .description('Connect android device for wireless debugging')
  .option('-i, --ip <ip-address>', "Your android device's IP address")
  .option('-p, --port <port>', 'The port to connect to', parseInt)
  .action(connect)

program
  .command('pair')
  .description('Generate a pairing qr code for your android device')
  .action(pair)

program.parse()
