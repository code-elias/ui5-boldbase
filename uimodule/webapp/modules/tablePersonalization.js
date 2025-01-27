sap.ui.define(['sap/ui/table/TablePersoController'], function (TablePersoController) {
  'use string'
  return {
    initTablePersoService(table) {
      return new TablePersoController({
        table: table,
        // In-memory perso service
        persoService: {
          getPersData: function () {
            var oDeferred = new jQuery.Deferred()
            oDeferred.resolve(null)
            return oDeferred.promise()
          },
          setPersData: function () {
            var oDeferred = new jQuery.Deferred()
            oDeferred.resolve()
            return oDeferred.promise()
          },
          delPersData: function () {
            var oDeferred = new jQuery.Deferred()
            oDeferred.resolve()
            return oDeferred.promise()
          }
        }
      })
    }
  }
})