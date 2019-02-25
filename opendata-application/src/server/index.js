const express = require('express');
const os = require('os');
var cron = require('node-cron');
const path = require("path");
const app = express();

const https = require('https');
var fs = require('fs');
var pathToJsonfile = '../../opendata.json';
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://13.53.130.192:27017/";

var options = {
    host: 'opendata.hopefully.works',
    port: '443',
    path: '/api/events',
    headers:{
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODgsImVtYWlsIjoid3FodWFuZy51c3RjQGdtYWlsLmNvbSIsImlhdCI6MTU1MDY4NDM3NH0.UmnZg58QM4bGi6H4VM7JPfPvkU5Sr3hWUn2UibrZUY0'
    }

}

// retrieve all data from mongodb and update cache file (opendata.json)
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("efimongo");
    dbo.collection("opendata").find({}, { projection: { _id: 0 } }).toArray(function(err, result) {
        if (err) throw err;
        // write result back to file cache(opendata.json)
        console.log(result);

        fs.writeFile("./opendata.json", JSON.stringify(result), 'utf8', function(err){
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("The file is saved.");
    });
        db.close();
    });
    });


cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
    console.log("schduler is on");

    var filename = 'opendata.json';
    fs.open(filename,'r',function(err, fd){
        if (err) {
          fs.writeFile(filename, '[]', function(err) {
              if(err) {
                  console.log(err);
              }
              console.log("Create new opendata.json file!");
          });
        } else {
          console.log("The file exists!");
        }
      });

    request = https.get(options, function(res){
        var response = "";
        var absolutePath = path.resolve(__dirname, pathToJsonfile);
        console.log("absolute path:" + absolutePath);
    
        res.on('data', function(data){ 
            response += data;
        });
    
        res.on('end', function(){
            console.log(response);
            //insert new data into mongodb
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("efimongo");
                var data = JSON.parse(response);
                dbo.collection("opendata").insertOne(data, function(err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });
              });


        });
    
        res.on('error', function(err){
            console.log("Got error: " + err.message);
        });

        // retrieve all data from mongodb and update cache file (opendata.json)
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("efimongo");
            dbo.collection("opendata").find({}, { projection: { _id: 0 } }).toArray(function(err, result) {
              if (err) throw err;
              // write result back to file cache(opendata.json)
              console.log(result);

              fs.writeFile("./opendata.json", JSON.stringify(result), 'utf8', function(err){
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log("The file is saved.");
            });
              db.close();
            });
          });
    });
  });





app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/updateData', (req, res) => {
    var absolutePath = path.resolve(__dirname, pathToJsonfile);
    fs.readFile(absolutePath, 'utf8', function(err,obj){
        var response = JSON.parse(obj);
        //seprate 4 sensor data into 4 arrays
        const allSensors = [];

        for (let j = 1; j < Object.keys(response[0]).length; j += 1) {
            const sensor = [];
            for (let i = 0; i < response.length; i += 1) {
            const name = Object.keys(response[0])[j];
            sensor.push([response[i].date, response[i][name]]);
            }
            allSensors.push(sensor);
        }

        res.send(allSensors);
        if (err){
            console.log(err);
            throw err;
        }
    });

});


app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8081}!`));
