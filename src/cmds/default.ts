import { Todo } from '../services/'
import { Colors } from '../utils'
import { CommandModule } from 'yargs'

const command = '$0'
const describe = 'Default command, fetches all todos'

const handler = () => {
  Todo.getAll().then(({ todos }) => {
    if (!todos.length) {
      Colors.printError(`\nCouldn't find any todos`)
    } else {
      console.log(' ')
      todos.forEach(({ id, category, content }: any) => {
        Colors.printSuccess(`[${id}] [${category}] ${content}`)
      })
      console.log(' ')
    }
  })
}

export default {
  command,
  describe,
  handler,
} as CommandModule
