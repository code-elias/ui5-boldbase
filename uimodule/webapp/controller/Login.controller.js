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
    return BaseController.extend('eligolam.boldbase.controller.Login', {
      //#region Setup
      onInit() {
        this.oRouter = this.getRouter()
        this.oRouter.getRoute('login').attachMatched(this._onRouteMatched, this)
      },

      onBeforeRendering() {},

      onAfterRendering() {
        this.getInputUsername().focus()
      },

      _onRouteMatched(oEvent) {
        console.log('Loaded Login page')

        this.resetMessageStrip()
        sandbox.test()
      },
      //#endregion Setup

      //#region Login
      onLogin() {
        this.resetMessageStrip()
        if (!this.isLoginInputValid()) return // Guard Statement

        // this.loginToApp()
        this.mockLoginToApp()
      },

      mockLoginToApp() {
        this.executeLogin()
      },

      loginToApp() {
        BusyIndicator.show(0)

        const params = {
          userName: this.getInputUsername().getValue(),
          password: this.getInputPassword().getValue()
        }

        api
          .login(JSON.stringify(params))
          .then((data) => this.executeLogin(data))
          .catch((error) => this.handleLoginError(error))
          .finally(() => {
            BusyIndicator.hide()
          })
      },

      executeLogin(data) {
        this.setMessageStrip('Success', this.geti18n('LOGIN_USER_OK'), 'loginPage')
        this.onHandlePress('home') // Navigate to home
      },

      handleLoginError(error) {
        {
          this.getInputPassword().setValue('')
          this.getInputPassword().focus()

          this.setMessageStrip(-1, this.apiManageErrorGet(error), 'loginPage')
        }
      },
      //#endregion Login

      //#region DOM functions
      onLiveChange(oEvent) {
        oEvent.getSource().setValueState('None')
      },

      onUsernameSubmit() {
        this.getView().byId('inputPassword').focus()
      },

      getInputUsername() {
        return this.getView().byId('inputUsername')
      },

      getInputPassword() {
        return this.getView().byId('inputPassword')
      },

      isLoginInputValid() {
        return this.checkLoginField(this.getInputUsername(), this.getInputPassword())
      },

      checkLoginField(...fields) {
        for (const element of fields) {
          if (element.getValue() !== '') {
            element.setValueState('None')
            continue
          }

          element.setValueState('Error')
          element.setValueStateText(this.geti18n('NO_VALUE_INPUT'))
          element.focus()
          return false
        }

        return true
      }
      //#endregion DOM functions
    })
  }
)

// Private Functions
function cleanInputFields(...fields) {
  fields.forEach((element) => {
    element.setValue('')
  })
}
