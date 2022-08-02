export type AnyFunc = (...args: any[]) => any;
export type VoidFunc = () => void;
export type Nullable<T> = T extends null | undefined ? T : never;
export type NonNullable<T> = T extends null | undefined ? never : T;

export const isBrowser = isDefined(window);
export function isDefined<T>(value: T): value is NonNullable<T> {
  return value != null;
}
export function isUndefined<T>(value: T): value is Nullable<T> {
  return value == null;
}
