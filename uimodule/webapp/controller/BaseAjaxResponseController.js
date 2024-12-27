sap.ui.define(
  ['eligolam/boldbase/controller/BaseAjaxController', 'sap/m/MessageBox', 'sap/ui/model/json/JSONModel'],
  function (BaseController, MessageBox, JSONModel) {
    'use strict'

    return BaseController.extend('eligolam.boldbase.controller.BaseAjaxResponseController', {
      handleAjaxResponse: function (response, textStatus, xhr) {
        let error

        if (xhr.status === 200) {
          return response // Exit with Response
        }

        // Handle any potential error that passed through
        if (xhr.status === 400) {
          error = new Error(`1 ${textStatus}`)
        } else if (xhr.status === 500) {
          error = new Error(`2 ${textStatus}`)
        } else {
          error = new Error(`3 ${textStatus}`)
        }

        // Add Status and Responses
        error.status = xhr.status
        error.response = response
        error.message = xhr.responseJSON.response.Message ?? textStatus

        // Add Custom Error handling properties
        error.origin = 'frontend'
        error.type = 'configuration'
        error.catchAuthError = false
        this.handleAjaxError(error)
        throw error
      }
    })
  }
)
