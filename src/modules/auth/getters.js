const authdata = ['authdata']

const isLoggedIn = [
  ['authdata'],
  (authdata) => {
    console.log('isloggedin')
    return authdata.get('data') && authdata.get('data').get('loggedIn')
  }
]

const userDetails = [
  ['authdata'],
  (authdata) => {
    console.log('authdata', authdata)
    return authdata.get('data') && authdata.get('data').get('details') ? authdata.get('data').get('details').toJS() : null
  }
]

export default { authdata, isLoggedIn, userDetails }