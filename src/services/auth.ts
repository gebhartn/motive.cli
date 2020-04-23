import axios from 'axios'
import { Auth, Credentials } from '../types'

type AxiosPost = (endpoint: string) => (body: Credentials) => Promise<Auth>

//! Use this to compose functions against public routes
//! Status code is used to handle errors in the request

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

//! Handle business logic inside of these functions
//! Login gets called with every attempt to fetch a protected route

export const loginRequest = authenticationPost('/auth/login')
export const registerRequest = authenticationPost('/auth/register')

