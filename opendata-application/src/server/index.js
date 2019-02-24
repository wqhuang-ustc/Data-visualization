const express = require('express');
const os = require('os');
var cron = require('node-cron');
const path = require("path");
const app = express();

const https = require('https');
var fs = require('fs');
/*production path*/
var pathToJsonfile = '../../opendata.json';
var array_json;
/*development path*/
//var pathToJsonfile = '/home/kylin/Eficode2019_task/opendata-application/src/client/opendata.json';

var options = {
    host: 'opendata.hopefully.works',
    port: '443',
    path: '/api/events',
    headers:{
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODgsImVtYWlsIjoid3FodWFuZy51c3RjQGdtYWlsLmNvbSIsImlhdCI6MTU1MDY4NDM3NH0.UmnZg58QM4bGi6H4VM7JPfPvkU5Sr3hWUn2UibrZUY0'
    }

}


cron.schedule('1 * * * *', () => {
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
            var element = JSON.parse(response);

            //write response json to jsonfile
            fs.readFile(absolutePath, 'utf8', function(err,obj){
                var array = JSON.parse(obj);
                array.push(element);
                fs.writeFile(absolutePath, JSON.stringify(array), 'utf8', function(err){
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    console.log("The file is saved.");
                });
                if (err){
                    console.log(err);
                    throw err;
                }
            });


        });
    
        res.on('error', function(err){
            console.log("Got error: " + err.message);
        });
    });
  });



app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/updateData', (req, res) => {
    var absolutePath = path.resolve(__dirname, pathToJsonfile);
    fs.readFile(absolutePath, 'utf8', function(err,obj){
        var response = JSON.parse(obj);
        res.send(response);
        if (err){
            console.log(err);
            throw err;
        }
    });

});


app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8081}!`));
