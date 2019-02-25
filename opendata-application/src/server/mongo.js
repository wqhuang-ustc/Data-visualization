var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://13.53.168.45:27017/";


// insert one document into mongodb
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("efimongo");
  var myobj = ;
  dbo.collection("opendata").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

// get all data from mongodb
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("efimongo");
  dbo.collection("opendata").find({}, { projection: { _id: 0 } }).toArray(function(err, result) {
    if (err) throw err;
    // write result back to file cache(opendata.json)
    console.log(result);
    db.close();
  });
});