"use strict";

var transformList = {
//EXAMPLE FUNCTION TO CONVERT PASSED PALETTE TO GRAYSCALE
  grayscalePalette: function(tbl){
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
  },

  reversePixels: function(arry){
    var newArry = arry;
    newArry.reverse();
    return newArry;
  },

  streak: function(arry){
    var newArray = arry;
    for(var i=0, offSet=0; i<(newArray.length/2)-1; i+=5, offSet++){
      var mv = i+offSet;
      arry[mv] = 0;
      arry[newArray.length-mv] = 0;
    }
    newArray.splice(newArray.length-2,1);
    return newArray;
  }
}
module.exports.transformList = transformList;
//module.exports.streak = streak;
//module.exports.reversePixels = reversePixels;
//module.exports.grayscalePalette = grayscalePalette;
