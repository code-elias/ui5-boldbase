const sandbox = {
  test() {
    console.log('API TEST')
    this.testFunction()
  },

  testFunction() {
    console.log('Inner function')
  }
}

sap.ui.define([], function () {
  'use strict'
  return sandbox
})
