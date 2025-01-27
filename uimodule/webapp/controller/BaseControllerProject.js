sap.ui.define(
  [
    'eligolam/boldbase/controller/BaseErrorController',
    'eligolam/boldbase/model/formatter',
    'eligolam/boldbase/Modules/tablePersonalization',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/model/json/JSONModel',
    'sap/ui/table/TablePersoController',
    'sap/m/library'
  ],
  function (BaseController, formatter, tablePersonalization, MessageBox, MessageToast, JSONModel, TablePersoController, mobileLibrary) {
    'use strict'
    var URLHelper = mobileLibrary.URLHelper

    return BaseController.extend('eligolam.boldbase.controller.BaseControllerProject', {
      formatter: formatter,
      onInit() { },

      navigateTo(routeName, param) {
        this.navTo(routeName, param)
      },

      onHomeTilePress(oEvent, route, internal = true) {
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

      //#region Shared DOM SAP functions
      openTablePersonalizationSettings(oEvent, tableName) {
        // Open a table personalization popup based on tablename
        if (this._oTPC == undefined) {
          this._oTPC = tablePersonalization.initTablePersoService(this.byId(tableName))
        }

        this._oTPC.openDialog()
      },

      initTablePersoService: function (tableName) {
        this._oTPC = new TablePersoController({
          table: this.byId(tableName),
          // In-memory perso service
          persoService: {
            getPersData: function () {
              var oDeferred = new jQuery.Deferred()
              oDeferred.resolve(null)
              return oDeferred.promise()
            },
            setPersData: function () {
              var oDeferred = new jQuery.Deferred()
              oDeferred.resolve()
              return oDeferred.promise()
            },
            delPersData: function () {
              var oDeferred = new jQuery.Deferred()
              oDeferred.resolve()
              return oDeferred.promise()
            }
          }
        })
      },
      //#region Shared DOM SAP functions


      //#region TEST 
      testCall(url) {
        this.getAjaxPromise(url)
          .then((response) => MessageToast.show('SUCCESS'))
          .catch((error) => {
            console.error('TEST ERROR CAUGHT', error)
            try {
              if (error.status == 401) {
                MessageToast.show('UNAUTHORISED')
              }
            } catch { }
          })
          .finally(() => { })
      }
      //#endregion TEST
    })
  }
)
