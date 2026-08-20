sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("bookscapmfreestyleui5.controller.View1", {
        onInit() {

            var ODataModel = this.getOwnerComponent().getModel();// odata v4
            this.getView().setModel(ODataModel,'bk');

            //Filters
            var oTable = this.getView().byId('idBooksTable');
            var oBinding = oTable.getBinding('items');
           /*  var aFilters = [
                new sap.ui.model.Filter('price','LT',450.75)
            ];
            oBinding.filter(aFilters);
 */
          
            //sorters
            var oSorter = new sap.ui.model.Sorter('price',true);
            oBinding.sort(oSorter);

        },
       async _showChapter(oEvent){
            var oModel = this.getView().getModel('bk');
            var oBookCtx = oEvent.getParameter('listItem').getBindingContext('bk');
            if(!oBookCtx) return;
            

            var sId = oBookCtx.getProperty("ID");
            var sPath = `/BooksSet(ID=${sId})`;
            //bind context with expand
            var oCtxBinding = oModel.bindContext(sPath,null,{
                $expand : 'chapters'
            });
        
            var oObj = await oCtxBinding.requestObject();
            var aChapters = (oObj && oObj.chapters) ? oObj.chapters : [];

            this.getView().setModel(new sap.ui.model.json.JSONModel(aChapters),'ch');
        
        },
        onItemPress(oEvent){

            const oCtx = oEvent.getSource().getBindingContext('bk');
            const oObj = oCtx.getObject();
         this.getOwnerComponent().getRouter().navTo('RouteView2',{
            ID : oObj.ID
           })
           console.log("Item pressed");
            // this.getOwnerComponent().getRouter().navTo('RouteView2');
            //this.getOwnerComponent.getRouter().getRouteattachPatternMatched(this._onAnyRouteMatched,this);
        },

        _onAnyRouteMatched : function(oEvent){
            
            const name = oEvent.getParameter('name');
            const oArgs = ondeviceorientation.getParameter('arguments');
        },

         _backtoHome(oEvent){

               //window.history.go(-1); this is easy to get the back page of current page,but we should write some code
               const oHistory = History.getInstance();
               const oPreviousHash = oHistory.getPreviousHash();
                if(oPreviousHash !== undefined){
                    window.history.go(-1);
                }else{
                 //fallback
                 this.getOwnerComponent().getRouter().navTo('Home',{},true);

                }
             },
      async  _CreateNewRecord(oEvent){
             var oModel = this.getView().getModel('bk');
             var sGroupId = 'bookcud';
             var sPayload = {
                "title" : "Rich DadPoor Dad",
                "author" : "Robert Kiyosaki",
                "price"  : 200.99,
                "publishedDate" : "2026-01-10T10:30:02",
                "gender" : "M",
                "ageGroup" : "Adult"
             };
             var oitemsBinding = this.byId('idBooksTable').getBinding('items');
             oitemsBinding.create(sPayload,{groupId:sGroupId});
             await oModel.submitBatch(sGroupId)
             .then(x=>{
                 oitemsBinding.refresh();//optional in v4
              })
              .catch(err=>{
                 sap.m.MessageBox.error(err.message || 'create failed');
              })

        },
            //Read triggered automatically by binding<Table items='{/Books}> or manual:(oModel.bindList{"/Books"}.requestContexts() )


       async _UpdateExistingRecord(){
            var oModel = this.getView().getModel('bk');
            var sGroupId= 'bookcud';
            var oTable = this.byId('idBooksTable');
            var oItem = oTable.getSelectedItem();

            if(!oItem){
                sap.m.MessageToast.show('Select a Book ');
                return;
            }
           var oCtx = oItem.getBindingContext('bk');//odata v4 context
           
           //change properties
           oCtx.setProperty('price',500.34);
           oCtx.setProperty('title','....new book');

           //send to Backend through batch operation
           await oModel.submitBatch(sGroupId)
           .then(x =>sap.m.MessageToast.show("Updated"))
           .catch(err=> sap.m.MessageToast.show(err.message || 'Update Failed'));

        },
         _DeleteExistingRecord(){
            var oTable = this.byId('idBooksTable');
            var oItem = oTable.getSelectedItem();
            var sGroupId= 'bookcud';
            if(!oItem){
                sap.m.MessageToast.show('Select a book first');
                return;
            }
            var oCtx = oItem.getBindingContext('bk');
            var oModel = this.getView().getModel('bk');

            MessageBox.confirm("Delete this Book ?",{
              actions: [sap.m.MessageBox.Action.DELETE,sap.m.MessageBox.Action.CANCEL],
              	emphasizedAction: sap.m.MessageBox.Action.DELETE,
                onClose: async(sAction)=>{
                     if(sAction !== sap.m.MessageBox.Action.DELETE) return;

                    try{
                        await oCtx.delete();
                        await oModel.submitBatch(sGroupId);
                        sap.m.MessageBox.show('Deleted');
                    }catch(err){
                        sap.m.MessageBox.error(err.message  ||  'Delete Failed');
                    }

                }
                   
            });
        },
        async _batchupdates(){
          var oModel = this.getView().getModel('bk');
          var sGroupId = 'bookcud';
          var oPayload1 = {
              "title" : "book1",
                "author" : "author 1",
                "price"  : 300.54,
                "publishedDate" : "2026-01-10T10:30:01",
                "gender" : "M",
                "ageGroup" : "Adult"
          };
          var oPayload2 = {
              "title" : "book 2",
                "author" : "author 2",
                "price"  : 200.99,
                "publishedDate" : "2026-01-10T10:30:02",
                "gender" : "M",
                "ageGroup" : "Adult"
          };
          var oItemBinding = this.byId('idBooksTable').getBinding('items');
          oItemBinding.create(oPayload1,{groupId : sGroupId});
           oItemBinding.create(oPayload2,{groupId : sGroupId});

           try{
            await oModel.submitBatch(sGroupId);
                        sap.m.MessageBox.show('2 records Created in one batch');
           }catch(err){

            sap.m.MessageBox.error(err.message ||'Batch Creation Failed');

           }
          

        },
      async  _createfragment(){
        
            if(!this._oCreateDialog){
                this._oCreateDialog = await this.loadFragment({
                    name : 'bookscapmfreestyleui5.fragments.createFragment'
                });
                this.getView().addDependent(this.oCreateDialog);
            }
            const oCreateModel = new sap.ui.model.json.JSONModel({
                newBook : {
                    title : '',
                    author : '',
                    price :null,
                    publishedDate : null

                }
            });
            this.getView().setModel(oCreateModel,'create');
            this._oCreateDialog.open();
        },
        
        
        async _headerItemCrud(){
            const oModel = this.getView().getModel('bk');
            const sGroupId = 'bookcud';
            const oPayload = {
                title : 'The Goodness of Girl',
                author : "Robin Sharma",
                price : 500.89,
                publishedDate : '2026-01-13T00:00:00z',
                chapters : [
                    {title : '3Am club',pages :30 },
                     {title : '4Am club',pages : 40},
                      {title : '5Am club',pages :50 },
                       {title : '6Am club',pages :60 },
                        {title : '8AM club',pages : 70},
                    {title : '7AM Club',pages : 100}
                ]
            };
            try{
                const oBooksBinding = oModel.bindList('/BooksSet');
                const oCtx = oBooksBinding.create(oPayload,{groupId : sGroupId});
                await oModel.submitBatch(sGroupId);
                await oCtx.created();
                
                sap.m.MessageToast.show('Book + Chapters created(deep create)');
                this.byId('idBooksTable').getBinding('items').refresh();

            }catch(error){
                   
    MessageBox.error(error.message);

            }

        },
        async _onBooksValueHelp(){
            if(!this._booksfrag){
              this._booksfrag = await this.loadFragment({
                name : 'bookscapmfreestyleui5.fragments.BooksVH'
              });
              this.getView().addDependent(this._booksfrag);

            }
            this._booksfrag.open();

        },
        _onCancelBookVh(){
         this._booksfrag.close();
        },
        onBookRowPress(oEvent){
           
            var oBookTitle = oEvent.getSource().getBindingContext('bk').getObject().title;
            this.byId('idBooksVH').setValue(oBookTitle);
             this._booksfrag.close();
             this.byId('idBooksTable').getBinding('items').filter(new sap.ui.model.Filter('title','Contains',oBookTitle));
        },
       _resetBooksTable(){

               this.byId('idBooksTable').getBinding('items').filter([]);
       },
    });
});