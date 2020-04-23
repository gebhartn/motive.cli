import { Todo } from '../services'
import { Colors } from '../utils'
import { CommandModule } from 'yargs'

const command = 'add <topic> <content...>'
const describe = 'Adds a new todo'
const builder = (yargs: any) => {
  yargs
    .positional('topic', {
      describe: 'Topic for the todo, ex. Work, Personal',
      type: 'string',
      demandOption: true,
    })
    .positional('content', {
      describe: 'Content text describing the todo',
      type: 'string',
      demandOption: true,
    })
}

const handler = (argv: any) => {
  const topic = argv.topic
  const content = argv.content.join(' ').trim()

  Todo.makeOne(topic, content).then(() =>
    Colors.printSuccess('\nAdded a new todo')
  )
}

export default {
  command,
  describe,
  builder,
  handler,
} as CommandModule
