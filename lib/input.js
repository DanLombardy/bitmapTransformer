var palette = require(__dirname +'/palette-translate');
var pixel = require(__dirname + '/pixel-translate');
var input = require(__dirname + '/input');
var transform = require(__dirname + '/transform');
var prompt = require('prompt');


var startInput = {

  AskAndEnter: function(functionList) {
    console.log('Welcome to the bitmap transformer'.green);
    console.log('Please select an option:'.red);
    for(var x=0; x<functionList.length; x++){
      var rdble  = functionList[x].replace(/_/gi, " ").replace(/Color/, ""). replace(/Pixel/, "");
      console.log((x+1) + '. ' + rdble);
    }
  },

  GetEntry: function(funcs){

    prompt.message = "";
    prompt.delimiter = "";

    prompt.start();
    prompt.get([{
      name: 'selection',
      description: 'Enter an option: '.magenta,
      pattern: /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9])$/,
      message: 'entry must be a number',
      type: 'string',
      required: true,
    }], function(err, results) {
          (function(){
            if(funcs[results.selection-1].substring(0,5)=='Color'){
              palette.prepBMP(transform.transformList[funcs[results.selection-1]], __dirname + '/bitmap1.bmp', funcs[results.selection-1]);

            } else {
              pixel.prepBMP(transform.transformList[funcs[results.selection-1]], __dirname + '/bitmap1.bmp', funcs[results.selection-1]);
            }
          })();
        });
  },

  GetStatus: function(){
  prompt.message = "";
  prompt.delimiter = "";
  prompt.start();
  prompt.get([{
    name: 'selection',
    description: 'Do you want to keep screwing with bitmaps? (y/n): '.magenta,
    pattern: /^(?:Y|N|y|n|)$/,
    message: 'hit y or n!',
    type: 'string',
    required: true,
  }], function(err, results) {
        if(results.selection.toLowerCase()=='y'){
          runner.masterInput(true);
        } else {
          runner.masterInput(false);
        }
      });
  }

};

module.exports.startInput = startInput;
