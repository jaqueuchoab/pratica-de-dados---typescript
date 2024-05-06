// Interface do retorno do reduce, um objeto com a chave pagamento e a qtde de ocorrência
export interface CountList {
  [key: string]: number;
}

export default function countBy(arr: (string | number)[]) {
  return arr.reduce((acu: CountList, item) => {
    if(acu[item]) {
      acu[item] += 1;
    } else {
      acu[item] = 1;
    }
    return acu;
  }, {});
}