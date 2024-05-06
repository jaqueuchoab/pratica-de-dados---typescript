export default async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error("Erro: " + response.status);
        const json = response.json();
        return json;
    }
    catch (erro) {
        if (erro instanceof Error)
            console.error("fetchData: " + erro.message);
        return null;
    }
}
//# sourceMappingURL=fetchData.js.map