import axios from 'axios'
import { Auth, Credentials } from '../types'

type AxiosPost = (endpoint: string) => (body: Credentials) => Promise<Auth>

const authenticationPost: AxiosPost = endpoint => async body => {
  const baseURL = process.env.BASE_URL || 'http://localhost:8000'

  return axios
    .post(baseURL + endpoint, body)
    .then(response => {
      const { status, data } = response

      return { status, data }
    })
    .catch(error => {
      const { response } = error
      const { status, data } = response

      return { status, data }
    })
}

export const loginRequest = authenticationPost('/auth/login')
export const registerRequest = authenticationPost('/auth/register')

export default {
  loginRequest,
  registerRequest,
}
