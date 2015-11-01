var prompt = require('prompt');
var input = module.exports = {};
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();
ee.on("someEvent", function () {
    console.log(entry);
});

var entry = -1;

var startInput = {

  AskAndEnter: function(functionList) {
    console.log('Welcome to the bitmap transformer'.green);
    console.log('Please select an option:'.red);
    for(var x=0; x<functionList.length; x++){
      var rdble = functionList[x].replace(/_/g, " ");
      console.log((x+1) + '. ' + rdble);
    };
  },

  GetEntry: function(callback){
    prompt.message = "";
    prompt.delimiter = "";

    prompt.start();
    prompt.get([{
      name: 'selection',
      description: 'Enter an option: '.magenta,
      type: 'string',
      required: true
    }], function(err, results) {
      entry = results;
    });
    callback();
  },

  GetResult: function(){
    return entry;
  }
}

module.exports.startInput = startInput;
