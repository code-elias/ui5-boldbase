sap.ui.define([], function () {
  'use strict'
  return {
    getSelectedBindingsFromIndex: function (oTable, selectedIndices) {
      if (oTable == null) return // Guard statement

      const selectedBindings = []
      const selectedObjects = []

      selectedIndices.forEach((idx) => {
        let oContext = oTable.getContextByIndex(idx)
        selectedBindings.push(oContext)
        selectedObjects.push(oContext.getObject())
      })

      return {
        selectedBindings: selectedBindings,
        selectedObjects: selectedObjects
      }
    },
  }
})


