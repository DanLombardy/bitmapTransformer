var prompt = require('prompt');
var input = module.exports = {};

module.exports.getInput = function() {

  prompt.message = "";
  prompt.delimiter = "";

  prompt.start();

  console.log('Welcome to the bitmap transformer'.green);


  prompt.get([{
    name: 'selection',
    description: 'Enter an option: '.magenta,
    type: 'string',
    required: true
  }], function(err, results) {
    console.log(results);
  });

};
