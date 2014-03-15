var domify = require('domify');

/**
 * Replace document.write until a url is written matching the url fragment
 *
 * @param {String} match
 * @param {Function} fn optional callback function
 */

module.exports = function(match, fn){
  var write = document.write.bind(document);
  document.write = append;

  function append(str){
    var el = domify(str)
    if (!el.src) return write(str);
    if (el.src.indexOf(match) === -1) return write(str);
    document.body.appendChild(el);
    document.write = write;
    fn && fn();
  }
}