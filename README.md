# CustomTypes
Some [TypeScript](https://www.typescriptlang.org/) to expand the basic types of [EcmaScript 2015](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf) with added features.  Also includes a `Queue` and `Stack`, though these haven't been thoroughly tested yet.

## Features

### `Map<K, V>`

Constructor is unaltered, [q.v.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

#### `Map.prototype.join()`

```typescript
join(rowDelimiter?: string): string;
join(options?: { isKeyBeforeValue?: boolean, keyValueDelimiter?: string, rowDelimiter?: string, showKey?: boolean, showValue?: boolean }): string;
```

Similar to the [`Array.prototype.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) method, combines all the items in a `Map` to a string.  If no argument is passed, then the default is `{ isKeyBeforeValue: true, keyValueDelimiter: ":", rowDelimiter: ",", showKey: true, showValue: true }`.
* `rowDelimiter`: If a string is passed, then all values of the map will be combined and separated by the given delimiter
* `options`: Passing an object allows more control over output
  * `isKeyBeforeValue`: If true then the key will appear before the value.  This is ignored if either `showKey` or `showValue` is false
  * `keyValueDelimiter`: The delimiter that comes between the key and the value.  This is ignored if either `showKey` or `showValue` is false
  * `rowDelimiter`: The delimiter between sets of keys/values
  * `showKey`: Whether or not to show keys.  If this and `showValue` are false then an empty string will be returned
  * `showValue`: Whether or not to show values.  If this and `showKey` are false then an empty string will be returned

<dl>
	<dt><code>rowDelimiter</code></dt>
	<dd>If a string is passed, then all values of the map will be combined and separated by the given delimiter</dd>
	<dt><code>options</code></dt>
	<dd>
		<dl>
			<dt><code>isKeyBeforeValue</code></dt>
			<dd>If true then the key will appear before the value.  This is ignored if either <code>showKey</code> or <code>showValue</code> is false</dd>
			<dt><code>keyValueDelimiter</code></dt>
			<dd>The delimiter that comes between the key and the value.  This is ignored if either <code>showKey</code> or <code>showValue</code> is false</dd>
			<dt><code>rowDelimiter</code></dt>
			<dd>The delimiter between sets of keys/values</dd>
			<dt><code>showKey</code></dt>
			<dd>Whether or not to show keys.  If this and <code>showValue</code> are false then an empty string will be returned</dd>
			<dt><code>showValue</code></dt>
			<dd>Whether or not to show values.  If this and <code>showKey</code> are false then an empty string will be returned</dd>
		</dl>
	</dd>
</dl>

#### `Map.prototype.map()`

```typescript
map<T = V>(callbackfn: (value: V, key: K, map: Readonly<this>) => T, thisArg?: object): Map<K, T>;
```

Similar to the [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method, creates a new `Map` with the results of calling a provided function on every value in this `Map`.  This is implemented as a special case of the [`Map.prototype.reduce()`](#mapprototypereduce) method.
* `callbackfn`: Function that produces a value of the new `Map`, taking three arguments:
  * `value`: 


[![Creative Commons License BY-NC-SA 4.0][Creative Commons License Logo]](https://creativecommons.org/licenses/by-nc-sa/4.0/)

[CustomTypes](https://github.com/CorpulentBrony/CustomTypes) by [Corpulent Brony](https://github.com/CorpulentBrony) is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

[Creative Commons License Logo]: https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png "Creative Commons License BY-NC-SA 4.0"