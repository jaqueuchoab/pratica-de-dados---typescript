/**
 * Recebe string '1.200,50' retorna valor 1200.50 
 */
export default function moedaParaNumber(moeda: string) : number | null {
  const numero = Number(moeda.replaceAll(".","").replace(",","."));
  return isNaN(numero) ? null : numero;
}