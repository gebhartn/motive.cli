import readLineSync from 'readline-sync'
import { readConfig } from '../utils'
import { Credentials } from './types'

//! Parse credentials from local filesystem
//! otherwise, get command line credentials

const getLocalCredentials = (): Credentials => {
  const config: Credentials = readConfig()
  const { username, password } = config

  return { username, password }
}

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
  let credentials = getLocalCredentials()

  if (!(credentials.username || credentials.password)) {
    credentials = getCommandLineCredentials()
  }

  return credentials
}

