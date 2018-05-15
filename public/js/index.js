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
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#message').append(li);

});
socket.on('newLocationMessage', function(message){
  console.log('newLocationMessage', message);
  var li = $('<li></li>');
  var a = $('<a target="_blank"> My current location</a>');
  var iframe = $(`<iframe>Test website inside iframe</iframe>`)

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  iframe.attr('src', message.url);

  $('#message').append(li);
  $('#message').append(iframe);

});

/////////////////////////////////////////
socket.emit('createMessage', {
  from: 'Noidea',
  text: 'Hi'
}, function(data){                //This syntax relate to the callback() in server.js
  console.log('Got it', data);
});
//////////////////////////////////////////


$('#message-form').on('submit', function(e){
    e.preventDefault();       //Prevent Default behavior for the events that is  submit event.

    socket.emit('createMessage',  {
      from: 'User',
      text: $('[name=message]' ).val()
  }, function(){

    });
});


var locationonButton = $('#send-location');
locationonButton.on('click', function() {
  if (!navigator.geolocation){
    return alert('geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (){
    alert('Unable to fetch location');
  });
});
