const fetchApi = {
  login(loginParams) {
    return fetch(API.user.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include',
      body: loginParams
    }).then((response) => _getResponseJson(response))
  },

  async asyncGet(url) {
    try {
      let response = await fetch(url)

      if (!response.ok) {
        throw new Error(response)
      }

      let data = await response.json()
      return data
    }
    catch (error) {
      console.error(error)
    }
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
