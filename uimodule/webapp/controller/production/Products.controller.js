sap.ui.define(
  ['eligolam/boldbase/controller/BaseControllerProject', 'eligolam/boldbase/Modules/api', 'eligolam/boldbase/model/Formatter', 'sap/ui/model/json/JSONModel'],
  function (BaseController, api, Formatter, JSONModel) {
    'use strict'

    return BaseController.extend('eligolam.boldbase.controller.production.Products', {
      //#region Setup
      Formatter: Formatter,
      onInit() {
        this.oRouter = this.getRouter()
        this.oRouter.getRoute('products').attachMatched(this._onRouteMatched, this)
      },
      onBeforeRendering() { },
      onAfterRendering() { },
      _onRouteMatched(oEvent) { this.getProducts() },
      //#endregion Setup

      async getProducts() {
        let data = await api.asyncGet('mock/data/products.json')
        this.setModel(new JSONModel(data), 'Products')
      }
    })
  }
)
