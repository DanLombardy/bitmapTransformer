fs = require('fs');

//header
var bitmap = fs.readFileSync('bitmap1.bmp');
var format = bitmap.toString('utf-8',0,2);
var size = bitmap.readUInt32LE(2);
var pixelData = bitmap.readUInt32LE(10);
var width = bitmap.readUInt32LE(18);
var height = bitmap.readUInt32LE(22);
var bitsPerPixel = bitmap.readUInt16LE(28);
var numColors = bitmap.readUInt32LE(46);



function getColorTable(){
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

function transColorTable(tbl){
  var tempTbl = tbl;
  for(var i=0; i<tempTbl.length; i++){
    if(tempTbl[i].r < 150){
      tempTbl[i].r += 50;
    };
    if(tempTbl[i].g < 150){
      tempTbl[i].g += 50;
    };
  }
  return tempTbl;
}

function binarifyColorTable(tbl){
  var mainBuf = new Buffer(1078)
  var t = 0;
  for(var g=0; g<tbl.length; g++){
    /*if(tbl[g].r < 200){
      tbl[g].r += 55;
    }*/
    var avg = (tbl[g].r + tbl[g].b + tbl[g].g)/3;
    mainBuf.writeUInt8(avg, t);
    t++;
    mainBuf.writeUInt8(avg, t);
    t++;
    mainBuf.writeUInt8(avg, t);
    t++;
    mainBuf.writeUInt8(tbl[g].a, t)
    t++;
  }
  //console.log(buf);
  return mainBuf;
}

function getRow() {
  var row = [];
  for(var i=1078; i<=1177; i++){
    row.push(bitmap.readUInt8(i));
  }
  return row;
}
function conslog(){
  console.log('size: ' + size);
  console.log('pixelData: ' + pixelData);
  console.log('bitsPerPixel: ' + bitsPerPixel);
  console.log('numColors: ' + numColors);
  console.log('width: ' + width);
  console.log('height: ' + height);
  var colorTable = getColorTable();
  console.log(colorTable);
  var row1 = getRow();
  console.log(row1);
  console.log('first pixel: ' + colorTable[28].b + ' ' + colorTable[28].g + ' '+ colorTable[28].r);
};

var newPal = binarifyColorTable(getColorTable());

newPal.copy(bitmap, 54, 0)


fs.appendFile('mrTest10.bmp', bitmap, function (err) {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
