var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
  //It will show in Terminal
  // socket.emit('createEmail', {
  //   to:'su@example.com',
  //   text: 'Hey. This is Nick.'
  // });

  socket.emit('createMessage', {
    from: 'Nicky',
    text: 'This just send the message'
  });
});

socket.on('disconnect', function() {
console.log('Disconnected to server');
});

// socket.on('newEmail', function(email){
//   console.log('New email', email);
// })
socket.on('newMessage', function(message){
  console.log('newMessage', message);
})
