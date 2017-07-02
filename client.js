/* jshint esversion: 6 */

// Load library
const net = require('net');

// Connect client
const client = net.connect({port: 6969, host: '0.0.0.0'}, () => {

});


process.stdin.on('readable', () => {
  let chunk = process.stdin.read();
    if(chunk !== null) {
      client.write(chunk);
    }
});


client.on('data', (chunk) => {
  process.stdout.write(chunk);
});






