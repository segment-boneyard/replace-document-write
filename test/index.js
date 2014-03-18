var assert = require('assert');
var replace = require('replace-document-write');
var load = require('load-script');

describe('document-write-replace', function(){
  var write = document.write;

  it('should match a url', function(done){
    replace('jquery', function(){
      assert(document.write === write);
      done();
    });
    assert(document.write !== write);
    setTimeout(function (){
      document.write('<script src="fixtures/jquery.js"></script>');
    }, 300);
  });

  it('should load a script given to document.write()', function(done){
    replace('jquery');
    document.write('<script src="fixtures/jquery.js"></script>');

    (function ok(){
      if (!window.jQuery) return setTimeout(ok);
      assert('jquery' == window.jQuery());
      done();
    })();
  })
});
