const fetchApi = {
  login(loginParams) {
    return fetch(API.user.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include',
      body: loginParams
    }).then((response) => this._getResponseJson(response))
  },

  _getResponseJson(response) {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json
  }
}

sap.ui.define([], function () {
  'use strict'
  return fetchApi
})
