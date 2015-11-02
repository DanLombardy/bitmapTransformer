"use strict";
var palette = require(__dirname +'/lib/palette-translate');
var pixel = require(__dirname + '/lib/pixel-translate');
var input = require(__dirname + '/lib/input');
var transform = require(__dirname + '/lib/transform');
var fs = require('fs');
var EventEmitter = require("events").EventEmitter;

//header info
var bitmap = fs.readFileSync(__dirname + '/lib/bitmap1.bmp');
var format = bitmap.toString('utf-8',0,2);
var size = bitmap.readUInt32LE(2);
var pixelData = bitmap.readUInt32LE(10);
var width = bitmap.readUInt32LE(18);
var height = bitmap.readUInt32LE(22);
var bitsPerPixel = bitmap.readUInt16LE(28);
var numColors = bitmap.readUInt32LE(46);

//global variables
var functionDisplay = [];

//TEE UP LIST OF FUNCTION DISPLAY NAMES
var i=0;
for(functionDisplay[i++] in transform.transformList) {};

input.startInput.AskAndEnter(functionDisplay);
input.startInput.GetEntry(functionDisplay);

