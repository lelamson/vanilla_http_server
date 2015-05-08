'use strict';

var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
  var pathname = url.parse(req.url).pathname;
  var paths = pathname.split('/');


  if (paths[1] === 'time') {
    var current = new Date();
    var time = current.toLocaleTimeString();
    console.log(time);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'The server time is ' + time}));
    res.end();
  } else if ((paths[1] === 'greet') && (paths[2] || req.method === 'POST')) {
    if(req.method === 'POST') {
      var obj;
      req.on('data', function(data) {
        var obj = JSON.parse(data.toString('utf-8'));
        res.writeHead(202, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({msg: 'Hello ' + obj.name}));
        res.end();
      });
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({msg: 'Hello ' + paths[2]}));
      res.end();
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('Dead end!');
    res.end();
  }

});

server.listen(8888, function() {
  console.log('Server started');
});
