import path from 'path'
import fs from 'fs'
import os from 'os'
import toml from 'toml'

import { Credentials, Parsed } from '../types'

//! Parse configuration file
//! Avoid throwing the exception

const parseConfig = (raw: string): Credentials => {
  const parsed: Parsed = toml.parse(raw)

  let credentials: Credentials = { username: '', password: '' }

  if (parsed.credentials) {
    credentials.username = parsed.credentials.username
    credentials.password = parsed.credentials.password
  }

  return credentials
}

//! Read login credentials from local configuration
//! Alterative to get from command line

//! todo: make file path dynamic, read from .config/

const readConfig = (): Credentials => {
  const dir: string = path.join(os.homedir(), './.motive.toml')
  const file: string = fs.existsSync(dir) ? fs.readFileSync(dir, 'utf-8') : ''

  const { username, password } = parseConfig(file)

  return { username, password }
}

//! Write valid credentials to local config file
//! Only called if status 200

const writeConfig = (data: Credentials) => {
  const { username, password } = data

  const dir: string = path.join(os.homedir(), './.motive.toml')
  const content: string = `[credentials]\nusername='${username}'\npassword='${password}'`

  fs.writeFileSync(dir, content)
}

//! Parse credentials from local filesystem
//! otherwise, get command line credentials

const getConfig = (): Credentials => {
  const config: Credentials = readConfig()
  const { username, password } = config

  return { username, password }
}

export default {
  parseConfig,
  readConfig,
  writeConfig,
  getConfig,
}
