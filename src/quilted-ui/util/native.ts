import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { formatNumberish } from "./common";
import { GetCommon, numberish } from "./typing";

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const StyleExcludes = ["shadowOffset"] as const;
const StyleIncludes = ["shadowOffsetWidth", "shadowOffsetHeight"] as const;

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

/**
 * A Style type with only the properties that are commmon in all react native style types
 */
export type CommonStyle = GetCommon<[ViewStyle, TextStyle, ImageStyle]>;

export type NativeStyles = {
  common: CommonStyle;
  view: ViewStyle;
  text: TextStyle;
  image: ImageStyle;
};

type Style = NativeStyles[keyof NativeStyles];

type StyleIncludesT = {
  [K in typeof StyleIncludes[number]]?: numberish;
};

type StyleProperties<S extends Style> = {
  [K in keyof S]?: K extends keyof S ? S[K] : never;
};
export type QUINativeStyleProperties<S extends Style = CommonStyle> = Omit<
  StyleProperties<S>,
  typeof StyleExcludes[number]
> &
  StyleIncludesT;

/* ------------------------------------ * ----------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/**
 * Convert a react native style object to a Quilted UI style object
 *
 * (i.e. converts `shadowOffset` to `shadowOffsetWidth` and `shadowOffsetHeight`)
 */
export const formatStyleTo = <S extends Style>(
  style: StyleProperties<S>
): QUINativeStyleProperties<S> => {
  const formattedStyle = style;

  // iterate through StyleExcludes, if we find a key in the style object, delete it
  // and convert it to the correct format from StyleIncludes if necessary
  StyleExcludes.forEach((k) => {
    if (formattedStyle[k]) {
      // if we find a shadowOffset, convert it to shadowOffsetWidth and shadowOffsetHeight
      if (k === "shadowOffset") {
        const { width, height } = formattedStyle[k] as {
          width: numberish | undefined;
          height: numberish | undefined;
        };

        formattedStyle["shadowOffsetWidth"] = width;
        formattedStyle["shadowOffsetHeight"] = height;
      }
      delete formattedStyle[k];
    }
  });

  return formattedStyle as QUINativeStyleProperties<S>;
};

/**
 * Converts a Quilted UI style object to a react native style object
 *
 * (i.e. converts `shadowOffsetWidth` and `shadowOffsetHeight` to `shadowOffset`)
 */
export const formatStyleFrom = <S extends Style>(
  style: QUINativeStyleProperties<S>
): StyleProperties<S> => {
  const formattedStyle = style;

  // iterate through StyleIncludes, if we find a key in the style object, delete it
  // and convert it to the correct format from StyleExcludes if necessary
  Object.keys(StyleIncludes).forEach((k) => {
    if (formattedStyle[k]) {
      // if we find a shadowOffsetWidth or shadowOffsetHeight, convert it to shadowOffset
      if (k === "shadowOffsetWidth" || k === "shadowOffsetHeight") {
        const v = formatNumberish(formattedStyle[k]);

        // if shadowOffset is not defined, create it
        let sO = formattedStyle["shadowOffset"];
        sO = sO
          ? sO
          : ({ width: 0, height: 0 } as {
              width: numberish;
              height: numberish;
            });

        if (k === "shadowOffsetWidth") {
          sO["width"] = v;
        } else if (k === "shadowOffsetHeight") {
          sO["height"] = v;
        }

        formattedStyle["shadowOffset"] = sO;
      }

      delete formattedStyle[k];
    }
  });

  return formattedStyle as StyleProperties<S>;
};

/* -------------------------------------------------------------------------- */
