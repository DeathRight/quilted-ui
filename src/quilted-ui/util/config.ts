import { FlexStyle } from "react-native";
import { NativeStyles, QUINativeStyleProperties } from "./native";
import { numberish, valueof } from "./typing";

/* -------------------------------------------------------------------------- */
/*                                 Custom Util                                */
/* -------------------------------------------------------------------------- */

type NSKeys = keyof NativeStyles;
type StyleProps<S extends NSKeys> = QUINativeStyleProperties<NativeStyles[S]>;
type QUIUtilProperty<S extends NSKeys> = <T>(value: numberish) => {
  [K in keyof StyleProps<S>]: K extends keyof StyleProps<S>
    ? StyleProps<S>[K]
    : never;
};

type QUIUtilStyleProperties<S extends NSKeys> = {
  [K: string]: QUIUtilProperty<S>;
};

type QUIUtils = {
  common?: QUIUtilStyleProperties<"common">;
  view?: QUIUtilStyleProperties<"view">;
  text?: QUIUtilStyleProperties<"text">;
  image?: QUIUtilStyleProperties<"image">;
};

export interface QUIConfig {
  tokenPrefix?: string;
  utils?: QUIUtils;
}

export const defaultConfig: QUIConfig = {
  tokenPrefix: "$",
  utils: {
    view: {
      m: (value) => ({ margin: value }),
      mt: (value) => ({
        marginTop: value,
      }),
      mr: (value: numberish) => ({
        marginRight: value,
      }),
      mb: (value: numberish) => ({
        marginBottom: value,
      }),
      ml: (value: numberish) => ({
        marginLeft: value,
      }),
      mx: (value: numberish) => ({
        marginHorizontal: value,
      }),
      my: (value: numberish) => ({
        marginVertical: value,
      }),

      p: (value: numberish) => ({
        padding: value,
      }),
      pt: (value: numberish) => ({
        paddingTop: value,
      }),
      pr: (value: numberish) => ({
        paddingRight: value,
      }),
      pb: (value: numberish) => ({
        paddingBottom: value,
      }),
      pl: (value: numberish) => ({
        paddingLeft: value,
      }),
      px: (value: numberish) => ({
        paddingHorizontal: value,
      }),
      py: (value: numberish) => ({
        paddingVertical: value,
      }),

      w: (value: numberish) => ({
        width: value,
      }),
      h: (value: numberish) => ({
        height: value,
      }),
      size: (value) => ({
        width: value,
        height: value,
      }),
    },
  },
};
