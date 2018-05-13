const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'nicky@example.com',
  //   text: 'Hey. What is going on?',
  //   createAt: 123
  // });
  // socket.emit('newMessage', {
  //   from: 'hola',
  //   text: 'what is different, it just the name.',
  //   createAt: 1234
  // });

// socket.on('createEmail', (newEmail) => {
//   console.log('createEmail', newEmail);
// });

//socket.emit from Admin text Welcome to the chat app
socket.emit('newMessage', {
  from: 'Admin',
  text: 'Welcome to the chat app'
});

//socket.bradcast emit from Admin text New user joined
socket.broadcast.emit('newMessage', {
  from: 'Admin',
  text: 'New user joined',
  createdAt: new Date().getTime()
})

socket.on('createMessage', (message) => {
  console.log('createMessage', message);
  io.emit('neewMessage', {
    from: message.from,
    text: message.text,
    createdAt: new Date().getTime()
  });
  // socket.broadcast.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // });
});


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);


});





// console.log(__dirname + '/../public');
// console.log();
