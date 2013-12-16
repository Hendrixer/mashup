
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var things = [];

var host = process.env.IP || 'localhost';

var port = process.env.PORT || 3000;

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  'Content-Type': "text/html"
};

var extensions = {
  '.html': "text/html",
  '.js': "text/javascript",
  '.css': "text/css",
  '.ico': "image/ico"
};

var sendResponse = function(status, res, stuff) {
  status = status || 200;
  res.writeHead(status, headers);

  res.end(stuff);
};


var sendStattic = function(res, folder, asset){
    if(asset === '/'){
        asset = '/index.html';
    }
    fs.readFile(folder + asset, function(err, html){
        if(err){
            console.log(err);
        } else{
            headers['Content-Type'] = extensions[path.extname(asset)];
            sendResponse(200, res, html);
        }
    });
};

var getSite = function(req, res){
  console.log('req', req.url);
    var folder = 'app';
    var pathname = url.parse(req.url).pathname;
    sendStattic(res, folder, pathname);
};

var saveTodo = function(req, res) {
  var todos = '';
  req.on('data', function(todo) {
    todos += todo;
  });
  req.on('end', function() {
      todos = JSON.parse(todos);
  });
  things.push(todos);
  console.log('save todo');
  sendResponse(200, res);
};

var verbs = {
    "GET": getSite,
    "POST": saveTodo
};

var handle = function(req, res) {
    var method = verbs[req.method];
    if(method){
         method(req, res);
    }
};

http.createServer(handle).listen(port, host);

console.log('Server running a ' +host+":"+port );