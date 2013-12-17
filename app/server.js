
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var things = [];

var host = process.env.IP || '127.0.0.1';

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

var sendAPI = function(req, res) {
  var url = '';
  req.on('data', function(data) {
    url += data;
  });
  req.on('end', function() {
    console.log('url', url);
  });
  sendResponse(200, res);
};


var verbs = {
  "GET": getSite,
  "OPTIONS": sendResponse,
  "POST": sendAPI
};

var handle = function(req, res) {
    var method = verbs[req.method];
    if(method){
         method(req, res);
    }
};

http.createServer(handle).listen(port, host);

console.log('Server running a ' +host+":"+port );