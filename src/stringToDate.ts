export default function stringToDate(texto: string) : Date {
  // Usar o Date para a transformação da string em date, porém a string não pode ser passada direto. Precisa desestruturar a string
  const [data, tempo] = texto.split(" ");
  // O Date recebe tudo como number e não string, para isso o map 
  const [dia, mes, ano] = data.split("/").map(Number);
  const [hora, minuto] = tempo.split(":").map(Number);
  // Visto que, o Date trabalha com o mes em seu index, ex: janeiro 0, fevereiro 1, é necessário - 1 em mes
  return new Date(ano, mes - 1, dia, hora, minuto);
}