sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller){
    "use strict";

     return Controller.extend("bookscapmfreestyleui5.controller.Home", {
        
        onBooksLibrary: function () {
            this.getOwnerComponent().getRouter().navTo("RouteView1");
        },
        onLogin: function() {
            sap.m.MessageToast.show("Login Clicked");
        },

        onSignup:function() {
            sap.m.MessageToast.show("Signup Clicked");
        },
        onContact:function() {
            sap.m.MessageToast("Contact was clicked");
        }
    });
});