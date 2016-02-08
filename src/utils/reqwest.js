import reqwest from 'reqwest'
import deferredGetter from './deferredGetter'
import {csrfToken} from '../modules/auth/getters'

export default function reqwestWithCsrf(...args) {
  return new Promise((resolve, reject) => {
    deferredGetter(csrfToken).then(csrfToken => {
      if (!args[0].headers) {
        args[0].headers = {}
      }
      args[0].headers['X-CSRFToken'] = csrfToken
      args[0].withCredentials = true
      console.log('args to reqwest', args)
      reqwest(...args).then(resolve, reject)
    })
  })
}
