var _ = require('lodash');

var url = 'https://github.com/tkellen/node-hacker/blob/master/bin/hacker.js';

var re = ':protocol://domain/:username/:repo/:type/:branch/:dir';



var parsedURL = url.split('/');
var template = re.split(':');

console.log(parsedURL);

var len = parsedURL.length - template.length + 1;
console.log(len);

var end = _.last(parsedURL, len).join('/');
var firstPart = _.first(parsedURL, template.length - len + 1);
var newArr = _.union(firstPart, [end]);

console.log(_.zipObject(_.compact(template), _.compact(newArr)));