sap.ui.define(['eligolam/boldbase/controller/BaseControllerProject', 'eligolam/boldbase/model/Formatter'], function (BaseController, Formatter) {
  'use strict'

  var oController = {}
  var oView = {}

  return BaseController.extend('eligolam.boldbase.controller.Home', {
    Formatter: Formatter,
    onInit: function () {
      oController = this
      oView = this.getView()

      var oRouter = this.getRouter()
      oRouter.getRoute('home').attachMatched(this._onRouteMatched, this)
    },
    onBeforeRendering: function () {},
    onAfterRendering: function () {},
    _onRouteMatched: function (oEvent) {}
  })
})
