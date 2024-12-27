const fetchApi = {
  login(loginParams) {
    return fetch(API.user.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include',
      body: loginParams
    }).then((response) => _getResponseJson(response))
  }
}

sap.ui.define([], function () {
  'use strict'
  return fetchApi
})

function _getResponseJson(response) {
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json
}
