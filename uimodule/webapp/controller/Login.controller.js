sap.ui.define(
  [
    'eligolam/boldbase/controller/BaseControllerProject',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/ui/core/BusyIndicator',
    'sap/ui/model/odata/v2/ODataModel'
  ],

  function (BaseController, JSONModel, MessageBox, BusyIndicator, ODataModel, Storage) {
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
        var oView = this.getView()
        var inputUsername = oView.byId('inputUsername')
        inputUsername.focus()
      },
      _onRouteMatched: function (oEvent) {
        this.pulisciMessageStrip()
      },
      onLiveChange: function (oEvent) {
        var input = oEvent.getSource()
        input.setValueState('None')
      },
      onLogin: function () {
        //login all'interno dell'app
        this.pulisciMessageStrip()

        if (this.onValidaInput()) {
          BusyIndicator.show(0)

          var inputUsername = oView.byId('inputUsername'),
            inputPassword = oView.byId('inputPassword'),
            userName = inputUsername.getValue(),
            password = inputPassword.getValue()

          var params = {
            UserName: userName,
            Password: password,
            Language: 13
          }

          $.ajax({
            url: API.user.login,
            dataType: 'json',
            data: params,
            xhrFields: {
              withCredentials: true // JWT Auth
            },
            method: 'POST',
            success: function (response) {
              var user = response.response

              // Clean valori di default
              inputUsername.setValue('')
              inputPassword.setValue('')
              inputUsername.focus()

              // Set user & token

              this.userSet(user, true)
              // this.setToken(token);

              // Nav to home
              this.impostaMessageStrip(1, this.geti18n('LOGIN_USER_OK'), 'loginPage')
              this.onHandlePress('home')
            }.bind(this),
            error: function (response) {
              // Clean password
              inputPassword.setValue('')
              inputPassword.focus()

              this.impostaMessageStrip(-1, this.apiManageErrorGet(response), 'loginPage')
            }.bind(this),
            complete: () => BusyIndicator.hide()
          })
        }
      },
      onValidaInput: function () {
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
