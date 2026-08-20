sap.ui.define([
    "sap/ui/core/UIComponent",
    "bookscapmfreestyleui5/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("bookscapmfreestyleui5.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
            const oHashChanges =  sap.ui.core.routing.HashChanger.getInstance();
            if(window.location.hash !== '#'){
                oHashChanges.replaceHash('');
            }

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});