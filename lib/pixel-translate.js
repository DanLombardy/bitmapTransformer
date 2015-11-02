"use strict";
var fs = require('fs');
var transform = require(__dirname + "/transform");
var bitmap = fs.readFileSync('bitmap1.bmp');

//pull pixel data from bmp buffer
function getData(bmp){
  var newTable = [];
  for(var a=1078; a<bmp.length; a++){
    newTable.push(bmp[a]);
  }
  return newTable;
}

function getRow(bmp) {
  var row = [];
  for(var i=1078; i<=1177; i++){
    row.push(bmp.readUInt8(i));
  }
  return row;
}
/* END functions to get modifiable sections of bitmap buffer */

function takeTransform(arry, bufferSize){
  var mainBuf = new Buffer(bufferSize);
  for(var v=0; v<arry.length; v++){
    mainBuf.writeUInt8(arry[v], v);
  }
  return mainBuf;
}

//shove updated pixel data into new bitmap and save
function prepBMP(transformType, bitmapOrig){
  var map = fs.readFileSync(bitmapOrig);
  takeTransform(transformType(getData(map)), 10000).copy(map, 1078, 0);
  fs.writeFile('mrsTest1.bmp', map, function(err) {
    if (err) throw err;
    console.log('created file');
  });
}

module.exports.getData = getData;
module.exports.getRow = getRow;
module.exports.takeTransform = takeTransform;
module.exports.prepBMP = prepBMP;
