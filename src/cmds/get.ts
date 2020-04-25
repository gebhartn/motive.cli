import { CommandModule } from 'yargs'
import moment from 'moment'

import { Todo } from '../services'
import { Colors } from '../utils'

const command = 'get [filter]'

const describe = 'Fetches all todos'

const builder = (yargs: any) => {
  yargs.positional('filter', {
    describe: 'Optional filter for todos',
  })
}

const handler = (argv: any) => {
  if (argv.filter) {
    Todo.getBy(argv.filter).then(({ todos }) => {
      console.log(' ')
      todos.forEach(({ id, category, content }: any) => {
        Colors.printSuccess(`[${id}] [${category}] ${content}`)
      })
      console.log(' ')
    })
  } else {
    Todo.getAll().then(({ todos }) => {
      console.log('TODOs: \n')
      todos.forEach(({ id, category, content }: any) => {
        Colors.printSuccess(`[${id}] [${category}] ${content}`)
      })
      console.log(' ')
    })
  }
}

export default {
  command,
  describe,
  builder,
  handler,
} as CommandModule
