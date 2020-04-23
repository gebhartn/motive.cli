import { AxiosResponse } from 'axios'
import { Auth } from '../utils'
import login from './login'

export const Todo = {
  getAll: async (): Promise<AxiosResponse> => {
    const { payload } = await login()
    const { data } = await Auth.protectedRequest(payload).get('/todo')

    return data
  },

  getOne: async (id: string): Promise<AxiosResponse> => {
    const { payload } = await login()
    const { data } = await Auth.protectedRequest(payload).get(`/todo/${id}`)

    return data
  },

  getBy: async (filter: string): Promise<AxiosResponse> => {
    const where = `/todo/filter?search=${filter}`

    const { payload } = await login()
    const { data } = await Auth.protectedRequest(payload).get(where)

    return data
  },

  deleteOne: async (id: string): Promise<AxiosResponse> => {
    const { payload } = await login()
    const { data } = await Auth.protectedRequest(payload).delete(`/todo/${id}`)

    return data
  },

  makeOne: async (topic: string, content: string): Promise<AxiosResponse> => {
    const { payload } = await login()
    const { data } = await Auth.protectedRequest(payload).post(`/todo`, {
      topic,
      content,
    })

    return data
  },
}

