var fs = require('fs');
var options = {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    };
var app = require('express')()
  , server = require('https').createServer(options, app)
  , io = require('socket.io').listen(server);

server.listen(443);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'welcome!!'});
  socket.emit('update', { date: Date().toString() });

  socket.on('update', function(){
    console.log("hey hey hey");
    setTimeout(function(){
      socket.emit('update', { date: Date().toString() });
    }, 3000);
  });
  socket.on('disconnect', function (socket) {
    socket.emit('message', { message: 'bye!!'})
  });
});


