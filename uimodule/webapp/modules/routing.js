sap.ui.define([], () => {
  'use strict'
  return routing
})

const UIComponent = sap.ui.core.UIComponent

const routing = {
  goTo(routeName, view, param) {
    const oRouter = UIComponent.getRouterFor(view)
    oRouter.navTo(routeName, param)
  }
}
