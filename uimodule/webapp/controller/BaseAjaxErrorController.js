sap.ui.define(
  ['eligolam/boldbase/controller/BaseAjaxResponseController', 'sap/m/MessageBox', 'sap/ui/model/json/JSONModel'],
  function (BaseController, MessageBox, JSONModel) {
    'use strict'

    return BaseController.extend('eligolam.boldbase.controller.BaseAjaxErrorController', {
      handleAjaxError: function (xhr, textStatus, errorThrown) {
        try {
          if (xhr.status === 401 && !xhr.catchAuthError) {
            return // let the App CheckSession error handle it
          } else if (xhr.status === 0) {
            // Gestione corretta ma sembra che al momento checkSession parte comunque
            // Stato 0 significa mancato collegamento con il backend.
            // this.setErrorModel({
            //   Message: this.geti18n('GENERIC_ERROR'),
            //   InternalMessage: this.geti18n('CONNECTION_ERROR'),
            //   Error: xhr,
            //   InternalError: xhr.type
            // })
            return // Gestione temporanea, da rivedere
          } else if (xhr.origin === 'frontend') {
            this.setErrorModel({
              Message: this.getErrorModelMessage(xhr),
              InternalMessage: xhr.message,
              Error: xhr,
              InternalError: xhr.type
            })
          } else {
            this.handleAPIError(xhr, errorThrown)
          }

          this.openErrorBox()
        } catch {
          this.handleError(xhr.responseJSON.response)
        }
      },

      handleAPIError: function (xhr, errorThrown) {
        if (xhr.status === 400 || xhr.status === 500) {
          this.setErrorModel({
            Message: this.geti18n(`ERROR_AJAX_${xhr.status}`),
            InternalMessage: this.getErrorModelMessage(xhr),
            Error: this.getXhrMessages(xhr),
            InternalError: errorThrown
          })
        } else {
          this.setErrorModel({
            Message: this.geti18n('GENERIC_ERROR'),
            InternalMessage: this.getErrorModelMessage(xhr),
            Error: xhr,
            InternalError: errorThrown
          })
        }
      },

      getErrorModelMessage: function (xhr) {
        try {
          const messages = this.getXhrMessages(xhr)
          return messages.map((message) => message.MessageVerb).join(', ')
        } catch (error) {
          console.error(error, xhr)
          return this.geti18n(`GENERIC_ERROR`)
        }
      },

      getXhrMessages: function (xhr) {
        // Gestione con GetError
        const json = xhr.responseJSON
        if (Object.prototype.hasOwnProperty.call(json, 'GetError')) return json.GetError
        if (Object.prototype.hasOwnProperty.call(json, 'Messages')) return json.Messages
        if (Object.prototype.hasOwnProperty.call(json, 'response')) return json.response.GetError ?? json.response.Messages

        throw new Error('Error object not found')
      }
    })
  }
)
