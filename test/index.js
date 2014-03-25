var assert = require('assert');
var replace = require('replace-document-write');
var load = require('load-script');
var domify = require('domify');

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

  it('should load a script given to document.write() into the specified parent', function(done){
    document.body.appendChild(domify('<div id="test-location"></div>'));
    var parent = document.getElementById('test-location');
    assert(parent.children.length === 0);
    
    replace('jquery', parent);
    document.write('<script src="fixtures/jquery.js"></script>');

    (function ok(){
      if (!window.jQuery) return setTimeout(ok);
      assert('jquery' == window.jQuery());

      parent = document.getElementById('test-location');
      assert(parent.children.length === 1);
      done();
    })();
  })
});
