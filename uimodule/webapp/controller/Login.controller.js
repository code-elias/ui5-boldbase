const loginController = {
  onInit() {
    this.oRouter = this.getRouter()
    this.oRouter.getRoute('login').attachMatched(this._onRouteMatched, this)
  },

  onBeforeRendering() {},

  onAfterRendering() {
    this.getView().byId('inputUsername').focus()
  },

  _onRouteMatched(oEvent) {
    console.log('Loaded Login page')

    this.resetMessageStrip()
    sandbox.test()
  },

  onLiveChange(oEvent) {
    oEvent.getSource().setValueState('None')
  },

  onUsernameSubmit() {
    this.getView().byId('inputPassword').focus()
  },

  onLogin() {
    this.resetMessageStrip()
    if (!this.isLoginInputValid()) return // Guard Statement

    this.loginToApp()
  },

  loginToApp() {
    BusyIndicator.show(0)

    const inputUsername = oView.byId('inputUsername')
    const inputPassword = oView.byId('inputPassword')
    const userName = inputUsername.getValue()
    const password = inputPassword.getValue()

    const params = {
      UserName: userName,
      Password: password,
      Language: 13
    }

    api
      .login(JSON.stringify(params))
      .then((data) => {
        const user = data.response

        // Clean input values
        inputUsername.setValue('')
        inputPassword.setValue('')
        inputUsername.focus()
        // Set user & token
        this.userSet(user, true)

        // Show success message
        this.impostaMessageStrip(1, this.geti18n('LOGIN_USER_OK'), 'loginPage')
        this.onHandlePress('home') // Navigate to home
      })
      .catch((error) => {
        // Handle errors (e.g., network issues or response.ok = false)
        inputPassword.setValue('')
        inputPassword.focus()

        this.impostaMessageStrip(-1, this.apiManageErrorGet(error), 'loginPage')
      })
      .finally(() => {
        BusyIndicator.hide()
      })
  },

  isLoginInputValid() {
    const oView = this.getView()
    const inputUsername = oView.byId('inputUsername')
    const inputPassword = oView.byId('inputPassword')

    if (inputUsername.getValue() === '') {
      inputUsername.setValueState('Error')
      inputUsername.setValueStateText(this.geti18n('LOGIN_USERNAME_INSERT'))
      inputUsername.focus()
      return false
    } else {
      inputUsername.setValueState('None')
    }

    if (inputPassword.getValue() === '') {
      inputPassword.setValueState('Error')
      inputPassword.setValueStateText(this.geti18n('LOGIN_PASSWORD_INSERT'))
      inputPassword.focus()
      return false
    } else {
      inputPassword.setValueState('None')
    }

    return true
  }
}

sap.ui.define(
  [
    'eligolam/boldbase/controller/BaseControllerProject',
    'eligolam/boldbase/Modules/api',
    'eligolam/boldbase/Modules/sandbox',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/ui/core/BusyIndicator',
    'sap/ui/model/odata/v2/ODataModel'
  ],

  function (BaseController, api, sandbox, JSONModel, MessageBox, BusyIndicator, ODataModel, Storage) {
    'use strict'

    var oController = {}
    var oView = {}

    return BaseController.extend('eligolam.boldbase.controller.Login', loginController)
  }
)
