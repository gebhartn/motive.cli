export interface Credentials {
  username: string
  password: string
}

interface Auth {
  status: number
  data: AuthPayload
}

interface AuthPayload {
  payload: string
}
