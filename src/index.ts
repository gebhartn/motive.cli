#!/usr/bin/env node

import './utils/env'
import yargs from 'yargs'
import { Commands } from './cmds'

yargs
  .command(Commands.handleDefault)
  .command(Commands.handleAdd)
  .command(Commands.handleGet)
  .command(Commands.handleDelete)
  .help().argv
