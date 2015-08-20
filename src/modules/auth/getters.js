const authdata = ['authdata']

const isLoggedIn = [
  ['authdata'],
  (authdata) => {
    return authdata.get('data') && authdata.get('data').get('loggedIn')
  }
]

const userDetails = [
  ['authdata'],
  (authdata) => {
    return authdata.get('data') && authdata.get('data').get('details') ? authdata.get('data').get('details').toJS() : null
  }
]

const csrfToken = [
  ['authdata'],
  (authdata) => {
    return authdata.get('data') && authdata.get('data').get('csrfToken') ? authdata.get('data').get('csrfToken') : null
  }
]

export default { authdata, isLoggedIn, userDetails, csrfToken }