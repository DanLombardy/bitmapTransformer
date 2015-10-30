var EE = require('events').EventEmitter;
var fs = require('fs');

var fileEvents = new EE();

fileEvents.on('processdata', function(data) {
  console.log(data.toString());
});

fileEvents.on('donesomefile', function(data) {
  fs.readFile('anotherfile', function(err, data) {
    if (err) return console.log(err);
    fileEvents.emit('processdata', data);
  })
});

fs.readFile('somefile', function(data) {
  fileEvents.emit('donesomefile', data);
  if (err) return console.log(err);
  fileEvents.emit('processdata', data);
});


