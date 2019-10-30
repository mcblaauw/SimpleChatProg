var express=require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var tools = require('./assets/js/app.js');
app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user has connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        if(msg == "color") {
            socket.emit("changeButton"); 
        }
    });
});

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});