"use strict";
var palette = require(__dirname +'/lib/palette-translate');
var pixel = require(__dirname + '/lib/pixel-translate');
var input = require(__dirname + '/lib/input');
var transform = require(__dirname + '/lib/transform');
var fs = require('fs');


//header info
var bitmap = fs.readFileSync(__dirname + '/lib/bitmap1.bmp');
var format = bitmap.toString('utf-8',0,2);


//global variables
var functionDisplay = [];
//TEE UP LIST OF FUNCTION DISPLAY NAMES

for(var prop in transform.transformList){
  functionDisplay.push(prop);
}

//function masterInput(run){
  //if(run){
    input.startInput.AskAndEnter(functionDisplay);
    input.startInput.GetEntry(functionDisplay);
  //} else {
   // console.log('Thanks for screwing with bitmaps.');
  //}
//};
//masterInput(true);

//module.exports.masterInput = masterInput;
