import { login } from './services'

login()
  .then(res => console.log(res))
  .catch(err => console.log(err))
