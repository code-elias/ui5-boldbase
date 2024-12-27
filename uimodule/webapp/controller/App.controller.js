sap.ui.define(
  ['eligolam/boldbase/controller/BaseControllerProject', 'sap/ui/model/json/JSONModel', 'sap/ui/core/Fragment'],
  function (BaseController, JSONModel, Fragment) {
    'use strict'

    var oController = {}

    return BaseController.extend('eligolam.boldbase.controller.App', {
      onInit: function () {
        oController = this

        this.userSet({}, true)

        // Called by all new Views
        this.oRouter = this.getOwnerComponent().getRouter()
        this.oRouter.attachRouteMatched(this.onRouteMatched, this)
        this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this)
      },

      onBeforeRouteMatched: function (oEvent) {
        const oModel = this.getOwnerComponent().getModel()
        const oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(0)
        const sLayout = oNextUIState.layout

        // Update the layout of the FlexibleColumnLayout
        if (sLayout) {
          oModel.setProperty('/layout', sLayout)
        }
      },

      onRouteMatched: function (oEvent) {
        const sRouteName = oEvent.getParameter('name')
        const oArguments = oEvent.getParameter('arguments')
        let validUser = true

        // Skip user validation
        // this.userCheck(sRouteName).then(
        //   function () {
        //     this._updateUIElements()

        //     var shellBar = this.byId('shellBar')

        //     //mostro la NavBar solo all'occorrenza
        //     if (sRouteName == 'login' || sRouteName == 'home') {
        //       shellBar.setShowNavButton(false)
        //     } else {
        //       shellBar.setShowNavButton(true)
        //     }
        //   }.bind(this)
        // )

        // Save the current route name
        this.currentRouteName = sRouteName
        this.currentProject = oArguments.project
        this.currentWbs = oArguments.wbs
        this.currentMaterial = oArguments.material
      },

      onStateChanged: function (oEvent) {
        var bIsNavigationArrow = oEvent.getParameter('isNavigationArrow'),
          sLayout = oEvent.getParameter('layout')

        this._updateUIElements()

        // Replace the URL with the new layout if a navigation arrow was used
        if (bIsNavigationArrow) {
          this.oRouter.navTo(this.currentRouteName, { project: this.currentProject, wbs: this.currentWbs, material: this.currentMaterial }, true)
        }
      },

      handleBackButtonPressed: function () {
        window.history.go(-1)
      },

      onExit: function () {
        this.oRouter.detachRouteMatched(this.onRouteMatched, this)
        this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this)
      },

      getUserInitial: function (user) {
        try {
          if (user.user.UserName) {
            var initial1 = '',
              initial2 = '',
              spazio

            initial1 = user.user.UserName.substring(0, 1).toUpperCase()

            //controllo l'esistenza dello spazio
            var spazio = user.user.UserName.indexOf(' ')

            if (spazio != -1) {
              initial2 = user.user.UserName.substring(spazio + 1, spazio + 2).toUpperCase()
            }

            return initial1 + initial2
          }
        } catch (e) {}
      },

      onAvatarPress: function (oEvent) {
        //Mostro i menu utente solamente se non sono sulla login
        if (this.currentRouteName != 'login') {
          var oButton = oEvent.getParameters('avatar').avatar,
            oView = this.getView()

          //carico il fragment
          if (!this._MenuUserFrag) {
            this._MenuUserFrag = Fragment.load({
              id: oView.getId(),
              name: 'eligolam.boldbase.fragment.MenuUser',
              controller: this
            }).then(
              function (oMenu) {
                oView.addDependent(oMenu)
                oMenu.openBy(oButton)
                this._MenuUser = oMenu
                return oMenu
              }.bind(this)
            )
          } else {
            this._MenuUser.openBy(oButton)
          }
        }
      },

      visibleLogin: function (user) {
        return user ? true : false
      }
    })
  }
)
