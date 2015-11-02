"use strict";

var expect = require('chai').expect;
var fs = require('fs');
var palette = require(__dirname + '/../lib/palette-translate');
var pixel = require(__dirname + '/../lib/pixel-translate');
var transform = require(__dirname + '/../lib/transform');
var bitmap = fs.readFileSync('bitmap1.bmp');

describe('translates buffer to array and back to buffer', function(){

  it('should return a bitmap palette as an array of objects', function(){


      expect(palette.getPalette(bitmap)).to.be.an('array');
      expect(palette.getPalette(bitmap)[1]).to.be.an('object');
      expect(palette.getPalette(bitmap)[1]["r"]).to.be.a('number');
      expect(palette.getPalette(bitmap)[1]["g"]).to.be.a('number');
      expect(palette.getPalette(bitmap)[1]["b"]).to.be.a('number');
      expect(palette.getPalette(bitmap)[1]["a"]).to.be.a('number');


  });

  it('translates a color palette array into a buffer object', function(){
//
      var paletteArry = palette.getPalette(bitmap);
      expect(palette.takeTransform(paletteArry, 1078)).to.be.a('object');

      var testArry = [{b: 1,g: 2, r: 3, a: 4 },
        {b: 5,g: 6, r: 7, a: 8},
        {b: 9,g: 10, r: 11, a: 12},
        {b: 13,g: 14, r: 15, a: 16},
        {b: 17,g: 18, r: 19, a: 20},
      ];
      expect(palette.takeTransform(testArry, 20).readInt8(1)).to.equal(2);
  });

  it('takes a transform and a bitmap, applies it to bitmap, and returns new bitmap', function(){
    palette.prepBMP(transform.transformList.Make_It_Grayscale, 'bitmap1.bmp');
    var bufferCheck = fs.readFileSync(__dirname + '/../mrTest13.bmp');
    console.log(bufferCheck.readUInt8(0));
  });
});

describe('translates pixel to buffer, applies transform, and to new buffer', function(){
  it('takes a buffer and returns an array', function(){
    var arry = pixel.getData(bitmap);
    expect(arry[0]).to.be.a('number');
  });

  it('takes a buffer and returns the first row ', function(){
      var arry = pixel.getRow(bitmap);
      expect(arry).length(100);
      expect(arry).to.be.an('array');
  });

  it('translate bitmap array back into a buffer', function(){
    var testArray = [1,2,3,4,5,6];
    var buf = pixel.takeTransform(testArray, 6);
    expect(buf.readInt8(0)).to.equal(1);

  });

  it('take updated pixel data and write to new file', function(){
    pixel.prepBMP(transform.transformList.Make_It_Backwards, 'bitmap1.bmp');
    var bufferCheck = fs.readFileSync(__dirname + '/../mrsTest1.bmp');
    console.log(bufferCheck.readUInt8(0));
  });

});
