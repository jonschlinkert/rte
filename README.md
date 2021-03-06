# rte [![NPM version](https://badge.fury.io/js/rte.svg)](http://badge.fury.io/js/rte)

> Simple filepath re-writing for node.js projects. Useful for re-writing paths in grunt/gulp/assemble tasks or plugins.

**v2.0 released! Breaking changes!**

* `.process()` is now `.stringify()`

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i rte --save
```

## Usage

```js
var rte = require('rte');
```

## API

### [rte](index.js#L47)

Generate a file path from properties on the given object.

**Examples:**

When a `source` file path is passed as the first argument, it will
be parsed and the resulting object will merged with the data
object (properties on the data object take precendence).

**Params**

* `src` **{String}**: Optionally pass a source file path to parse.
* `dest` **{String}**: Template for the destination file path with `:properties` to replace.
* `data` **{Object}**: Object with values to pass to the dest.

**Examples**

```js
rte(':a/:b:.c', { a: 'aaa', b: 'bbb', c: 'js' });
//=> 'aaa/bbb/c.js'
```

```js
rte('a/b/c.html', ':destbase/:basename', { destbase: 'foo' });
//=> 'foo/c.html'
```

## Related projects

* [gulp-routes](https://github.com/assemble/gulp-routes): Add middleware to run for specified routes in your gulp pipeline.
* [gulp-rte](https://github.com/jonschlinkert/gulp-rte): Better dest handling for Gulp.
* [gulp-dest](https://github.com/jonschlinkert/gulp-dest): Gulp plugin for easily defining destination paths using path variables.
* [gulp-extname](https://github.com/jonschlinkert/gulp-extname): gulp plugin to dynamically rewrite dest extensions based on src extensions.

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/rte/issues/new)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2014-2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on May 31, 2015._
