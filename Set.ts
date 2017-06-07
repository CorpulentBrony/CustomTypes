function hasFunction(object: any, methodName: string | symbol): boolean { return object != undefined && object.hasOwnProperty(methodName) && isFunction(object[methodName]); }
function isFunction(object: any): object is Function { return typeof object === "function" || Object.prototype.toString.call(object) === "[object Function]"; }
function isIterable(object: any): object is Iterable<any> { return hasFunction(object, Symbol.iterator); }

class CustomSet<T> extends Set<T> {
	public static from<Type, NewType>(source: ArrayLike<Type> | Iterable<Type>, mapfn: (value: Type, index: number, set: Readonly<CustomSet<Type>>) => NewType, thisArg?: object): CustomSet<NewType>;
	public static from<Type>(source: ArrayLike<Type> | Iterable<Type>): CustomSet<Type>;
	public static from<Type, NewType = Type>(source: ArrayLike<Type> | Iterable<Type>, mapfn?: (value: Type, index: number, set: Readonly<CustomSet<Type>>) => NewType, thisArg?: object): CustomSet<NewType> | CustomSet<Type> {
		const result = new this<Type>(isIterable(source) ? source : Array.from<Type>(source));

		if (mapfn !== undefined)
			return result.map<NewType>(mapfn, thisArg);
		return result;
	}

	public static of<T>(...elements: Array<T>): CustomSet<T> { return new CustomSet<T>(elements); }

	public join(rowDelimiter: string = ","): string { return this.reduce<string>((result: string, value: T): string => value.toString() + rowDelimiter.toString(), "").slice(0, -rowDelimiter.toString().length); }

	public map<NewType = T>(callbackfn: (value: T, index: number, set: Readonly<this>) => NewType, thisArg?: object): CustomSet<NewType> {
		return this.reduce<CustomSet<NewType>>((result: CustomSet<NewType>, value: T, index: number): CustomSet<NewType> => result.add(callbackfn.call(thisArg, value, index, this)), new CustomSet<NewType>());
	}

	public reduce<U>(callbackfn: (result: U, value: T, index: number, set: Readonly<this>) => U, initialValue: U): U;
	public reduce(callbackfn: (result: T, value: T, index: number, set: Readonly<this>) => T): T;
	public reduce<U = T>(callbackfn: (result: U, value: T, index: number, set: Readonly<this>) => U, initialValue?: U): T | U {
		let i: number = 0;
		let iterator: Iterator<T> = this[Symbol.iterator]();
		let next: IteratorResult<T> = iterator.next();
		let result: T | U;

		if (initialValue === undefined) {
			if (next.done)
				throw new TypeError("Reduce of empty set with no initial value");
			[next, result] = [iterator.next(), next.value];
			i++;
		} else
			result = initialValue;

		while (!next.done)
			[next, result] = [iterator.next(), callbackfn.call(undefined, result, next.value, i++, this)];
		return result;
	}

	public toJSON(): Array<T> { return Array.from<T>(this); }
}

export { CustomSet as Set };