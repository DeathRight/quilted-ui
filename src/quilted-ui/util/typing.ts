/* -------------------------------------------------------------------------- */
/*                                   General                                  */
/* -------------------------------------------------------------------------- */

export type Obj<T = string> = { [key: string]: T };

export type PropsWithChildren<P> = P & { children?: React.ReactNode };

/* -------------------------------------------------------------------------- */
/*                                   Prefix                                   */
/* -------------------------------------------------------------------------- */

export type PrefixedString<K, Prefix extends string> = K extends string
  ? `${Prefix}${K}`
  : never;

export type PrefixedObjectValues<T extends Obj, Prefix extends string> = {
  [K in keyof T]: PrefixedString<K, Prefix>;
};

export type PrefixedObjectKeys<T extends Obj, Prefix extends string> = {
  [K in keyof T as PrefixedString<K, Prefix>]: T[K];
};

/* -------------------------------------------------------------------------- */
/*                                     CSS                                    */
/* -------------------------------------------------------------------------- */
