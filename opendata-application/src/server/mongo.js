var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://13.53.168.45:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [{
        "date": "2019-02-24T17:00:00.000Z",
        "sensor1": 299.1,
        "sensor2": 276.15,
        "sensor3": -2.8999999999999773,
        "sensor4": 89.2
    }, {
        "date": "2019-02-24T18:00:00.000Z",
        "sensor1": 225,
        "sensor2": 276.54999999999995,
        "sensor3": -2.5,
        "sensor4": 95.3
    }, {
        "date": "2019-02-24T19:00:00.000Z",
        "sensor1": 161.3,
        "sensor2": 276.25,
        "sensor3": -2,
        "sensor4": 94.1
    }, {
        "date": "2019-02-24T20:00:00.000Z",
        "sensor1": 122.5,
        "sensor2": 276.04999999999995,
        "sensor3": -1.3999999999999773,
        "sensor4": 94.5
    }, {
        "date": "2019-02-24T21:00:00.000Z",
        "sensor1": 92.6,
        "sensor2": 276.65,
        "sensor3": -0.5,
        "sensor4": 95.6
    }, {
        "date": "2019-02-24T22:00:00.000Z",
        "sensor1": 83.4,
        "sensor2": 276.95,
        "sensor3": 0.8999999999999773,
        "sensor4": 95.5
    }, {
        "date": "2019-02-24T23:00:00.000Z",
        "sensor1": 100,
        "sensor2": 276.84999999999997,
        "sensor3": 2.1000000000000227,
        "sensor4": 95.6
    }, {
        "date": "2019-02-25T00:00:00.000Z",
        "sensor1": 147.3,
        "sensor2": 276.84999999999997,
        "sensor3": 3.7999999999999545,
        "sensor4": 96.6
    }, {
        "date": "2019-02-25T01:00:00.000Z",
        "sensor1": 205.6,
        "sensor2": 276.54999999999995,
        "sensor3": 7,
        "sensor4": 98.4
    }, {
        "date": "2019-02-25T02:00:00.000Z",
        "sensor1": 254.4,
        "sensor2": 276.25,
        "sensor3": 9.399999999999977,
        "sensor4": 96
    }, {
        "date": "2019-02-25T03:00:00.000Z",
        "sensor1": 296.6,
        "sensor2": 276.65,
        "sensor3": 11.5,
        "sensor4": 98.5
    }, {
        "date": "2019-02-25T04:00:00.000Z",
        "sensor1": 298,
        "sensor2": 276.75,
        "sensor3": 12.600000000000023,
        "sensor4": 96.6
    }, {
        "date": "2019-02-25T05:00:00.000Z",
        "sensor1": 264.9,
        "sensor2": 276.65,
        "sensor3": 13.799999999999955,
        "sensor4": 95.9
    }, {
        "date": "2019-02-25T06:00:00.000Z",
        "sensor1": 193.3,
        "sensor2": 276.25,
        "sensor3": 14.899999999999977,
        "sensor4": 98
    }, {
        "date": "2019-02-25T07:00:00.000Z",
        "sensor1": 144.4,
        "sensor2": 276.25,
        "sensor3": 16,
        "sensor4": 96.4
    }, {
        "date": "2019-02-25T08:00:00.000Z",
        "sensor1": 117.9,
        "sensor2": 276.04999999999995,
        "sensor3": 16.399999999999977,
        "sensor4": 97.5
    }, {
        "date": "2019-02-25T09:00:00.000Z",
        "sensor1": 87.9,
        "sensor2": 275.95,
        "sensor3": 16.200000000000045,
        "sensor4": 91.6
    }, {
        "date": "2019-02-25T09:00:00.000Z",
        "sensor1": 87.9,
        "sensor2": 275.95,
        "sensor3": 16.200000000000045,
        "sensor4": 91.6
    }, {
        "date": "2019-02-25T09:00:00.000Z",
        "sensor1": 87.9,
        "sensor2": 275.95,
        "sensor3": 16.200000000000045,
        "sensor4": 91.6
    }, {
        "date": "2019-02-25T09:00:00.000Z",
        "sensor1": 87.9,
        "sensor2": 275.95,
        "sensor3": 16.200000000000045,
        "sensor4": 91.6
    }, {
        "date": "2019-02-25T09:00:00.000Z",
        "sensor1": 87.9,
        "sensor2": 275.95,
        "sensor3": 16.200000000000045,
        "sensor4": 91.6
    }, {
        "date": "2019-02-25T09:00:00.000Z",
        "sensor1": 87.9,
        "sensor2": 275.95,
        "sensor3": 16.200000000000045,
        "sensor4": 91.6
    }];
    dbo.collection("customers").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });