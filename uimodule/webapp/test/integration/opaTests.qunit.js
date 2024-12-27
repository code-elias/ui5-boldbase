/* global QUnit */

QUnit.config.autostart = false

sap.ui.getCore().attachInit(function () {
  'use strict'

  sap.ui.require(['eligolam/boldbase/test/integration/AllJourneys'], function () {
    QUnit.start()
  })
})
