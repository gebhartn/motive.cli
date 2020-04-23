import readLineSync from 'readline-sync'

import Config from './config'

import { Credentials } from '../types'

//! Read username and password from command line
//! Only use command line arguments if no locals

const getCommandLineCredentials = (): Credentials => {
  const username: string = readLineSync.question('Enter your username: ')
  const password: string = readLineSync.question('Enter your password: ', {
    hideEchoBack: true,
  })

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
}
