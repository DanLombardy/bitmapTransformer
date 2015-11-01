fs = require('fs');
var input = require('./input.js')

//header info
var bitmap = fs.readFileSync('bitmap1.bmp');
var format = bitmap.toString('utf-8',0,2);
var size = bitmap.readUInt32LE(2);
var pixelData = bitmap.readUInt32LE(10);
var width = bitmap.readUInt32LE(18);
var height = bitmap.readUInt32LE(22);
var bitsPerPixel = bitmap.readUInt16LE(28);
var numColors = bitmap.readUInt32LE(46);


/* BEGIN functions to get modifiable sections of bitmap buffer */
//pull color palette from bmp buffer
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

//pull pixel data from bmp buffer
function getPixelData(){
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

//EXAMPLE FUNCTION TO CONVERT PASSED PALETTE TO GRAYSCALE
function binarifyColorTable(tbl){
  for(var g=0; g<tbl.length; g++){
      var avg = (tbl[g].r + tbl[g].b + tbl[g].g)/3;
    tbl[g].r = avg;
    tbl[g].g = avg;
    tbl[g].b = avg;
    /*
    var avg = (tbl[g].r + tbl[g].b + tbl[g].g)/3;
    mainBuf.writeUInt8(avg, t);
    t++;
    mainBuf.writeUInt8(avg, t);
    t++;
    mainBuf.writeUInt8(avg, t);
    t++;
    mainBuf.writeUInt8(tbl[g].a, t)
    t++;
    */
  }
  return tbl;
}

function rearrangePixels(arry){
  var newArry = arry;
  newArry.reverse();
  return newArry;
}

function streak(arry){
  var newArray = arry;
  for(var i=0, offSet=0; i<(newArray.length/2)-1; i+=5, offSet++){
    var mv = i+offSet;
    arry[mv] = 0;
    arry[newArray.length-mv] = 0;
  }
  newArray.splice(newArray.length-2,1);
  return newArray;
}

/*BEGIN functions to recreate and insert buffers*/

//transform color palette to insertable buffer
function takeTransformPalette(tbl, bufferSize){
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

function takeTransformPixels(arry, bufferSize){
  var mainBuf = new Buffer(bufferSize);
  for(var v=0; v<arry.length; v++){
    mainBuf.writeUInt8(arry[v], v);
  }
  return mainBuf;
}


//shove updated color palette into new bitmap and save
function prepColorBMP(){
  var map = fs.readFileSync('bitmap1.bmp');
takeTransformPalette(binarifyColorTable(getColorTable()), 1078).copy(map, 54, 0)
fs.appendFile('mrTest12.bmp', map, function (err) {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
}

//shove updated pixel data into new bitmap and save
function prepPixelBMP(func){
  var map = fs.readFileSync('bitmap1.bmp');
  takeTransformPixels(streak(getPixelData()), 10000).copy(map, 1078, 0);
  fs.appendFile('mrsTest21.bmp', map, function(err) {
    if (err) throw err;
    console.log('created file');
  });
}
/*END functions to recreate buffers*/

//RANDOM LOGGING FOR DEBUGGING BEFORE WE HAVE ACTUAL DEBUGGING
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

// uncomment this to run pixel... currently can't run both prepColorBMP and this simultaneously --> prepPixelBMP();
//prepColorBMP();

prepPixelBMP(streak);

//console.log(streak(getPixelData()).length);
//console.log(getPixelData().length);
input.getInput();
