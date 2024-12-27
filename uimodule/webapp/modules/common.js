window.API_DOMAIN = 'http://localhost:54001'
// window.API_DOMAIN = 'http://localhost:54852';
// window.API_TEST = 'http://localhost:54851';
window.API = {
  user: {
    login: API_DOMAIN + '/api/Login',
    logout: API_DOMAIN + '/api/LogOut',
    checksession: API_DOMAIN + '/api/Login/CheckSession'
  },
  test: {
    base: API_DOMAIN + '/Test',
    error: API_DOMAIN + '/Test/Error',
    longError: API_DOMAIN + '/Test/LongError'
  }
}
