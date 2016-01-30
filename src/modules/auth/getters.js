const authdataStore = 'authdata'
const authdata = [authdataStore]
const data = [authdataStore, 'data']

const isLoggedIn = [authdataStore, 'data', 'loggedIn']

const userDetails = [
  [authdataStore, 'data', 'details'],
  data => {
    return data ? data.toJS() : null
  }
]

const csrfToken = [authdataStore, 'data', 'csrfToken']

export default {authdata, isLoggedIn, userDetails, csrfToken}
