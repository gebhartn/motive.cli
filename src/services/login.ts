import { Colors, Config, Credentials, Auth } from '../utils'

import { AuthPayload } from '../types'

//! Attempt to authenticate with the provided credentials.

const login = async (): Promise<AuthPayload> => {
  const credentials = Credentials.composeCredentials()

  const { status, data } = await Auth.loginRequest(credentials)

  if (status > 200) {
    Colors.printError(`\nInvalid credentials`)

    return { payload: '' }
  }

  Config.writeConfig(credentials)

  return data
}

export default login
