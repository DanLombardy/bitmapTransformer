"use strict";
var fs = require('fs');
var transform = require(__dirname + "/transform");
var bitmap = fs.readFileSync(__dirname + "/bitmap1.bmp");


//pull pixel data from bmp buffer
function getData(){
  var newTable = [];
  for(var a=1078; a<bitmap.length; a++){
    newTable.push(bitmap[a]);
  }
  return newTable;
}

function getRow() {
  var row = [];
  for(var i=1078; i<=1177; i++){
    row.push(bitmap.readUInt8(i));
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
function prepBMP(func){
  var map = fs.readFileSync(__dirname + '/bitmap1.bmp');
  switch(func){
    case 'Make_It_Streaked':
      takeTransform(transform.transformList.Pixel_Make_It_Streaked(getData()), 10000).copy(map, 1078, 0);
      fs.appendFile('Streaked.bmp', map, function (err) {
        if (err) throw err;
        console.log('The streaked file was created');
      });
      break;
    case 'Make_It_Backwards':
      takeTransform(transform.transformList.Pixel_Make_It_Backwards(getData()), 10000).copy(map, 1078, 0);
      fs.appendFile('Backwards.bmp', map, function (err) {
        if (err) throw err;
        console.log('The backwards file was created');
      });
      break;
  }
}



module.exports.getData = getData;
module.exports.getRow = getRow;
module.exports.takeTransform = takeTransform;
module.exports.prepBMP = prepBMP;
