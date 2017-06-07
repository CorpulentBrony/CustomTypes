type JoinOptions = { isKeyBeforeValue?: boolean, keyValueDelimiter?: string, rowDelimiter?: string, showKey?: boolean, showValue?: boolean };
type JSONable = { toJSON: () => any };
type MapObject<K, V> = { [key: string]: V };

function hasFunction(object: any, methodName: string | symbol): boolean { return object != undefined && object.hasOwnProperty(methodName) && isFunction(object[methodName]); }
function isFunction(object: any): object is Function { return typeof object === "function" || Object.prototype.toString.call(object) === "[object Function]"; }
function isIterable(object: any): object is Iterable<any> { return hasFunction(object, Symbol.iterator); }
function isJSONable(object: any): object is JSONable { return hasFunction(object, "toJSON"); }

class CustomMap<K, V> extends Map<K, V> {
	public static from<Key, OriginalValue, NewValue>(source: ArrayLike<[Key, OriginalValue]> | Iterable<[Key, OriginalValue]>, mapfn: (value: OriginalValue, key: Key, map: Readonly<CustomMap<Key, OriginalValue>>) => NewValue, thisArg?: object): CustomMap<Key, NewValue>;
	public static from<Key, Value>(source: ArrayLike<[Key, Value]> | Iterable<[Key, Value]>): CustomMap<Key, Value>;
	public static from<Key, Value, NewValue = Value>(source: ArrayLike<[Key, Value]> | Iterable<[Key, Value]>, mapfn?: (value: Value, key: Key, map: Readonly<CustomMap<Key, Value>>) => NewValue, thisArg?: object): CustomMap<Key, NewValue> | CustomMap<Key, Value> {
		const result = new this<Key, Value>(isIterable(source) ? source : Array.from<[Key, Value]>(source));

		if (mapfn !== undefined)
			return result.map<NewValue>(mapfn, thisArg);
		return result;
	}

	public dedupe(dupeFunction: (a: V, b: V) => boolean = (a: V, b: V): boolean => a === b, sortFunction?: (a: V, b: V) => number): CustomMap<K, V> {
		if (this.size < 2)
			return this;
		const dupeKeys: Set<K> = new Set<K>();
		const sorted: CustomMap<K, V> = this.sort(sortFunction);
		let firstLoop: boolean = true;
		let priorValue: V;

		for (const [key, value] of sorted) {
			if (!firstLoop && dupeFunction(priorValue!, value))
				dupeKeys.add(key);
			[firstLoop, priorValue] = [false, value];
		}
		dupeKeys.forEach((value: K): void => { sorted.delete(value); });
		return sorted;
	}

	public join(options: JoinOptions): string;
	public join(rowDelimiter: string): string;
	public join(optionsOrRowDelimiter: string | JoinOptions = { isKeyBeforeValue: true, keyValueDelimiter: ":", rowDelimiter: ",", showKey: true, showValue: true }): string {
		const options: JoinOptions = (typeof optionsOrRowDelimiter === "string") ? { rowDelimiter: optionsOrRowDelimiter } : optionsOrRowDelimiter;

		if (!options.showKey && !options.showValue)
			return "";
		return this.reduce<string>((result: string, value: V, key: K): string => {
			if (options.showKey && options.showValue)
				return result + (options.isKeyBeforeValue ? key.toString() + options.keyValueDelimiter + value.toString() : value.toString() + options.keyValueDelimiter + key.toString()) + options.rowDelimiter;
			return result + (options.showKey ? key.toString() : value.toString()) + options.rowDelimiter;
		}, "").slice(0, (options.rowDelimiter === undefined) ? undefined : -options.rowDelimiter.length);
	}

	public map<T = V>(callbackfn: (value: V, key: K, map: Readonly<this>) => T, thisArg?: object): CustomMap<K, T> {
		return this.reduce<CustomMap<K, T>>((result: CustomMap<K, T>, value: V, key: K): CustomMap<K, T> => result.set(key, callbackfn.call(thisArg, value, key, this)), new CustomMap<K, T>());
	}

	public reduce<T>(callbackfn: (result: T, value: V, key: K, map: Readonly<this>) => T, initialValue: T): T;
	public reduce(callbackfn: (result: V, value: V, key: K, map: Readonly<this>) => V): V;
	public reduce<T = V>(callbackfn: (result: T, value: V, key: K, map: Readonly<this>) => T, initialValue?: T): V | T {
		let iterator: Iterator<[K, V]> = this[Symbol.iterator]();
		let next: IteratorResult<[K, V]> = iterator.next();
		let current: [K, V] = next.value;
		let result: V | T;

		if (initialValue === undefined) {
			if (next.done)
				throw new TypeError("Reduce of empty map with no initial value");
			[next, result] = [iterator.next(), current[1]];
			current = next.value;
		} else
			result = initialValue;

		while (!next.done) {
			[next, result] = [iterator.next(), callbackfn.call(undefined, result, current[1], current[0], this)];
			current = next.value;
		}
		return result;
	}

	// need to build a default compareFunction
	public sort(compareFunction: (a: V, b: V) => number = (a: V, b: V): number => 0): CustomMap<K, V> {
		if (this.size < 2)
			return this;
		return new CustomMap<K, V>(Array.from<[K, V]>(this).sort((a: [K, V], b: [K, V]): number => compareFunction(a[1], b[1])));
	}

	public toJSON(): MapObject<K, V> {
		return Array.from<[K, V]>(this).reduce<MapObject<K, V>>((object: MapObject<K, V>, [key, value]: [K, V]): MapObject<K, V> => {
			object[key.toString()] = isJSONable(value) ? value.toJSON() : value;
			return object;
		}, Object.create(null));
	}
}

export { CustomMap as Map };