// Usando generics para não permitir retorno de Promisse<any>
export default async function fetchData<T>(url: string):Promise<T|null> {
  try {
    const response = await fetch(url);
    //testar se a response está ok, se não estiver lançará um erro direto no catch
    if(!response.ok) throw new Error("Erro: " + response.status);
    
    const json = response.json();
    return json;
  } catch(erro) {
    // Definir mensagem de erro para o desenvolvedor
    if(erro instanceof Error) console.error("fetchData: " + erro.message);
    
    // Definir logo o retorno como null para ser possível a verificação se existe
    return null;
  }
}