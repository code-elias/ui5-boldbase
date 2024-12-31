const sandbox = {
  test() {
    console.log('API TEST')
    this.testFunction()
    outerFunction()
  },

  testFunction() {
    console.log('Test function')
  },

  innerFunction() {
    console.log('Inner Function')
  }
}

sap.ui.define([], function () {
  'use strict'
  return sandbox
})

function outerFunction() {
  console.log('Outer Function')
  sandbox.innerFunction()
}
