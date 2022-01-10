
const mongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const CollectionName = 'stormCollection';
const DatabaseName = 'dere';

mongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database connected!");
    // db.close();
    var dbo = db.db(DatabaseName);

    // dbo.createCollection('stormCollection',(err,res)=>{
    //     if (err) throw new Error("unable to create new Collection")
    //     console.log("the collection is created")
    //     // db.close()//
    // })

    // var post1 = {
    //     title : 'Post one',
    //     author : 'Dere Boy',
    //     date : Date(),
    //     id:1,
    //     reviewed : true,
    //     reviewers:['abe','kabe','bini','bekele'],
    //     metadata:{
    //         deviceIP:'192.168.33.93',
    //         location:'Addis Ababa',
    //     }
    // }

    // dbo.collection(CollectionName).insertOne(post1,(error,result)=>{
    //     console.log('the document is successfully inserted')
    //     console.log(result)
    // })

    // dbo.collection(CollectionName).findOne({},(err,result)=>{
    //     console.log(result['_id'].toString())
    //     db.close()
    // })
    console.log("closing database collection")
    db.close()

});
