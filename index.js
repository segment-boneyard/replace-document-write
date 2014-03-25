var domify = require('domify');

/**
 * Replace document.write until a url is written matching the url fragment
 *
 * @param {String} match
 * @param {Element} elem to appendChild onto
 * @param {Function} fn optional callback function
 */

module.exports = function(match, elem, fn){
  var write = document.write;
  document.write = append;
  if (typeof elem === 'function') fn = elem, elem = null;
  if (!elem) elem = document.body;

  function append(str){
    var el = domify(str)
    var src = el.src || '';
    if (el.src.indexOf(match) === -1) return write(str);
    if ('SCRIPT' == el.tagName) el = recreate(el);
    elem.appendChild(el);
    document.write = write;
    fn && fn();
  }
};

/**
 * Re-create the given `script`.
 *
 * domify() actually adds the script to he dom
 * and then immediately removes it so the script
 * will never be loaded :/
 *
 * @param {Element} script
 * @api public
 */

function recreate(script){
  var ret = document.createElement('script');
  ret.src = script.src;
  ret.async = script.async;
  ret.defer = script.defer;
  return ret;
}