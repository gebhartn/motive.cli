import { register } from '../services'
import { CommandModule } from 'yargs'

const command = 'register'

const describe = 'Register a new account'

const handler = () => {
  register()
}

export default {
  command,
  describe,
  handler,
} as CommandModule
