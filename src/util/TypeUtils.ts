/**
 * This returns true if the given key is a property of object otherwise it
 * returns false.
 * @param key a possible key in the object
 * @param object the object to compare to
 */
export function isPropertyOf<T>(key: any, object: T): key is keyof T {
  return key in object;
}

/**
 * Returns a new object with an updated key value.
 * @param key a pssoible key in the object
 * @param value the value to update for the associated key
 * @param obj the object to update
 */
export function updateValue<Cls, T extends keyof Cls, K extends Cls[T]>(
  key: keyof Cls,
  value: K,
  obj: Cls
): Cls {
  return { ...obj, ...{ [key]: value } };
}
