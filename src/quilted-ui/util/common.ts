export const formatNumberish = (value: number | string | undefined | null) => {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return parseFloat(value);
  }

  return undefined;
};
