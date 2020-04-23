import readLineSync from 'readline-sync'

import Config from './config'
import Colors from './colors'

import { Credentials } from '../types'

//! Hides input from command line

const readPassword = (str: string) =>
  readLineSync.question(str, { hideEchoBack: true })

//! Read username and password from command line
//! Only use command line arguments if no locals

const getCommandLineCredentials = (): Credentials => {
  const username: string = readLineSync.question('Enter your username: ')
  const password = readPassword('Enter your password: ')

  return { username, password }
}

//! Compares passwords to prevent user error on registration
//! Returns empty Credentials if validation fails

const validateRegistration = (): Credentials => {
  let password

  const username: string = readLineSync.question('Enter your username: ')
  const passOne: string = readPassword('Enter your password: ')
  const passTwo: string = readPassword('Verify your password: ')

  if (!(passOne === passTwo)) {
    Colors.printError(`\nPasswords do not match`)

    return { username: '', password: '' }
  }

  password = passOne

  return { username, password }
}

//! Attempts to read file system for login credentials
//! If the config is invalid, not found, or missing fields
//! it will instead prompt the user for command line inputs

const composeCredentials = (): Credentials => {
  let credentials = Config.getConfig()

  if (!(credentials.username && credentials.password)) {
    credentials = getCommandLineCredentials()
  }

  return credentials
}

export default {
  getCommandLineCredentials,
  composeCredentials,
  validateRegistration,
}
