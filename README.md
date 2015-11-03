*******BITMAP Transformer*******

*****CONTRIBUTORS*****
* Dustin Noyes
* David Park
* Dan Lombardy

*****DESCRIPTION*****
The Bitmap Transformer takes a bitmap and adds a useful transform to it. As of version 0.1.0, the available transforms are:
* GRAYSCALE the bitmap
* Reverse the bitmap
* Streak diagonal gray lines across the bitmap

*****EXAMPLE*****
Running Bitmap Transformer couldn't be easier. From the root directory of Bitmap Transformer, run:
node index.js

You will see a screen that welcomes you and then asks you pick a transformation type, like so:

Welcome to the bitmap transformer
Please select an option:
1.  Make It Grayscale
2.  Make It Backwards
3.  Make It Streaked
Enter an option:

Simply enter your transformation type and you will see a version of the bitmap with that transformation created in the root directory of the Bitmap Transformer.


*****MOTIVATION*****
Initially built as a proof of concept to provide a way to easily grayscale a bitmap, the project then expanded into a way to provide several simple transforms that a user might want to apply to the bitmap.


*****INSTALLATION*****
The project is hosted on https://github.com/haverchuck/bitmapTransformer. If you would like to use the project, fork the repo and clone it into your own repository.

Then, to make sure you have gulp and prompt, run the following command in your projects root directory:
npm install



*****TESTS*****
For now, our testing is available as Dev Dependencies. If the project goes into production these options might be limited or removed.

For now, to run tests for all the modules, enter:
mocha

To run our linter, jshint,enter:
gulp jshint

*****LICENSE*****
License is MIT, and as such, completely open source. Please see LICENSE for detailed information.
