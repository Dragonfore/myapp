let http = require('http');  
let url = require('url');  
let fs = require('fs');
let express = require('express');
let app = express();
let path = require('path')

app.use(express.static('css'));
app.use(express.static('pictures'));
app.use(express.static('javascript'));

let server = http.createServer(function(req, res) {  
    if(req.url === "/"){
      fs.readFile("./index.html", "UTF-8", function(err, html){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
      });
    }
    else if(req.url.match("\.css$")){
      let cssPath = path.join(__dirname, req.url);
      let fileStream = fs.createReadStream(cssPath, "UTF-8");
      res.writeHead(200, {"Content-Type": "text/css"});
      fileStream.pipe(res);
    }
    else if(req.url.match("\.jpeg$")){
      let imagePath = path.join(__dirname, req.url);
      let fileStream = fs.createReadStream(imagePath);
      res.writeHead(200, {"Content-Type": "image/png"});
      fileStream.pipe(res);
    }
    else if(req.url.match('\.js$')){
      let jsPath = path.join(__dirname, req.url);
      
    }
    else if(req.url.match("\.html$")){
      let htmlPath = req.url;
      fs.readFile('./'+htmlPath, 'UTF-8', function(err, html){
        if(err){
          console.log("Error parsing html page");
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
      });
    }
    else{
      res.writeHead(404, {"Content-Type": "text/html"});
      res.end("No Page Found");
    }
});  
server.listen(8084);  