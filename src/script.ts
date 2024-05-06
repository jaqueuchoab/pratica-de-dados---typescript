import Estatisticas from './Estatisticas.js';
import { CountList } from './countBy.js';
import fetchData from './fetchData.js';
import normalizarTransacao from './normalizarTransacao.js';

// Função assíncrona para esperar a response da fetchData
async function handleData() {
  // O retorno pode ser inferido pois agora temos a interface mapeada
  // O ? interrogação serve para buscar o dado mais atual na api
  const data = await fetchData<TransacaoAPI[]>('https://api.origamid.dev/json/transacoes.json?');

  // != Um erro de fetch não quebra o código, é indicado sempre verificar a existência de um dado
  if (!data) return;
  // A var transacoes recebe uma array que contém objetos normalizados, fato legal: o map entende que a função deve ser acionada para cada item de data
  const transacoes = data.map(normalizarTransacao); 
  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);
}

// Function que automatiza o preenchimento de estatistas pagamento e status
function preencherLista(lista: CountList, containerId: string) : void {
  const containerElement = document.getElementById(containerId);
  if(containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`
    })
  }
}

// Preenchimento de estatisticas 
function preencherEstatisticas(transacoes: Transacao[]) : void {
  const data = new Estatisticas(transacoes);
  // Uma vez que alguns elementos html não aceita de primeiro o innerText, é necessário predefir o tipo de retorno
  const totalElement = document.querySelector<HTMLElement>("#total span");
  if(totalElement) {
    totalElement.innerText = data.total.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
  }

  preencherLista(data.pagamento, 'pagamento');
  preencherLista(data.status, 'status');
  
  const diaElement = document.querySelector<HTMLElement>("#dia span");
  if(diaElement) {
    diaElement.innerText = data.melhorDia[0]; 
  }
}

// Preenchimento dos dados na tabela, retorna void porque é manipulação com o DOM
function preencherTabela(transacoes: Transacao[]) : void {
  const tabela = document.querySelector("#transacoes tbody");
  if(!tabela) return;
  transacoes.forEach((transacao) => {
    tabela.innerHTML += `
      <tr>
        <td>${transacao.nome}</td>
        <td>${transacao.email}</td>
        <td>R$ ${transacao.moeda}</td>
        <td>${transacao.pagamento}</td>
        <td>${transacao.status}</td>
      </tr>
    `;
  });
}

handleData();