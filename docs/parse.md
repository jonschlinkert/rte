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