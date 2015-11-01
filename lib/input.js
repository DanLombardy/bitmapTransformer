var prompt = require('prompt');
var input = module.exports = {};

var entry = -1;

var startInput = {

  AskAndEnter: function(functionList) {

    prompt.message = "";
    prompt.delimiter = "";

    prompt.start();

    console.log('Welcome to the bitmap transformer'.green);
    console.log('Please select an option:'.red);
    for(var x=0; x<functionList.length; x++){
      var readable = functionList[x].replace(/_/g, " ");
      console.log((x+1) + '. ' + readable);
    };

    prompt.get([{
      name: 'selection',
      description: 'Enter an option: '.magenta,
      type: 'string',
      required: true
    }], function(err, results) {
      //console.log(results);
      entry = results;
    });
  },

  GetResults: function(){
    return entry;
  }
}

module.exports.startInput = startInput;
