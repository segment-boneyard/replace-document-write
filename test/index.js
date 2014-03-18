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

  it('should handle concurrent `replace(match, fn)`', function(done){
    assert(write == document.write);
    replace('a.js', end);
    replace('b.js', end);
    load('fixtures/analytics-a.js');
    load('fixtures/analytics-b.js');

    function end(){
      end.times = end.times || 0;
      if (2 == ++end.times) return done();
      assert(write == document.write);
    }
  })
});
