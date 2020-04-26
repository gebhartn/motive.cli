import { login } from '../services'
import { CommandModule } from 'yargs'

import { Colors } from '../utils'

const command = 'login'

const describe = 'Login as an existing user'

const handler = () => {
  login().then(({ payload }) => {
    if (payload) Colors.printSuccess('\nSuccess!')
  })
}

export default {
  command,
  describe,
  handler,
} as CommandModule
