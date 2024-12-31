sap.ui.define(['eligolam/boldbase/controller/BaseControllerProject', 'eligolam/boldbase/model/Formatter'], function (BaseController, Formatter) {
  'use strict'

  return BaseController.extend('eligolam.boldbase.controller.Home', {
    //#region Setup
    Formatter: Formatter,
    onInit() {
      this.oRouter = this.getRouter()
      this.oRouter.getRoute('home').attachMatched(this._onRouteMatched, this)
    },
    onBeforeRendering() {},
    onAfterRendering() {},
    _onRouteMatched(oEvent) {}
    //#endregion Setup
  })
})
