var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
  //It will show in Terminal
  // socket.emit('createEmail', {
  //   to:'su@example.com',
  //   text: 'Hey. This is Nick.'
  // });

//   socket.emit('createMessage', {
//     from: 'Nicky',
//     text: 'This just send the message'
//   });
});

socket.on('disconnect', function() {
  console.log('Disconnected to server');
});

// socket.on('newEmail', function(email){
//   console.log('New email', email);
// })
socket.on('newMessage', function(message){
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#message').append(li);

});

socket.emit('createMessage', {
  from: 'Noidea',
  text: 'Hi'
}, function(data){                //This syntax relate to the callback() in server.js
  console.log('Got it', data);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();       //Prevent Default behavior for the events that is  submit event.

    socket.emit('createMessage',  {
      from: 'User',
      text: jQuery('[name=message]' ).val()
  }, function(){

    });
});
