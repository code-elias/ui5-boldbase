sap.ui.define(
  [
    'eligolam/boldbase/controller/BaseControllerProject',
    'eligolam/boldbase/Modules/api',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/ui/core/BusyIndicator',
    'sap/ui/model/odata/v2/ODataModel'
  ],

  function (BaseController, api, JSONModel, MessageBox, BusyIndicator, ODataModel, Storage) {
    'use strict'

    var oController = {}
    var oView = {}

    return BaseController.extend('eligolam.boldbase.controller.Login', {
      onInit: function () {
        oController = this
        oView = this.getView()

        this.oRouter = this.getRouter()
        this.oRouter.getRoute('login').attachMatched(this._onRouteMatched, this)
      },
      onBeforeRendering: function () {},

      onAfterRendering: function () {
        const inputUsername = this.getView().byId('inputUsername')
        inputUsername.focus()
      },

      _onRouteMatched: function (oEvent) {
        this.resetMessageStrip()
        api.test()
      },

      onLiveChange: function (oEvent) {
        oEvent.getSource().setValueState('None')
      },

      onLogin: function () {
        this.resetMessageStrip()
        if (!this.isLoginInputValid()) return // Guard Statement

        this.loginToApp()
        // $.ajax({
        //   url: API.user.login,
        //   dataType: 'json',
        //   data: params,
        //   xhrFields: {
        //     withCredentials: true // JWT Auth
        //   },
        //   method: 'POST',
        //   success: function (response) {
        //     var user = response.response

        //     // Clean valori di default
        //     inputUsername.setValue('')
        //     inputPassword.setValue('')
        //     inputUsername.focus()

        //     // Set user & token

        //     this.userSet(user, true)
        //     // this.setToken(token);

        //     // Nav to home
        //     this.impostaMessageStrip(1, this.geti18n('LOGIN_USER_OK'), 'loginPage')
        //     this.onHandlePress('home')
        //   }.bind(this),
        //   error: function (response) {
        //     // Clean password
        //     inputPassword.setValue('')
        //     inputPassword.focus()

        //     this.impostaMessageStrip(-1, this.apiManageErrorGet(response), 'loginPage')
        //   }.bind(this),
        //   complete: () => BusyIndicator.hide()
        // })
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

      isLoginInputValid: function () {
        //Verifica la validità di username e password
        var oView = this.getView(),
          inputUsername = oView.byId('inputUsername'),
          inputPassword = oView.byId('inputPassword')

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
      },
      onUsernameSubmit: function (oEvent) {
        //focus password
        var oView = this.getView()
        var inputPassword = oView.byId('inputPassword')
        inputPassword.focus()
      }
    })
  }
)
