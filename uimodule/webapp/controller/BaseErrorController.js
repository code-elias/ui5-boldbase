sap.ui.define(
  ['eligolam/boldbase/controller/BaseAjaxErrorController', 'sap/m/MessageBox', 'sap/ui/model/json/JSONModel'],
  function (BaseController, MessageBox, JSONModel) {
    'use strict'

    return BaseController.extend('eligolam.boldbase.controller.BaseErrorController', {
      openErrorBox: function () {
        if (!this._oErrorDialog) {
          this._oErrorDialog = this.loadFragment({
            name: 'eligolam.boldbase.fragment.ErrorBox'
          })
        }
        this._oErrorDialog.then((oDialog) => oDialog.open())
      },

      onCloseErrorBox: function () {
        if (this._oErrorDialog) {
          this._oErrorDialog.then((oDialog) => oDialog.close())
        }
      },

      handleError: function (response, level = 'error') {
        let msg = response

        if (response.Message) {
          msg = response.Message
        } else if (response.message) {
          msg = response.message
        }

        if (level === 'error') {
          MessageBox.error(msg)
        } else {
          MessageBox.warning(msg)
        }
      },

      initErrorModel: function () {
        this.setErrorModel({
          Message: '',
          InternalMessage: '',
          Error: '',
          InternalError: ''
        })
      },

      setErrorModel: function (errorData) {
        this.getView().setModel(new JSONModel(errorData), 'ErrorModel')
      }
    })
  }
)
