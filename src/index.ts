#! /usr/bin/env node

import { program } from 'commander'
import nconf from 'nconf'
import connect from './utils/connect.js'

nconf.file({ file: './config.json' })
nconf.load()

program
  .command('connect')
  .description('Connect android device for wireless debugging')
  .option('-i, --ip <ip-address>', "Your android device's IP address")
  .option('-p, --port <port>', 'The port to connect to', parseInt)
  .action(connect)

// program
//   .command('pair')
//   .description('Generate a pairing qr code for your android device')
//   .action(pair)

program.parse()
