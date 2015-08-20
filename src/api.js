let backendUrl = BACKEND_URL

if (backendUrl.indexOf('SAMEHOST') !== -1) {
  backendUrl = backendUrl.replace('SAMEHOST', window.location.hostname)
}

// if using default port used for webpack, assume backend is at port 8000
if (backendUrl === '/' && window.location.port === '3000') {
  backendUrl = window.location.protocol + '//' + window.location.hostname + ':8000/'
}

if (backendUrl.indexOf('//') === -1) {
  let seperator = backendUrl.substring(0, 1) === '/' ? '' : '/'
  backendUrl = window.location.origin + seperator + backendUrl
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
