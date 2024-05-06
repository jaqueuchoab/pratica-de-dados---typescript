import moedaParaNumber from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";

// Declarando tipos e interfaces globais, acesso em todo a aplicação
declare global {
  // Definição de tipos mais genéricos da API, como forma de pagamentos e status
  type TransacaoPagamento = 'Boleto' | 'Cartão de Crédito';
  type TransacaoStatus =
    | 'Paga'
    | 'Recusada pela operadora de cartão'
    | 'Aguardando pagamento'
    | 'Estornada';

  // Definindo a interface de data, chaves e tudo mais do jeito que está vindo, outra será criada com os dados normalizados
  interface TransacaoAPI {
    Nome: string;
    ID: number;
    Data: string;
    Status: TransacaoStatus;
    Email: string;
    // O nome da chave, por ser 'diferente' pode ser passado assim:
    ['Valor (R$)']: string;
    // Em forma de pagamento foi definido apenas dois tipos, pois a API, funciona assim, caso não, fica padrão
    ['Forma de Pagamento']: TransacaoPagamento;
    ['Cliente Novo']: number;
  }

  interface Transacao {
    nome: string;
    id: number;
    data: Date;
    status: TransacaoStatus;
    email: string;
    moeda: string;
    valor: number|null;
    pagamento: TransacaoPagamento;
    novo: boolean;
  }
}

// Retornara um objeto novo com as chaves e valores normalizados, a partir da transacaoAPI não normalizada
export default function normalizarTransacao(transacao:TransacaoAPI) : Transacao{
  return {
    nome: transacao.Nome,
    id: transacao.ID,
    data: stringToDate(transacao.Data),
    status: transacao.Status,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumber(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    novo: Boolean(transacao["Cliente Novo"]),
  }
}