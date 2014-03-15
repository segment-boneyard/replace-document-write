var assert = require('assert');
var replace = require('replace-document-write');
var load = require('load-script');

describe('document-write-replace', function(){
  var write = document.write;

  it('should match a url', function(){
    replace('googleapis.com', function(){
      assert(document.write === write);
    });
    document.write('<script>var x = 4;</script>');
    assert(document.write !== write);
    document.write('<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>');
    assert(document.write !== write);
    document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>');
    assert(document.write === write);
  });
});
