sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History',
    'sap/ui/core/UIComponent',
    'eligolam/boldbase/model/formatter',
    'sap/m/MessageBox',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/ui/util/Storage',
    'sap/ui/core/BusyIndicator'
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   * @param {typeof sap.ui.core.routing.History} History
   * @param {typeof sap.ui.core.UIComponent} UIComponent
   */
  function (Controller, History, UIComponent, formatter, MessageBox, JSONModel, MessageToast, Storage, BusyIndicator) {
    'use strict'
    const tokenStorageName = 'token'
    const userStorageName = 'user'

    String.prototype.formatBS = function () {
      //emulazione String.Format di c#
      var a = this
      for (var k in arguments) {
        a = a.replace(new RegExp('\\{' + k + '\\}', 'g'), arguments[k])
      }
      return a
    }

    return Controller.extend('eligolam.boldbase.controller.BaseController', {
      formatter: formatter,

      /**
       * Convenience method for getting the view model by name in every controller of the application.
       * @public
       * @param {string} sName the model name
       * @returns {sap.ui.model.Model} the model instance
       */
      getModel: function (sName) {
        return this.getView().getModel(sName)
      },

      /**
       * Convenience method for setting the view model in every controller of the application.
       * @public
       * @param {sap.ui.model.Model} oModel the model instance
       * @param {string} sName the model name
       * @returns {sap.ui.core.mvc.View} the view instance
       */
      setModel: function (oModel, sName) {
        return this.getView().setModel(oModel, sName)
      },

      /**
       * Convenience method for getting the resource bundle.
       * @public
       * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
       */
      getResourceBundle: function () {
        return this.getOwnerComponent().getModel('i18n').getResourceBundle()
      },

      geti18n: function (text) {
        return this.getResourceBundle().getText(text)
      },

      /**
       * Method for navigation to specific view
       * @public
       * @param {string} psTarget Parameter containing the string for the target navigation
       * @param {Object.<string, string>} pmParameters? Parameters for navigation
       * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
       */
      navTo: function (psTarget, pmParameters, pbReplace) {
        this.getRouter().navTo(psTarget, pmParameters, pbReplace)
      },
      getRouter: function () {
        return UIComponent.getRouterFor(this)
      },
      getEndPoint: function () {
        return 'http://localhost:8523'
      },
      getModelData: function (api, param = {}, async = true, type = 'GET', merge = false, cache = true, headers = {}) {
        // EGO: Trasformato in Ajax classico per fare controllo xhrFields
        return this.loadDataWithAjax(api, param, {
          async: async,
          method: type,
          dataType: 'json'
        })

        // Vecchio metodo nativo di SAPUI perchè non c'è modo di aggiungere xhrFields
        // return new Promise(function (res, rej) {
        //     var oModel = new JSONModel();
        //     oModel.loadData(api, param, async, type, merge, cache, headers).then(
        //         function(done){
        //             console.log("Promise Model", oModel)
        //             res(oModel);
        //         },
        //         function(fail){
        //             rej(fail);
        //         }
        //     );
        // }.bind(this));
      },

      loadDataWithAjax: function (apiUrl, params = {}, options = { withCredentials: true, dataType: 'json' }) {
        return new Promise((res, rej) => {
          $.ajax({
            url: apiUrl,
            async: options.async ?? true,
            dataType: options.dataType ?? 'json',
            data: params,
            xhrFields: {
              withCredentials: true // JWT Auth
            },
            method: options.method ?? 'GET',
            success: (response) => res(new JSONModel(response)),
            error: (response) => {
              this.checkJwtToken(response).then(
                function (res) {
                  //gestisco tutti gli errori diversi da 401
                  rej(response)
                }.bind(this)
              )
            }
          })
        })
      },
      checkJwtToken: function (response) {
        return new Promise(
          function (res, rej) {
            if (response.status == 401) {
              //logout: se non route è diversa da login ed errore token
              var router = this.getRouter()

              const currentHash = router.getHashChanger().getHash()
              const routeName = router.getRouteInfoByHash(currentHash).name // since 1.75

              if (routeName != 'login') {
                if (!this._logoffDialog) {
                  this._logoffDialog = this.showMessageBox(this.geti18n('SESSION_EXPIRE'), 'error')

                  this._logoffDialog.then(
                    function () {
                      this.onLogout()
                    }.bind(this)
                  )
                }
              }
              rej()
            } else {
              res()
            }
          }.bind(this)
        )
      },
      onNavBack: function () {
        const sPreviousHash = History.getInstance().getPreviousHash()

        if (sPreviousHash !== undefined) {
          window.history.back()
        } else {
          this.getRouter().navTo('home', {}, true /* no history*/)
        }
      },
      _updateUIElements: function () {
        var oModel = this.getOwnerComponent().getModel()
        var oUIState = this.getOwnerComponent().getHelper().getCurrentUIState()

        oModel.setData(oUIState)
      },
      setNextLayout: function (sNextLayout) {
        var oModel = this.getOwnerComponent().getModel()
        oModel.setProperty('/layout', sNextLayout)
        this._updateUIElements()
      },
      impostaMessageStrip: function (status, text, idPage) {
        var type = 'Error'

        if (status == 1) {
          type = 'Success'
        } else if (status == 0) {
          type = 'Warning'
        } else if (status == -1) {
          type = 'Error'
        }

        var oMessageStrip = new sap.m.MessageStrip({
          text: text,
          showCloseButton: true,
          showIcon: true,
          type: type
        })

        this.getView().byId(idPage).insertContent(oMessageStrip, 0)
      },
      pulisciMessageStrip: function () {
        var listaMessageStrip = document.getElementsByClassName('sapMMsgStrip')
        for (var index = 0; index < listaMessageStrip.length; index++) {
          var element = sap.ui.getCore().byId(listaMessageStrip[index].id)

          element.destroy()
        }
      },
      getStorage: function (type) {
        //istanzia lo storage della tipologia passata
        return new Storage(type ?? 'local')
      },
      getToken: function () {
        return this.getStorage().get(tokenStorageName)
      },
      setToken: function (token) {
        return this.getStorage().put(tokenStorageName, token)
      },
      removeToken: function () {
        return this.getStorage().remove(tokenStorageName)
      },
      getUserStorage: function () {
        return this.getStorage('session').get(userStorageName)
      },
      setUserStorage: function (userData) {
        //session storage così viene cancellato alla chiusura del browser ed obbliga a validare il token
        return this.getStorage('session').put(userStorageName, userData)
      },
      userCheck: function (sRouteName) {
        //controllo presenza token e user
        return new Promise(
          function (res, rej) {
            BusyIndicator.show(0)
            this.checkToken()
              .then(
                function () {
                  //Ok: vado alla home se in un altra rotta
                  var oRouter = this.getRouter()
                  if (sRouteName == 'login') oRouter.navTo('home')
                }.bind(this),
                function () {
                  //Ko: ritorno alla login se in un'altra rotta

                  if (sRouteName != 'login') {
                    if (!this._logoffDialog) {
                      this._logoffDialog = this.showMessageBox(this.geti18n('SESSION_EXPIRE'), 'error')

                      this._logoffDialog.then(
                        function () {
                          this.onLogout()
                        }.bind(this)
                      )
                    }
                  }
                }.bind(this)
              )
              .finally(() => BusyIndicator.hide())
            res()
          }.bind(this)
        )
      },
      checkToken: function () {
        //verifica validità del token ed eventualmente attribuisce valori
        return new Promise(
          function (res, rej) {
            $.ajax({
              url: API.user.checksession,
              dataType: 'json',
              xhrFields: {
                withCredentials: true // JWT Auth
              },
              method: 'GET',
              success: (response) => {
                const user = {
                  user: response.response
                }

                // set user & token
                this.userSet(user, true)
                res()
              },
              error: function (response) {
                this.userClear()
                this.removeToken()
                rej()
              }.bind(this)
            })
          }.bind(this)
        )
      },
      userSet: function (userData, updateStorage = false) {
        //Attribuisce i valori dell'user nello storage e nel model
        return new Promise((res, rej) => {
          if (updateStorage) this.setUserStorage(userData) //storage

          //model
          var oComponent = this.getOwnerComponent()
          var oModel = new JSONModel(userData)
          oComponent.setModel(oModel, userStorageName)

          res()
        })
      },
      userClear: function () {
        //pulisce le info storicizzate dell'user
        this.getStorage('session').remove(userStorageName) //storage

        var oComponent = this.getOwnerComponent(),
          oModel = oComponent.getModel(userStorageName)

        //cancellazione model
        if (oModel) {
          oModel.setData(null)
        }
      },
      onLogout: function () {
        // var token = this.getToken();

        //logut api (non verifico se va a buon fine o meno)
        $.ajax({
          url: API.user.logout,
          dataType: 'json',
          xhrFields: {
            withCredentials: true // JWT Auth
          },
          method: 'POST',
          complete: function () {
            //pulizia storage user
            this.userClear()
            this.removeToken()

            this.getRouter().navTo('login')
          }.bind(this)
        })
      },
      oSelectDialogSearchFocus: function (oDialog) {
        var oSFDOM = oDialog.$().find('.sapMSF')
        var oID = oSFDOM[0].id
        var oSearchField = sap.ui.getCore().byId(oID)
        jQuery.sap.delayedCall(300, null, function () {
          oSearchField.focus()
        })
      },
      showMessageBox: function (text, type = 'information', title, actions, emphasizedAction, initialFocus, icon) {
        //return Promise al termine dell'onClose
        return new Promise(function (res, rej) {
          MessageBox[type](text, {
            title,
            icon,
            actions,
            emphasizedAction,
            initialFocus,
            styleClass: 'sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer',
            onClose: function (sAction) {
              res(sAction)
            }
          })
        })
      },
      showMessageToast: function (text) {
        MessageToast.show(text)
      },
      setMessageToastColor: function () {
        //classe per cambiare il colore del messagge toast (TBD)
        var color = '#107e3e'
        var oContentDOM = $('#content') //Pass div Content ID
        var oParent = $('#content').parent() //Get Parent
        //Find for MessageToast class
        var oMessageToastDOM = $('#content').parent().find('.sapMMessageToast')
        oMessageToastDOM.css('background', color) //Apply css
      },
      apiManageError: function (res) {
        //return di una Message Promise in modo tale che si possano fare operazioni sul .then
        return this.showMessageBox(this.apiManageErrorGet(res), 'error')
      },
      apiManageErrorGet: function (res) {
        //ritorno del messaggio di errore standard
        var resJSON = res.responseJSON,
          text = this.geti18n('ERROR_GENERIC')

        if (resJSON && resJSON.hasOwnProperty('response')) {
          if (resJSON.response && typeof resJSON.response == 'string') {
            text = resJSON.response
          } else {
            text = resJSON.response.returnMessage ?? text
          }
        }

        //ritorno messaggio di errore
        return text
      },
      hashOrigin2Short: function (originPath, firstProp, treeProp) {
        //converte un hash firstProp/0/treeProp/2 in 0_2
        var newPath = originPath.slice(1)

        newPath = newPath.replaceAll(`${firstProp}/`, '').replaceAll(`${treeProp}/`, '').replaceAll('/', '_')

        return newPath
      },
      hashShort2Origin: function (newPath, firstProp, treeProp) {
        //converte un hash 0_2 in firstProp/0/treeProp/2
        var originPath = newPath.replaceAll('_', `/${treeProp}/`)

        originPath = `/${firstProp}/${originPath}`

        return originPath
      },
      getCurrentRouteName: function (router = this.getOwnerComponent().getRouter()) {
        const currentHash = router.getHashChanger().getHash()
        return router.getRouteInfoByHash(currentHash).name
      },
      destroyElementsById: function (...idsToDestroy) {
        idsToDestroy.forEach(
          function (id) {
            var oControl = this.getView().byId(id)

            if (oControl) oControl.destroy()
          }.bind(this)
        )
      },
      hideElementsById: function (...idsToHide) {
        idsToHide.forEach(
          function (id) {
            var oControl = this.getView().byId(id)
            if (oControl) oControl.setVisible(false)
          }.bind(this)
        )
      }
    })
  }
)
