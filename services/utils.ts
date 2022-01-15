const camelizeStr = (str: string): string => {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());
};

const snakifyStr = (str: string): string => {
  return str.replace(/(?:^|\.?)([A-Z])/g, (_, x) => `_${x.toLowerCase()}`);
};

type ConvertFunc = (k: string) => string;
function convertCase(convertFunc: ConvertFunc) {
  function converter(input: any): any {
    if (Array.isArray(input)) {
      return input.map(converter);
    }

    if (input !== null && typeof input === 'object') {
      const newObj: any = {};
      Object.keys(input).forEach((k: string) => {
        newObj[convertFunc(k)] = converter(input[k]);
      });
      return newObj;
    }

    return input;
  }

  return converter;
}

export default {
  camelizeKeys: convertCase(camelizeStr),
  snakifyKeys: convertCase(snakifyStr),
};
