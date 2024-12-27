sap.ui.define([], function () {
  'use strict'

  return {
    test() {
      console.log('API TEST')
    },

    login(loginParams) {
      return fetch(API.user.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: loginParams
      }).then((response) => this._getResponseJson())
    },

    _getResponseJson(response) {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json
    }
  }
})
