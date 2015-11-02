"use strict";

//header info
var fs = require('fs');
var bitmap = fs.readFileSync(__dirname + '/../bitmap1.bmp');
var transform = require(__dirname + '/transform');

//pull color palette from bmp buffer

function getPalette(bitmap){
  var indexedTable = [];
  for(var e=54; e<1078; e+=4){
    indexedTable.push({
      index: indexedTable.length,
      r: bitmap.readUInt8(e+2),
      g: bitmap.readUInt8(e+1),
      b: bitmap.readUInt8(e),
      a: bitmap.readUInt8(e+3)
    });
  };
  return indexedTable;
}

/*BEGIN functions to recreate and insert buffers*/
//transform color palette to insertable buffer
function takeTransform(tbl, bufferSize){
  var mainBuf = new Buffer(bufferSize);
  var t=0;
  for(var y=0; y<tbl.length; y++){
    mainBuf.writeUInt8(tbl[y].b, t);
    mainBuf.writeUInt8(tbl[y].g, t+1);
    mainBuf.writeUInt8(tbl[y].r, t+2);
    mainBuf.writeUInt8(tbl[y].a, t+3);
    t+=4;
  }
  return mainBuf;
}

//shove updated color palette into new bitmap and save
function prepBMP(transformType, bitmapOrig){
  var map = fs.readFileSync(bitmapOrig);
takeTransform(transformType(getPalette(map)), 1078).copy(map, 54, 0);
fs.writeFile('mrTest13.bmp', map, function (err) {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
}

module.exports.getPalette = getPalette;
module.exports.takeTransform = takeTransform;
module.exports.prepBMP = prepBMP;
