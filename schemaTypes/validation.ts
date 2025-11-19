export const validateIn = (values: (string | number)[], value: any) =>
  values.includes(value) ? true : `Value must be one of ${values.join(', ')}`;
