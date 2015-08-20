import AuthStore from '../stores/AuthStore'
import getters from '../getters'
import reqwest from 'reqwest'
import {api} from '../../../api'
import deferredGetter from '../../../utils/deferredGetter'

class AuthService {
  getAuthData() {
    return reqwest({
      url: api('me'),
      withCredentials: true,
      type: 'json'
    })
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      deferredGetter(getters.isLoggedIn).then(isLoggedIn => {
        if (isLoggedIn) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }
}

export default new AuthService()

/*

TODO: port to react/nuclear

module.factory("AuthService", function($location) {
  var roles = ['all']; // TODO: combine this in django somehow

  return {
    isLoggedIn: function () {
      return logged_in;
    },

    hasRole: function (role) {
      return roles.indexOf('all') != -1;
      // FIXME
      //return roles.indexOf(role) != -1;
    },

    getUser: function () {
      return user;
    },

    getMetadata: function () {
      return metadata;
    },

    requireUser: function () {
      if (!logged_in) {
        window.location.href = '/saml/?sso&url=' + encodeURIComponent($location.path());
        return false;
      }
      return true;
    }

*/