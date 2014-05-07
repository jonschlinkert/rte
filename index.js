var permalinks = require('permalinks');
var _ = require('lodash');

var utils = require('./lib/utils');



/**
 * Store
 *
 * Constructor for a simple prop-string data
 * model object.
 *
 * @param {String} type
 */

function Store(config) {
  this._config = _.extend(config || {});
  this._structure = {};
}


Store.prototype.context = function (obj) {
  this._context = _.extend(this._config, obj);
};


/**
 * .set (key, value)
 *
 * Set a prop-string to be stored by name.
 *
 * @param {String} name
 * @param {String} str
 */

Store.prototype.set = function (name, str) {
  this._structure[name] = str;
};


/**
 * .get (key)
 *
 * Get the structure that is stored in this model.
 *
 * @param {String} key
 */

Store.prototype.get = function (name) {
  return this._structure[name];
};


/**
 * .build (key, obj)
 *
 * Build a URL string from the properties on the
 * given object.
 *
 * @param {String} name
 * @param {Object} context
 */

Store.prototype.stringify = function (name, context) {
  return permalinks(this._structure[name], context || this._context);
};



/**
 * .parse (url, name)
 *
 * Build a URL string from the properties on the
 * given object.
 *
 * @param {String} url
 * @param {String} name  The structure to use
 */

Store.prototype.parse = function (url, name) {
  return utils.parseUrl(url, this._structure[name]);
};


var route = new Store();

// Store some routes (structures)
route.set('default', ':base([^:year])/:year/:month/:day/:basename/index.html');
route.set('date', 'blog/posts/:year/:month/:day/:basename/index.html');
route.set('dateUrl', 'blog/posts/:year/:month/:day/:basename/section/index.:ext');
route.set('pretty', ':basename/index.html');
route.set('numbered', ':num-basename.:ext');

// _.map(_.keys(pages), function (pageKey) {
//   params.set(pageKey, pages[pageKey].data);
// })

// route.get('pageDest', params.get(pageKey));

// console.log(route.get('pretty'));
// console.log(route.get('date'));

// console.log(route.stringify('pretty', {basename: 'jon'}));
// console.log(route.stringify('date', {year: '2014', month: '05', day: '04', basename: 'interesting'}));

// var result = route.parse('https://assemble.io/blog/posts/2014/05/04/inter.esting/foo/bar/baz/index.html?=foo', 'dateUrl');
var result = route.parse('https://assemble.io/blog/posts/2014/05/04/foo/bar/baz/index.html?=foo', 'dateUrl');
console.log(result);


// params.set('dateFoo', 'date', {destBase: 'foo'});
// params.set('dateBar', 'date', {destBase: 'bar'});


// route.set('dateUrl', 'blog/posts/:year/:month/:day/[foo/bar/baz]/:basename/[section/foo]/index.:ext');
// console.log(route.get('dateUrl'));

// console.log(route.stringify('dateUrl', {
//   year: '2014',
//   month: '05',
//   day: '04',
//   basename: 'interesting',
//   ext: 'html'
// }));


// var dateParams = function(cwd, destBase) {
//   return {
//     cwd: 'content/posts',
//     destBase: 'blog/posts'
//     params: {
//       props: {
//         year: /\d{4}/, // :year
//         month: /\d{2}/,
//         day: /\d{2}/
//       },
//       patterns: {
//         foo:     // :foo
//       }
//     }
//   }
// }


// parser.set('date', dateParams(''));

// var dateParser = parser.get('date');

// 'blog/posts/:year/:month/:day/["foo|bar"]/:basename/[section/foo]/index.:ext'



// * exact match
// * prop-string
// * anything in between



// var route1 = router.set('/news/{id}');

// route1.match('/foo/bar');      // false
// route1.match('/news/123');     // true
// route1.match('/news/foo-bar'); // true