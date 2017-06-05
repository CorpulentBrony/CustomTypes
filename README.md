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

Similar to the [`Array.prototype.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) method, joins all the items of a `Map` into a string.  If no argument is passed, then the default is `{ isKeyBeforeValue: true, keyValueDelimiter: ":", rowDelimiter: ",", showKey: true, showValue: true }`.

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
			<dd>The delimiter between key/value pairs</dd>
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

<dl>
	<dt><code>callbackfn</code></dt>
	<dd>
		Function that produces a value of the new <code>Map</code>, taking three arguments:
		<dl>
			<dt><code>value</code></dt>
			<dd>The current value being processed in the <code>Map</code></dd>
			<dt><code>key</code></dt>
			<dd>The key of the current value being processed in the <code>Map</code></dd>
			<dt><code>map</code></dt>
			<dd>The <code>Map</code> that <code>map()</code> was called upon</dd>
		</dl>
	</dd>
	<dt><code>thisArg</code></dt>
	<dd>Optional value to use as <code>this</code> when executing <code>callbackfn</code></dd>
</dl>

#### `Map.prototype.reduce()`

```typescript
reduce<T>(callbackfn: (result: T, value: V, key: K, map: Readonly<this>) => T, initialValue: T): T;
reduce(callbackfn: (result: V, value: V, key: K, map: Readonly<this>) => V): V;
```

Similar to the [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) method, applies a function against an accumulator and each value in the `Map` (from left to right) to reduce it to a single value.

<dl>
	<dt><code>callbackfn</code></dt>
	<dd>
		Function to execute on each value in the <code>Map</code>, taking four arguments:
		<dl>
			<dt><code>result</code></dt>
			<dd>The result accumulates the <code>callbackfn</code>'s return values; it is the accumulated value previously returned in the last invocation of the <code>callbackfn</code>, or <code>initialValue</code>, if supplied</dd>
			<dt><code>value</code></dt>
			<dd>The current value being processed in the <code>Map</code></dd>
			<dt><code>key</code></dt>
			<dd>The key of the current value being processed in the <code>Map</code>.  Starts at the first key if an <code>initialValue</code> is provided and at the second key otherwise</dd>
			<dt><code>map</code></dt>
			<dd>The <code>Map</code> that <code>reduce()</code> was called upon
		</dl>
	</dd>
	<dt><code>initialValue</code></dt>
	<dd>Value to use as the first argument to the first call of the <code>callbackfn</code>.  If no initial value is supplied, the first value in the <code>Map</code> will be used.  Calling <code>reduce()</code> on an empty <code>Map</code> without an <code>initialValue</code> is an error
</dl>

#### `Map.prototype.toJSON()`

```typescript
toJSON(): { [key: string]: V };
```

Provides an implementation of the `toJSON()` function which is leveraged by [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).  Creates a new object (not a `Map`) with key/value pairs matching those of the `Map`.  Will call the key's `toString()` method.  Additionally will call the value's `toJSON()` method, if it implements it, before adding it to the final object.  This allows for JSON serialization of `Map` objects.

### `Set<T>`

Constructor is unaltered, [q.v.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

#### `Set.of()`

```typescript
static of<T>(...elements: Array<T>): Set<T>;
```

Similar to the [`Array.of()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of) static method, creates a new `Set` instance with a variable number of arguments, regardless of number or types of the arguments.

<dl>
	<dt><code>elements</code></dt>
	<dd>Elements of which to create the <code>Set</code></dd>
</dl>

#### `Set.prototype.reduce()`

```typescript
reduce<U>(callbackfn: (result: U, value: T, index: number, set: Readonly<this>) => U, initialValue: U): U;
reduce(callbackfn: (result: T, value: T, index: number, set: Readonly<this>) => T): T;
```

Similar to the [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) method, applies a function against an accumulator and each value in the `Set` (from left to right) to reduce it to a single value.

<dl>
	<dt><code>callbackfn</code></dt>
	<dd>
		Function to execute on each value in the <code>Set</code>, taking four arguments:
		<dl>
			<dt><code>result</code></dt>
			<dd>The result accumulates the <code>callbackfn</code>'s return values; it is the accumulated value previously returned in the last invocation of the <code>callbackfn</code>, or <code>initialValue</code>, if supplied</dd>
			<dt><code>value</code></dt>
			<dd>The current value being processed in the <code>Set</code></dd>
			<dt><code>index</code></dt>
			<dd>The index of the current value being processed in the <code>Set</code>.  Starts at index 0 if an <code>initialValue</code> is provided and at index 1 otherwise.  Please note that <code>Set</code>s are not technically indexed and this argument is provided primarily for compatibility with the existing <code>reduce()</code> implementations</dd>
			<dt><code>set</code></dt>
			<dd>The <code>Set</code> that <code>reduce()</code> was called upon
		</dl>
	</dd>
	<dt><code>initialValue</code></dt>
	<dd>Value to use as the first argument to the first call of the <code>callbackfn</code>.  If no initial value is supplied, the first value in the <code>Set</code> will be used.  Calling <code>reduce()</code> on an empty <code>Set</code> without an <code>initialValue</code> is an error
</dl>

#### `Set.prototype.toJSON()`

```typescript
toJSON(): Array<T>;
```

Provides an implementation of the `toJSON()` function which is leveraged by [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).  Creates an array consisting of the values in the `Set`.  This allows for JSON serialization of `Set` objects.

### `Stack<T>`, `Queue<T>`, and `Node<T>`

Both `Stack` and `Queue` consists of `Node`s.  These were written partially as a proof of concept and partly to solve a problem for which I used something else in the end.  So these are not currently being used by me anywhere, so I don't really feel the need to document them or spend much time on them except to say caveat emptor.

[![Creative Commons License BY-NC-SA 4.0][Creative Commons License Logo]](https://creativecommons.org/licenses/by-nc-sa/4.0/)

[CustomTypes](https://github.com/CorpulentBrony/CustomTypes) by [Corpulent Brony](https://github.com/CorpulentBrony) is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

[Creative Commons License Logo]: https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png "Creative Commons License BY-NC-SA 4.0"