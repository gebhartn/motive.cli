import { Colors, Config, Credentials, Auth } from '../utils'

//! Attempt to register with provided credentials

const register = async (): Promise<any> => {
  const { username, password } = Credentials.validateRegistration()

  if (!(username && password)) return

  const { status, data } = await Auth.registerRequest({ username, password })

  if (status > 201) {
    return Colors.printError(`\n${data.err}`)
  }

  Config.writeConfig({ username, password })
  return Colors.printSuccess(`\nRegistered username: ${username}`)
}

export default register
