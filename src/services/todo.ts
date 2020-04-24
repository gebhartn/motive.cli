import { Auth } from '../utils'
import login from './login'

export const Todo = {
  getAll: async (): Promise<any> => {
    const { payload } = await login()
    const { data } = await Auth.protectedRequest(payload).get('/todo')

    return data
  },

  getOne: async (id: string): Promise<any> => {
    const { payload } = await login()
    const { data } = await Auth.protectedRequest(payload).get(`/todo/${id}`)

    return data
  },

  getBy: async (filter: string): Promise<any> => {
    const where = `/todo/filter?search=${filter}`

    const { payload } = await login()
    const { data } = await Auth.protectedRequest(payload).get(where)

    return data
  },

  deleteOne: async (id: string): Promise<any> => {
    const { payload } = await login()
    const { data, status } = await Auth.protectedRequest(payload).delete(
      `/todo/${id}`
    )

    return { data, status }
  },

  makeOne: async (category: string, content: string): Promise<any> => {
    const { payload } = await login()
    const { data } = await Auth.protectedRequest(payload).post(`/todo`, {
      category,
      content,
    })

    return data
  },
}
