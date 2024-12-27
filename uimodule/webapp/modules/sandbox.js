const sandbox = {
  test() {
    console.log('API TEST')
    this.testFunction()
    outerFunction()
  },

  testFunction() {
    console.log('Inner function')
  }
}

sap.ui.define([], function () {
  'use strict'
  return sandbox
})

function outerFunction() {
  console.log('Outer Function')
}
