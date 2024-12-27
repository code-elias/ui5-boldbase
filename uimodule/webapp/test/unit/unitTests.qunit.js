QUnit.config.autostart = false

sap.ui.getCore().attachInit(function () {
  'use strict'

  sap.ui.require(['eligolam/boldbase/test/unit/model/formatter'], function () {
    QUnit.start()
  })
})
