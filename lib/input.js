var palette = require(__dirname +'/palette-translate');
var pixel = require(__dirname + '/pixel-translate');
var input = require(__dirname + '/input');
var prompt = require('prompt');


var startInput = {

  AskAndEnter: function(functionList) {
    console.log('Welcome to the bitmap transformer'.green);
    console.log('Please select an option:'.red);
    for(var x=0; x<functionList.length; x++){
      var strReplace = {
        _:" ",
        Color:"",
        Pixel:""
      };
      var rdble  = functionList[x].replace(/_|Color|Pixel/gi, function(matched){
        return strReplace[matched];
      });
      console.log((x+1) + '. ' + rdble);
    };
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
          if(funcs[results.selection-1].substring(0,5)=='Color'){
            palette.prepBMP(funcs[results.selection-1].substring(6));
          } else {
            pixel.prepBMP(funcs[results.selection-1].substring(6));
          }
        });
  }
}



module.exports.startInput = startInput;
