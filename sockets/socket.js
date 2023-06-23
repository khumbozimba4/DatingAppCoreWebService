var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', (socket) => { //event handler with socket events inside
    console.log('A user connected');
    // Join a room
    socket.on('joinRoom', (room) => {
  
      console.log(`${socket.id} just joined room ${room}`);
  
      socket.join(room);
  
      io.to(room).emit('roomJoined', `${socket.id} just joined the room`);
    });
  
    // Leave a room
    socket.on('leaveRoom', (room) => {
      console.log(`${socket.id} has left room ${room}`);
    
      socket.leave(room);
    
      io.to(room).emit('roomLeft', `${socket.id} has left the room`);
    });
  
  
    // Post a message to a specific room
    socket.on('messageToRoom', (data) => {
  
      console.log(`${socket.id} posted a message to room ${data.room}: ${data.message}`);
      
      io.to(data.room).emit('message', {
        id: socket.id,
        message: data.message
      });
  
    });
  
  
    // Send a message to all connected clients
    socket.on('messageToAll', (data) => {
      console.log(`${socket.id} sent a message to all clients: ${data.message}`);
      
      io.emit('message', {
        id: socket.id,
        message: data.message
      });  
  
    });
    // Disconnect event
    socket.on('disconnect', () => {
  
      console.log(`${socket.id} disconnected`);
  
    });
  
  });
module.exports = io
