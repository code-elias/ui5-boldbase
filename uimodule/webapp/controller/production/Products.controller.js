const PRODUCTS_CONTAINER = 'ProductsTable'
const PRODUCTS_MODEL = 'Products'

sap.ui.define(
  ['eligolam/boldbase/controller/BaseControllerProject', 'eligolam/boldbase/Modules/api', 'eligolam/boldbase/Modules/tableUtils', 'eligolam/boldbase/model/Formatter', 'sap/ui/model/json/JSONModel'],
  function (BaseController, api, tableUtils, Formatter, JSONModel) {
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

      //#region Data
      async getProducts() {
        let data = await api.asyncGet('mock/data/products.json')
        this.setModel(new JSONModel(data), PRODUCTS_MODEL)
      },
      //#endregion Data

      onAddProductsToOrder() {
        const oProductsTable = this.getProductsContainer()
        let selectedIdx = oProductsTable.getSelectedIndices()
        if (selectedIdx.length == 0) {
          MessageToast.show(this.geti18n('NO_ROWS_SELECTED'))
          return // Guard Statement
        }

        const { selectedBindings, selectedObjects } = tableUtils.getSelectedBindingsFromIndex(oProductsTable, selectedIdx)

        // this.addSelectedRowsToOrder(selectedObjects)
      },

      //#region Util: Models and Ids
      getProductsContainer() {
        return this.getView().byId(PRODUCTS_CONTAINER)
      }
      //#endregion Util: Models and Ids
    })
  }
)
