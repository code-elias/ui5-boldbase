sap.ui.define(
  [
    'eligolam/boldbase/controller/BaseController',
    'eligolam/boldbase/model/formatter',
    'sap/m/MessageBox',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/core/BusyIndicator',
    'sap/m/library'
  ],
  function (BaseController, formatter, MessageBox, JSONModel, Filter, FilterOperator, BusyIndicator, mobileLibrary) {
    'use strict'

    return BaseController.extend('eligolam.boldbase.controller.BaseAjaxController', {
      onInit: function () {},

      getAjaxPromise: function (url, method = 'GET', data = null, async = false, options = {}) {
        return new Promise((resolve, reject) => {
          // $.ajax(this.buildAjaxOptions(resolve, reject, url, method, data, async, options))
          $.ajax({
            url: url,
            async: async,
            method: method,
            dataType: 'json',
            xhrFields: { withCredentials: true },
            success: (response, status, xhr) => resolve(this.resolveAjax(response, status, xhr)),
            error: (xhr, textStatus, errorThrown) => reject(this.rejectAjax(xhr, textStatus, errorThrown))
          })
        })
      },

      buildAjaxOptions: function (resolve, reject, url, method, data, async, options) {
        let ajaxOptions = this.buildBaseAjax(resolve, reject, url, method, async)

        if (data) {
          if (method === 'GET' || method === 'DELETE') {
            ajaxOptions.data = data
          } else {
            ajaxOptions.contentType = 'application/json'
            ajaxOptions.data = JSON.stringify(data)
          }
        }

        Object.assign(ajaxOptions, options) // Merge any additional options (Optional)
      },

      buildBaseAjax: function (resolve, reject, url, method, async) {
        let ajaxOptions = {
          url: url,
          async: async,
          method: method,
          dataType: 'json',
          xhrFields: { withCredentials: true },
          success: (response, status, xhr) => resolve(this.resolveAjax(response, status, xhr)),
          error: (xhr, textStatus, errorThrown) => reject(this.rejectAjax(xhr, textStatus, errorThrown))
        }
        return ajaxOptions
      },

      resolveAjax: function (response, status, xhr) {
        return this.handleAjaxResponse(response, status, xhr)
      },

      rejectAjax: function (xhr, textStatus, errorThrown) {
        try {
          // Handle Ajax Errors
          this.handleAjaxError(this.addCustomErrorProperties(xhr), textStatus, errorThrown)
        } catch {
          // ToDo: Manage unexpected errors
          console.error(xhr)
        }
        return xhr
      },

      addCustomErrorProperties: function (xhr) {
        // Add Custom Error handling properties
        xhr.origin = 'backend'
        xhr.catchAuthError = false
        return xhr
      }
    })
  }
)
