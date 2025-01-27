sap.ui.define(
  ['eligolam/boldbase/controller/BaseControllerProject', 'eligolam/boldbase/Modules/api', 'eligolam/boldbase/model/Formatter', 'sap/ui/model/json/JSONModel', "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"],
  function (BaseController, api, Formatter, JSONModel, Filter, FilterOperator) {
    'use strict'

    return BaseController.extend('eligolam.boldbase.controller.project.Projects', {
      //#region Setup
      Formatter: Formatter,
      onInit() {
        this.oRouter = this.getRouter()
        this.oRouter.getRoute('projects').attachMatched(this._onRouteMatched, this)
      },
      onBeforeRendering() { },
      onAfterRendering() { },
      _onRouteMatched(oEvent) { this.getProjects() },
      //#endregion Setup

      //#region Data
      async getProjects() {
        let data = await api.asyncGet('mock/data/projects.json')
        this.setModel(new JSONModel(data), 'Projects')
      },
      //#endregion Data

      //#region DOM Functions

      //#region Search
      onProjectSearch(oEvent) {
        const sQuery = (oEvent.getSource().getValue() ?? '').trim()
        this.filterList(sQuery)
      },

      filterList(sQuery) {
        const oBinding = this.getView().byId('ProjectsList').getBinding('items')

        if (!sQuery || sQuery.length == 0) {
          oBinding.filter(null)
          return // Guard Statement if no search string is given
        }

        oBinding.filter(new Filter({
          filters: [
            new Filter('ProjectName', FilterOperator.Contains, sQuery),
            new Filter('ClientName', FilterOperator.Contains, sQuery)
          ],
          and: false
        }))
      },
      //#endregion Search

      //#endregion DOM Functions
    })
  }
)
