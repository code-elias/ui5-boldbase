sap.ui.define(
  ['eligolam/boldbase/controller/BaseControllerProject', 'eligolam/boldbase/Modules/api', 'sap/m/MessageToast', 'sap/m/BusyDialog'],

  (BaseController, api, MessageToast, BusyDialog) => {
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
        this.resetMessageStrip()
      },
      //#endregion Setup

      //#region Login
      onLogin() {
        this.resetMessageStrip()
        if (!this.isLoginInputValid()) return // Guard Statement

        if (SETTINGS.isProduction) {
          this.loginToApp()
        } else {
          this.mockLoginToApp()
        }
      },

      mockLoginToApp() {
        const oBusyDialog = this.getLoginBusyDialog()
        oBusyDialog.open()

        setTimeout(() => {
          this.executeLogin()
          oBusyDialog.close()
        }, 2000)
      },

      loginToApp() {
        // BusyIndicator.show(0)
        const oBusyDialog = this.getLoginBusyDialog()
        oBusyDialog.open()

        const params = {
          userName: this.getInputUsername().getValue(),
          password: this.getInputPassword().getValue()
        }

        api
          .login(JSON.stringify(params))
          .then((data) => this.executeLogin(data))
          .catch((error) => this.handleLoginError(error))
          .finally(() => {
            // BusyIndicator.hide()
            oBusyDialog.close()
          })
      },

      executeLogin(data) {
        // this.setMessageStrip('Success', this.geti18n('LOGIN_USER_OK'), 'loginPage')
        MessageToast.show(this.geti18n('LOGIN_SUCCESS'))
        this.navigateTo('home') // Navigate to home
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
      },

      cleanInputFields(...fields) {
        fields.forEach((element) => {
          element.setValue('')
        })
      },

      getLoginBusyDialog() {
        return new BusyDialog({
          text: this.geti18n('LOGGING_IN')
        })
      }
      //#endregion DOM functions
    })
  }
)
