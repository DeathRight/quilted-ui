/* -------------------------------------------------------------------------- */
/*                                   General                                  */
/* -------------------------------------------------------------------------- */

export type Obj<T = string> = { [key: string]: T };

export type PropsWithChildren<P> = P & { children?: React.ReactNode };

export type numberish = number | string;

export type valueof<T> = T[keyof T];

/* -------------------------------------------------------------------------- */
/*                                 Comparison                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates a new type with only all properties in common between all types in T
 *
 * NOTE: The value of each property is the value of the first type in T
 *
 * @example
 * type A = { a: string; b: number; c: boolean; };
 * type B = { a: string; b: string; };
 * type C = { a: string; b: number; c: boolean; d: string; };
 *
 * const test: GetCommon<[A, B, C]> = {
 *  a: "a",
 *  b: 1,
 *  c: true, // Error! Type is not assignable to type 'Merge<[A, B, C]>'
 * }
 */
export type GetCommon<T extends {}[]> = {
  [K in keyof T[number]]: K extends keyof T[number] ? T[number][K] : never;
};

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

type FunctionWithParameterInferredWithObjectReturn<F> = F extends (
  arg: any
) => { [key: string]: infer RT }
  ? (arg: RT) => { [k: string]: RT }
  : never;
type InferredFunction = <F extends (arg: any) => { [k: string]: any }>(
  f: F
) => FunctionWithParameterInferredWithObjectReturn<F>;

//const test: InferredFunction = (f) => f;

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
