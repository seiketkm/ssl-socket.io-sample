var fs = require('fs');
var options = {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    };
var app = require('express')()
  , server = require('https').createServer(options, app)
  , io = require('socket.io').listen(server, {'log level': 3});

server.listen(443);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/index.js', function(req, res){
  res.sendfile(__dirname + '/index.js');
});
io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'welcome!!'});
  socket.emit('update', { date: Date().toString() });

  socket.on('update', function(){
    setTimeout(function(){
      socket.emit('update', { date: Date().toString() });
    }, 1000);
  });
});


