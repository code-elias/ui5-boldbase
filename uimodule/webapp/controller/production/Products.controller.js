sap.ui.define(
  ['eligolam/boldbase/controller/BaseControllerProject', 'eligolam/boldbase/Modules/sandbox', 'eligolam/boldbase/model/Formatter'],
  function (BaseController, sandbox, Formatter) {
    'use strict'

    return BaseController.extend('eligolam.boldbase.controller.production.Products', {
      //#region Setup
      Formatter: Formatter,
      onInit() {
        this.oRouter = this.getRouter()
        this.oRouter.getRoute('products').attachMatched(this._onRouteMatched, this)
      },
      onBeforeRendering() {},
      onAfterRendering() {},
      _onRouteMatched(oEvent) {}
      //#endregion Setup
    })
  }
)
