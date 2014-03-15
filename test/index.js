var assert = require('assert');
var replace = require('replace-document-write');
var load = require('load-script');

describe('document-write-replace', function(){
  var write = document.write;

  it('should match a url', function(done){
    replace('googleapis.com', function(){
      assert(document.write === write);
      done();
    });
    assert(document.write !== write);
    setTimeout(function (){
      document.write('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>');
    }, 300);
  });
});
