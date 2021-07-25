const mongodb = require("mongodb");

// Inatlize connection
// MongoClient --> Give us nescessary functions to connect to DB--> CRUD

const mongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";

const dbName = "task-manger";

mongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Error has occurred");
    }
    console.log("Success");
    const db = client.db(dbName);

    // insert

    // db.collection('users').insertOne({
    //     name:'Omar',
    //     age:27
    // },(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertOne({
    //     name:'Mohamed',
    //     age:30
    // })

    // db.collection('tasks').insertMany([
    //     {description:'task1',completed:true},
    //     {description:'task2',completed:false},

    // ])

    //////////////////////////////////////////////////////////////////////////////////////////////

    const ObjectID = mongodb.ObjectID;
    // const _id = new ObjectID()
    // console.log(_id)

    // db.collection('users').insertOne({
    //     _id:_id,
    //     name:'Omar',
    //     age:30
    // })

    //////////////////////////////////////////////////////////////////////////////////////////

    // db.collection("users").findOne(
    //   { _id: new ObjectID("60ebfc4f1e798016c441a2bc") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Error");
    //     }
    //     console.log(user);
    //   }
    // );

    //////////////////////////////////////////////////////////////////////////////////////////////

    // db.collection('users').find({age:30}).toArray((error,users)=>{
    //     if(error){
    //         return console.log('Error')
    //     }
    //     console.log(users)
    // })

    // db.collection('users').find({age:30}).count((error,users)=>{
    //     if(error){
    //         return console.log('Error')
    //     }
    //     console.log(users)
    // })

    // db.collection('users').find({age:30}).limit(1).toArray((error,users)=>{
    //     if(error){
    //         return console.log('Error')
    //     }
    //     console.log(users)
    // })

    /////////////////////////////////////////////////////////////////////////////////////////////

    // Update

    // db.collection('users').updateOne({_id:new ObjectID('60ebfc4f1e798016c441a2b9')},{
    //     $set:{name:'Amr'},
    //     $inc:{age:5}
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({},{
    //     $set:{completed:true}
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection("tasks")
      .updateMany(
        {},
        {
          $set: { completed: true },
        }
      )
      .then((result) => {
        console.log(result.modifiedCount);
      })
      .catch((error) => {
        console.log(error);
      });
    ////////////////////////////////////////////////////////////////////////////////////////////

    // DeleteOne

    db.collection("users")
      .deleteOne({ age: 20 })
      .then((result) => {
        console.log(result.deletedCount);
      })
      .catch((error) => {
        console.log(error);
      });

      db.collection('users').deleteMany({}).then((result)=>{
          console.log(result.deletedCount)
      }).catch((error)=>{
          console.log(error)
      })
  }
);
