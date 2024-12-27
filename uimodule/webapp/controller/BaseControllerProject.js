sap.ui.define(
  [
    'eligolam/boldbase/controller/BaseErrorController',
    'eligolam/boldbase/model/formatter',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/core/BusyIndicator',
    'sap/m/library'
  ],
  function (BaseController, formatter, MessageBox, MessageToast, JSONModel, Filter, FilterOperator, BusyIndicator, mobileLibrary) {
    'use strict'

    var URLHelper = mobileLibrary.URLHelper

    return BaseController.extend('eligolam.boldbase.controller.BaseControllerProject', {
      formatter: formatter,
      onInit: function () {},
      /*FUB Controller base che integra funzioni comuni a tutto il progetti Bxpro*/
      mockupShowMessage: function (messageCode) {
        return new Promise(
          function (res, rej) {
            MessageBox.information(this.geti18n(messageCode), {
              title: this.geti18n('FEATUER_NEXT'),
              onClose: () => res()
            })
          }.bind(this)
        )
      },

      onHandlePress: function (routeName, param) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this.getView())
        switch (routeName) {
          default:
            oRouter.navTo(routeName, null)
        }
      },

      onHomeTilePress: function (oEvent, route, internal = true) {
        if (!internal) {
          switch (route) {
            case 'testGet':
              this.testCall(API.test.base)
              break
            case 'testError400':
              this.testCall(API.test.error + '/400')
              break
            case 'testError401':
              this.testCall(API.test.error + '/401')
              break
            case 'testError500':
              this.testCall(API.test.error + '/500')
              break
            case 'testLongError400':
              this.testCall(API.test.longError + '/400')
              break
            case 'testLongError500':
              this.testCall(API.test.longError + '/500')
              break
            default:
              break
          }
        }
      },

      testCall: function (url) {
        this.getAjaxPromise(url)
          .then((response) => MessageToast.show('SUCCESS'))
          .catch((error) => {
            console.error('TEST ERROR CAUGHT', error)
            try {
              if (error.status == 401) {
                MessageToast.show('UNAUTHORISED')
              }
            } catch {}
          })
          .finally(() => {})
      }
    })
  }
)
