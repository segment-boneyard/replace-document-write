
/**
 * Module dependencies.
 */

var debug = require('debug')('replace-document-write');
var domify = require('domify');

/**
 * Expose `replace`
 */

module.exports = replace;

/**
 * Replace document.write until a url is written matching the url fragment
 *
 * @param {String} match
 * @param {Function} fn optional callback function
 */

function replace(match, fn){
  var write = document.write;
  if ('write' != write.name) return wait(match, fn);
  document.write = append;

  debug('replace %s', match);

  function append(str){
    var el = domify(str)
    var src = el.src || '';
    if (el.src.indexOf(match) === -1) return write(str);
    if ('SCRIPT' == el.tagName) el = recreate(el);
    document.body.appendChild(el);
    document.write = write;
    debug('replaced %s', match);
    fn && fn();
  }
};

/**
 * Wait with the given `match` and `fn`.
 *
 * @param {String} match
 * @param {Function} fn
 * @api private
 */

function wait(match, fn){
  var tid = setTimeout(function(){
    clearTimeout(tid);
    replace(match, fn);
  });
}

/**
 * Re-create the given `script`.
 *
 * domify() actually adds the script to he dom
 * and then immediately removes it so the script
 * will never be loaded :/
 *
 * @param {Element} script
 * @api private
 */

function recreate(script){
  var ret = document.createElement('script');
  ret.src = script.src;
  ret.async = script.async;
  ret.defer = script.defer;
  return ret;
}