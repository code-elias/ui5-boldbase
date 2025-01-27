sap.ui.define(
  ['eligolam/boldbase/controller/BaseControllerProject', 'eligolam/boldbase/Modules/api', 'eligolam/boldbase/model/Formatter', 'sap/ui/model/json/JSONModel'],
  function (BaseController, api, Formatter, JSONModel) {
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

      async getProjects() {
        let data = await api.asyncGet('mock/data/projects.json')
        this.setModel(new JSONModel(data), 'Projects')
      }
    })
  }
)
