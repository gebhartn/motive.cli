import { Todo } from '../services'
import { Colors } from '../utils'

import moment from 'moment'

import { CommandModule } from 'yargs'

//! Return duration it took to complete the todo

const formatDate = (date: any) => {
  const now = moment()
  const then = moment(Date.parse(date))
  const difference = moment.duration(now.diff(then))

  return difference.humanize()
}

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
    .then(({ data: { todo } }) => {
      const success =
        'It took you ' + formatDate(todo.createdAt) + ' to complete that!'

      Colors.printSuccess(success)
    })
    .catch(err => Colors.printError(err.response.data.err))
}

export default {
  command,
  describe,
  builder,
  handler,
} as CommandModule
