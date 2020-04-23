import readLineSync from 'readline-sync'

interface Credentials {
  username: string
  password: string
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

export default getCommandLineCredentials
