const cds = require('@sap/cds');  // this is cds variable from @sap/cds package
const {Books} = cds.entities; // (the besdide definition has books(entity as variable)) and these two lines are starting point for js file for defining the custom crud operations on the database
   //which includes creating two constant variableswith in above format these two lines definition is called as destructuring)

module.exports = srv =>{      //all the code for custom logic goes into this braces with same name for file as the service file.if the name is wrong then framework will not identify the handlers

    

    const db = cds.db;     // all the queries are handled by db variable(sql queries select,update etc)

    //READ= SELECT
    //CREATE=INSERT
    //UPDATE=UPDATE
    //DELETE= DELETE

    
    //READ
    // srv.on('READ','BooksSet',async(req,resp)=>{          // in fiori the success and err methods will send a request and fetch the server data same as it async we will make  work
    //      results = [];  //variable (it does not require any var or let definition automatically identified)

    //      results = await db.run([
    //         SELECT.from(Books).where({ID:req.data.ID})
    //      ]);

    //      return results;
         
        
    // });

//BEFORE

   srv.before('CREATE','BooksSet',req=>{
    if(req.data.price < 0) req.error(400,'Price cannot be negative');
   })

    // CREATE
    srv.on('CREATE','BooksSet',async(req,resp)=>{
       results = [];
       results = await db.run([
        INSERT.into(Books).entries(req.data)
       ])
       .then((resolve,reject)=>{
        if(resolve)
            return req.data;
        else
            return req.err(400,'Failed to Create');
       }
    )
       .catch(err=>{
        return req.err(500,'server down,Try again'+err.toString());
       })
       return results;
    });

    //UPDATE
    srv.on('UPDATE','BooksSet',async(req,resp)=>{
       results = [];
       results = await db.run([
        UPDATE(Books).set(req.data).where({ID: req.data.ID})
       ])
       .then((resolve,reject)=>{
        if(resolve)
            return req.data;
        else
            return req.err(400,'Failed to Update');
       }
    )
       .catch(err=>{
        return req.err(500,'server down,Try again'+err.toString());
       })
       return results;
    });

    //after
    srv.after('UPDATE','BooksSet',(data)=>{
        console.log(`books Update: ${data.ID}`);
    })

    //DELETE

    srv.on('DELETE','BooksSet',async(req,resp)=>{
        results = [];
        return results = await db.run([
            DELETE.from(Books).where({ID : req.data.ID})
        ])
    });
}