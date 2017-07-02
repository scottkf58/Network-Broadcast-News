/* jshint esversion: 6 */

// Load library
const net = require('net');

// Track clients
let clients = [];

// Start server
const server = net.createServer((socket) => {
  clients.push(socket);


  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort;


  // Welcome/joined message
  socket.write('Welcome: ' + socket.name + "\n");
  broadcast(socket.name + ' joined the chat' + "\n");
  socket.write('Enter Username: ');
  //console.log(socket.name);


  // Incoming messages from clients
  socket.on('data', (data) => {

    data = data.slice(0, data.length -1);

    if(socket.name === socket.remoteAddress + ":" + socket.remotePort) {

      socket.name = data;

      console.log(data.toString() + ' has joined');

    } else {

      broadcast(socket.name + ': ' + data + "\n");
      //broadcast(`${socket.name}: ${data}\n`);

    }

  });



  // Send message to all clients, except sender
  function broadcast(message, sender) {
    clients.forEach (function (client) {
      if(client === sender) {
        return;
      } else {
        client.write(message);
      }

    });

    //log it to the server output
    process.stdout.write(message + '\n');
  }

});

server.listen({port: 6969, host: '0.0.0.0'},  () => {
  console.log('Opened sever ', server.address());
});








