import countBy from "./countBy.js";

// TransacaoValor é a nova interface com o atributo valor como number, apenas. Uma copia de Trasacao com uma modificacao em valor
type TransacaoValor = Transacao & { valor: number };

// Filtra os valores diferentes de null e traz um retorno do tipo TransacaoValor, uma interface atualizada de Transacao, em que o atributo valor agora retorna apenas number e não number ou null, usando type predicate
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes;
  public total;
  public pagamento;
  public status;
  public semana;
  public melhorDia;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento =  this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
  }
  private setTotal() {
    // O valor retornado em filtrados pode ser number ou null, porém a filtragem deveria retornar apenas numbers então esse erro precisa ser mudado, mas o ts não executa o js. Para isso, será usado o type predicate
    
    /* Relembrando o type predicate: possibilita indicar o retorno de uma função booleana sempre que o tipo de retorno for satisfeito (prevê o fututo). O operador is caracteriza o recurso.
    ex: functions isString(value:unknown):value is string return typeof value === "string";*/
    return this.transacoes.filter(filtrarValor).reduce((acu, item) => {
      return (acu += item.valor);
    }, 0);
  }

  private setPagamento() {
    // Array com as formas de pagamento
    const pagamentos = this.transacoes.map(({ pagamento }) => pagamento);

    // A var total vai retornar um obj com a chave, pagamento, e a sua qtde de ocorências em que acu é do tipo CountList, uma chave e um number, e item é a string que faz ref ao pagamento
    const total = countBy(pagamentos);  
    return total;
  }

  private setStatus() {
    // Mesma coisa de setPagamento mas um pouco mais otimizado
    return countBy(this.transacoes.map(({ status }) => status))
  }

  private setSemana() {
    const semana = {
      ["Domingo"]: 0,
      ["Segunda"]: 0,
      ["Terça"]: 0,
      ["Quarta"]: 0,
      ["Quinta"]: 0,
      ["Sexta"]: 0,
      ["Sábado"]: 0,
    }

    for(let i = 0; i < this.transacoes.length; i++) {
      // A var day é uma ref ao dia da semana, e não o dia em sí
      const day = this.transacoes[i].data.getDay();
      if(day === 0) semana["Domingo"] += 1;
      if(day === 1) semana["Segunda"] += 1;
      if(day === 2) semana["Terça"] += 1;
      if(day === 3) semana["Quarta"] += 1;
      if(day === 4) semana["Quinta"] += 1;
      if(day === 5) semana["Sexta"] += 1;
      if(day === 6) semana["Sábado"] += 1;
    }
    return semana;  
  }

  private setMelhorDia() {
    // sort organiza a array através da manipulação desejada
    return Object.entries(this.semana).sort((prox, atual) => {
      // Acessando a qtde de vendas em cada dia, e organizando em ordem decrescente, inciando pelo atual
      // A medida que o return seja positivo ou negativo posicoes vao sendo criadas
      return atual[1] - prox[1];
    })[0]; // Retorno de apenas a posicao 0, pois o maior esta nela 
  }
}
