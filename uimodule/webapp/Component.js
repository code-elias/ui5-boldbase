sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'sap/ui/Device',
    'eligolam/boldbase/model/models',
    'sap/base/util/UriParameters',
    'sap/f/library',
    'sap/f/FlexibleColumnLayoutSemanticHelper',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/IconPool'
  ],
  /**
   * @param {typeof sap.ui.core.UIComponent} UIComponent
   * @param {typeof sap.ui.Device} Device
   */
  function (UIComponent, Device, models, UriParameters, library, FlexibleColumnLayoutSemanticHelper, JSONModel, IconPool) {
    'use strict'
    var LayoutType = library.LayoutType

    return UIComponent.extend('eligolam.boldbase.Component', {
      metadata: {
        manifest: 'json'
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * @public
       * @override
       */
      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments)

        var oModel = new JSONModel()
        this.setModel(oModel)

        IconPool.registerFont({
          collectionName: 'SAP-icons-TNT',
          fontFamily: 'SAP-icons-TNT',
          fontURI: sap.ui.require.toUrl('sap/tnt/themes/base/fonts'),
          lazy: true
        })

        // enable routing
        this.getRouter().initialize()

        // set the device model
        this.setModel(models.createDeviceModel(), 'device')
      },

      /**
       * Returns an instance of the semantic helper
       * @returns {sap.f.FlexibleColumnLayoutSemanticHelper} An instance of the semantic helper
       */
      getHelper: function () {
        var oFCL = this.getRootControl().byId('fcl'),
          oParams = UriParameters.fromQuery(location.search),
          oSettings = {
            defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
            defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
            mode: oParams.get('mode'),
            initialColumnsCount: oParams.get('initial'),
            maxColumnsCount: oParams.get('max')
          }

        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings)
      }
    })
  }
)
