const express = require('express');
const os = require('os');
var d3 = require("d3");
var cron = require('node-cron');
const app = express();

const https = require('https');
var fs = require('fs');
var pathToJsonfile = '/home/kylin/eficode/Eficode2019_task/opendata-application/src/client/opendata.json'

var options = {
    host: 'opendata.hopefully.works',
    port: '443',
    path: '/api/events',
    headers:{
        'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODgsImVtYWlsIjoid3FodWFuZy51c3RjQGdtYWlsLmNvbSIsImlhdCI6MTU1MDY4NDM3NH0.UmnZg58QM4bGi6H4VM7JPfPvkU5Sr3hWUn2UibrZUY0'
    }

}


cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
    console.log("schduler is on");
    request = https.get(options, function(res){
        var body = "";
    
        res.on('data', function(data){ 
            body += data;
        });
    
        res.on('end', function(){
            console.log(body);
            var element = JSON.parse(body);
            //write response json to jsonfile
            fs.readFile(pathToJsonfile, 'utf8', function(err,obj){
                var array = JSON.parse(obj);
                array.push(element);
                fs.writeFile(pathToJsonfile, JSON.stringify(array), 'utf8', function(err){
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("The file is saved.");
                });
            });


        });
    
        res.on('error', function(e){
            console.log("Got error: " + e.message);
        });
    });
  });



app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8081}!`));
