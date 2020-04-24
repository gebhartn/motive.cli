import axios, { AxiosInstance } from 'axios'

import { Auth, Credentials } from '../types'

type AxiosPost = (endpoint: string) => (body: Credentials) => Promise<Auth>
type AxiosAuth = (token: string) => AxiosInstance

//! Use this to compose functions against public routes
//! Status code is used to handle errors in the request

const authenticationPost: AxiosPost = endpoint => async body => {
  const baseURL = process.env.BASE_URL || 'https://motive-js.herokuapp.com'

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

const loginRequest = authenticationPost('/auth/login')
const registerRequest = authenticationPost('/auth/register')

const protectedRequest: AxiosAuth = token => {
  const baseURL: string =
    process.env.BASE_URL || 'https://motive-js.herokuapp.com'
  return axios.create({
    baseURL,
    headers: {
      Authorization: token,
    },
  })
}

export default {
  loginRequest,
  registerRequest,
  protectedRequest,
}
