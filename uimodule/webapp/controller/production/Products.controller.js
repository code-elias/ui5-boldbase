const PRODUCTS_CONTAINER = 'ProductsTable'
const PRODUCTS_MODEL = 'Products'

sap.ui.define(
  ['eligolam/boldbase/controller/BaseControllerProject', 'eligolam/boldbase/Modules/api', 'eligolam/boldbase/Modules/tableUtils', 'eligolam/boldbase/model/Formatter', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast'],
  function (BaseController, api, tableUtils, Formatter, JSONModel, MessageToast) {
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
      _onRouteMatched(oEvent) {
        this.initProductsModel()
        this.getProducts()
      },
      //#endregion Setup

      //#region Data
      async getProducts() {
        let data = await api.asyncGet('mock/data/products.json')
        this.setProductsModel('List', data)
        this.setProductsModel('Collection', { all: data })
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
        const oSet = this.getProductsModel('SelectedPaths')
        selectedBindings.forEach(item => oSet.add(item.sPath));

        const oOrders = []
        for (const path of oSet) {
          this.getProductsModel().setProperty(`${path}/Label`, this.geti18n('ORDER_LABEL'))
          oOrders.push(this.getProductsModel().getProperty(path))
        }

        this.setProductsModel('Collection/order', oOrders)
        MessageToast.show(this.geti18n('ROWS_TO_ORDER_SUCCESS'))
      },

      onProductTabChange(oEvent) {
        const oSegmentedButton = oEvent.getSource()
        const selectedTab = oSegmentedButton.getSelectedKey()
        this.setProductsModel('SelectedTab', selectedTab)

        const oCollection = this.getProductsModel('Collection')
        this.setProductsModel('List', oCollection[selectedTab])
      },

      getProductLabelVisibility(label) {
        return this.isValidLabel(label)
      },

      getProductLabelIcon(label) {
        return this.isValidLabel(label) ? 'sap-icon://sys-enter' : ''
      },

      getProductLabelState(label) {
        return this.isValidLabel(label) ? 'Success' : 'None'
      },

      //#region Util: Models and Ids
      initProductsModel() {
        this.setModel(new JSONModel({
          List: [],
          SelectedPaths: new Set(),
          SelectedTab: 'all',
          Collection: {
            all: []
          }
        }), PRODUCTS_MODEL)
      },

      getProductsModel(property = '') {
        if (property == '') {
          return this.getModel(PRODUCTS_MODEL)
        }
        else {
          return this.getModel(PRODUCTS_MODEL).getProperty(`/${property}`)
        }
      },

      setProductsModel(property, data) {
        if (property == '') {
          return // Guard Statement
        }
        else {
          return this.getModel(PRODUCTS_MODEL).setProperty(`/${property}`, data)
        }
      },

      getProductsContainer() {
        return this.getView().byId(PRODUCTS_CONTAINER)
      },

      isValidLabel(label) {
        return label != null && label.trim() !== ''
      }
      //#endregion Util: Models and Ids
    })
  }
)
