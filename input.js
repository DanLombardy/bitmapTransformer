var prompt = require('prompt');
var input = module.exports = {};

module.exports.getInput = function() {

<<<<<<< HEAD
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

=======
  var properties = [
    {
      name: 'username',
      validator: /^[a-zA-Z\s\-]+$/,
      warning: 'Username must be only letters, spaces, or dashes'
    },
    {
      name: 'password',
      hidden: true
    }
  ];

  prompt.start();

  prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Username: ' + result.username);
    console.log('  Password: ' + result.password);
  });

  function onErr(err) {
    console.log(err);
    return 1;
  }

>>>>>>> d933543e8874f185a152504751cc46783a3ab42c
};
