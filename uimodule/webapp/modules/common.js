window.API_PROD = ''
window.API_DEBUG = 'http://localhost:54001'
window.API_DOMAIN = API_DEBUG

window.API = {
  user: {
    LOGIN: API_DOMAIN + '/api/Login',
    logout: API_DOMAIN + '/api/LogOut',
    checksession: API_DOMAIN + '/api/Login/CheckSession'
  },
  test: {
    base: API_DOMAIN + '/Test',
    error: API_DOMAIN + '/Test/Error',
    longError: API_DOMAIN + '/Test/LongError'
  }
}
