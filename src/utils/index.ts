import path from 'path'
import fs from 'fs'
import os from 'os'
import toml from 'toml'
import { Credentials } from '../services/types'

//! Parse configuration file
//! Avoid throwing the exception

interface Parsed {
  credentials?: Credentials
}

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

console.log(readConfig())
