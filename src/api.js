let backendUrl = BACKEND_URL

if (backendUrl.indexOf('SAMEHOST') !== -1) {
  backendUrl = backendUrl.replace('SAMEHOST', window.location.hostname)
}

export default {
  api: function (url) {
    return backendUrl + 'api/' + url // see webpack config
  },
  saml: function (url) {
    return backendUrl + 'saml/' + url
  },
  admin: function (url) {
    return backendUrl + 'admin/' + url
  }
}
