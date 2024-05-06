export default function moedaParaNumber(moeda) {
    const numero = Number(moeda.replaceAll(".", "").replace(",", "."));
    return isNaN(numero) ? null : numero;
}
//# sourceMappingURL=moedaParaNumero.js.map