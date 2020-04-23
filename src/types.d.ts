export interface Credentials {
  username: string
  password: string
}

export interface Auth {
  status: number
  data: AuthPayload
}

export interface AuthPayload {
  payload: string
}

export interface Parsed {
  credentials?: Credentials
}
