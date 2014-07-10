# rte [![NPM version](https://badge.fury.io/js/rte.png)](http://badge.fury.io/js/rte)

> Simple, server-side routing to complement the node.js path module.

## Table of Contents



<!-- toc -->

* [Install](#install)
* [Tests](#tests)
* [Getting started](#getting-started)
* [API](#api)
  * [Route](#route)
  * [.set (name, route)](#set-name-route)
  * [.get (name)](#get-name)
  * [.rename (filepath, options)](#rename-filepath-options)
  * [.parse (filepath, name, context)](#parse-filepath-name-context)
  * [.dest (filepath, name, context)](#dest-filepath-name-context)
  * [.process (name, context)](#process-name-context)
  * [.resolve](#resolve)
  * [._convertRe](#convertre)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

<!-- toc stop -->


## Install
Install with [npm](npmjs.org):

```bash
npm i rte --save-dev
```

## Tests

Run `mocha` or `npm test` to run the tests. [Visit the tests](test) to learn how this works.

## Getting started

Create a new instance:

```js
// optionally pass a default `context`
var rte = new Route({root: '_gh_pages', ext: '.html'});
```

Next, define some routes to use:

```js
rte.set('site', ':root/:basename/index:ext');
rte.set('blog', ':root/blog/:basename/index:ext');
```

Last, generate your destination paths:

```js
// use the `site` route to create the dest filepath
var dest = rte.dest('src/templates/about.hbs', 'site');
// => '_gh_pages/about/index.html'

// use the `blog` route to create the dest filepath
var dest = rte.dest('src/templates/about.hbs', 'site');
// => '_gh_pages/blog/about/index.html'
```

Override the default context:

```js
var dest = rte.dest('src/templates/about.hbs', 'site', {root: 'dist'});
// => 'dist/blog/about/index.html'
```

## API
### Route

Define a new instance of Route, optionally passing a default context object.

**Example**

```js
var route = new Route({base: 'dist'});
```

* `type` {String}   


### .set (name, route)

Set or get a route by name.

```js
route.set('dest', ':base/:dirname/:basename/index.html');
```

* `name` {String} 
* `route` {String}   


### .get (name)

Get a route by name.

```js
route.get('dest');
// ':base/:dirname/:basename/index.html'
```

* `name` {String}   


### .rename (filepath, options)

Rename parts of a file path using [rename-path](https://github.com/jonschlinkert/rename-path).

```js
route.rename ('a/b/c.hbs', {ext: '.html'});
//=> 'a/b/c.html'
```

* `filepath` {String} 
* `options` {Object}   


### .parse (filepath, name, context)

Parse the filepath into an object using the named route and the methods
on the node.js path module. The purpose of this method is to simplify
the process of renaming parts of file paths.

**Example:**

Given this route:

```js
rte.set('foo', ':a/:b/:basename/index:ext');
```

We can parse a filepath and create an object that consists of properties that are created using the `foo` route, e.g.

```js
var obj = rte.parse('src/templates/about.hbs', 'foo', {
  a: 'one',
  b: 'two',
  ext: '.html'
});
console.log(obj);
```

which results in:

```js
{
  dirname: 'src/templates',
  basename: 'about',
  name: 'about',
  extname: '.hbs',
  extSegments: ['.hbs'],
  ext: '.html',
  a: 'one',
  b: 'two',
  dest: 'one/two/about/index.html' // based on the `foo` propstring
}
```

* `filepath` {String} 
* `name` {String}: The name of the route to use 
* `context` {Object}: Optionally pass a context with custom properties.   


### .dest (filepath, name, context)

Facade for `.parse()`, returning only the `dest` value.

**Example:**

```js
rte.set('blog', ':foo/:basename/index:ext');

// use the `blog` route to create a dest filepath
var dest = rte.dest('src/templates/about.hbs', 'blog');
// => '_gh_pages/about/index.html'
```

* `filepath` {String} 
* `name` {String}: The name of the route to use 
* `context` {Object}: Optionally pass a context with custom properties.   


### .process (name, context)

Resolve a named route using the properties on the given object.

```js
route.process (name, context)
```
**Example:**

```js
route.process(':a/:b/:c', {a: 'one', b: 'two', c: 'three'});
//=> 'one/two/three'
```

* `key` {String} 
* `context` {Object}   


### .resolve

Resolve a named route using the properties on the given object.

```js
route.resolve (name, context)
```

**Example:**

```js
route.set('dist', ':foo/:basename/index.html');
route.resolve('dist', {foo: '_gh_pages', basename: 'foo'});
//=> '_gh_pages/foo/index.html'
```

* `key` {String} 
* `context` {Object}   


### ._convertRe

Convert propstring delimiters into valid Lo-Dash template
delimiters.

* `str` {String}  
* `return` {String} 


Expose `Route`

## Contributing
Find a bug? Have a feature request? Please [create an Issue](https://github.com/jonschlinkert/rte/issues).

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality,
and run `docs` in the command line to build the docs with [Verb](https://github.com/assemble/verb).

Pull requests are also encouraged, and if you find this project useful please consider "starring" it to show your support! Thanks!

## Authors

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on July 10, 2014._