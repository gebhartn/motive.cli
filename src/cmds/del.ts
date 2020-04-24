import { Todo } from '../services'
import { Colors } from '../utils'

import { CommandModule } from 'yargs'

const command = 'done <id>'
const describe = 'Deletes a todo by id'

const builder = (yargs: any) => {
  yargs.positional('id', {
    describe: 'ID of the todo to be removed',
    type: 'string',
    demandOption: true,
  })
}

const handler = (argv: any) => {
  Todo.deleteOne(argv.id)
    .then(() => Colors.printError(`Deleted todo with id: ${argv.id}`))
    .catch(err => Colors.printError(err.response.data.err))
}

export default {
  command,
  describe,
  builder,
  handler,
} as CommandModule
