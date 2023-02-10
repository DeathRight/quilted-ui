import { QuiltedUiConfig } from "./config";
import { Obj, PrefixedObjectKeys } from "./typing";

type Token = string | number;

type TokenMap = { [key: string]: Token };

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/**
 * Returns an object with the same keys as the input object, but with the prefix added to each key.
 */
const getPrefixedTokens = <T extends Obj, Prefix extends string>(
  tokens: T,
  prefix: Prefix
): PrefixedObjectKeys<T, Prefix> => {
  const prefixedTokens = {} as Obj;
  for (const key in tokens) {
    prefixedTokens[`${prefix}${key}`] = tokens[key];
  }

  return prefixedTokens as PrefixedObjectKeys<T, Prefix>;
};

/**
 * Recursively replace all references to tokens with the associated token value.
 */
const replaceTokens = <V extends Obj<any> | Token>(
  config: QuiltedUiConfig,
  tokens: TokenMap,
  value: V
): V => {
  if (typeof value === "string") {
    // @ts-ignore | Warns of subtype mismatch, but it's fine.
    return value.replace(
      new RegExp(`\\${config.tokenPrefix}([a-zA-Z0-9]+)`, "g"),
      (match, token) => {
        return tokens[token].toString() || match;
      }
    );
  } else if (typeof value === "object") {
    const newValue = { ...value };
    for (const key in newValue) {
      newValue[key] = replaceTokens(config, tokens, newValue[key]);
    }
    return newValue as V;
  }

  return value;
};

export const test = replaceTokens(
  { tokenPrefix: "$" },
  { color: "red", size: 10 },
  { color: "$color $size" }
);
