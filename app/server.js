
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var api = require('./api');
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

var sendStattic = function(res, req, folder, asset){
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

var consume = function(req, res) {
  var data = '';
  req.on('data', function(info) {
    data += info;
  });
  req.on('end', function() {
    console.log('goods', data);
  });
};

var getSite = function(req, res){
  console.log('req', req.url);
  var folder = 'app';
  var pathname = url.parse(req.url).pathname;
  if(pathname === '/api') {
    consume(req, res);
  } else{
    sendStattic(res, req, folder, pathname);
  }
};



var verbs = {
  "GET": getSite,
  "OPTIONS": sendResponse,
  "POST": consume
};

var handle = function(req, res) {
    var method = verbs[req.method];
    if(method){
         method(req, res);
    }
};

http.createServer(handle).listen(port, host);

console.log('Server running a ' +host+":"+port );