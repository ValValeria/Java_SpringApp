const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/public",express.static(path.resolve('src/main/webapp/resources/')));

app.get('/admin/*',(req,resp)=>{
    resp.set("Content-Type",'text/html');

    const file = fs.createReadStream("src/main/webapp/WEB-INF/views/admin/index.jsp");

    file.pipe(resp);
});

app.use('/api/', function(req, res) {
    const options = {
        hostname: "localhost",
        port: 8080,
        path: `/api${req.url}`,
        method: req.method
    }

    if(req.method === "POST"){
        options.headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(req.body))
        };
    }

    const request = http.request(options,(response)=>{
          res.append("Content-Type", response.headers["Content-Type"]);

          response.on("data",(c)=>{
             res.write(c);
          });

          response.on("end", ()=>{
             res.status(response.statusCode).end();
          });
    });

    if(req.method === "POST"){
        request.write(JSON.stringify(req.body));
    }

    request.on("error",()=>{
        res.status(404).end();
    })

    request.end();
});

app.get("*",(req,resp)=>{
    resp.set("Content-Type",'text/html');

    const file = fs.createReadStream(path.resolve('src/main/webapp/WEB-INF/views/index.jsp'));

    file.pipe(resp);
});

app.listen(4200);