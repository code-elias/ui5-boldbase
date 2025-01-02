sap.ui.define(['sap/m/MessageBox'], (MessageBox) => {
  'use strict'
  // messageBox = MessageBox
  return sandbox
  // return getSandbox(MessageBox)
})

let messageBox = sap.m.MessageBox

const sandbox = {
  test() {
    console.log('API TEST')
    this.testFunction()
    outerFunction()
    this.testSAPFunctions()
  },

  testSAPFunctions() {
    messageBox.show('TEST MESSAGE BOX')
  },

  testFunction() {
    console.log('Test function')
  },

  innerFunction() {
    console.log('Inner Function')
  }
}

function outerFunction() {
  console.log('Outer Function')
  sandbox.innerFunction()
}

function getSandbox(MessageBox) {
  return {
    test() {
      console.log('API TEST')
      this.testFunction()
      outerFunction()
      this.testSAPFunctions()
    },

    testSAPFunctions() {
      MessageBox.show('TEST MESSAGE TOAST')
    },

    testFunction() {
      console.log('Test function')
    },

    innerFunction() {
      console.log('Inner Function')
    }
  }
}
