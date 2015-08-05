export default {
  api: function (url) {
    return BACKEND_URL + 'api/' + url; // see webpack config
  },
  saml: function (url) {
    return BACKEND_URL + 'saml/' + url;
  },
}
