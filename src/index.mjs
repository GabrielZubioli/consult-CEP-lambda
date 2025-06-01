import https from 'https';

export const handler = async (event) => {
    const queryString = event.queryStringParameters;
    const cep = queryString?.cep?.replace(/\D/g, '');

    if (!cep || cep.length !== 8) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: 'CEP inválido. Informe um CEP com 8 dígitos.' }),
        };
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const dados = await new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';

                res.on('data', chunk => {
                    data += chunk;
                });

                res.on('end', () => {
                    const json = JSON.parse(data);
                    if (json.erro) {
                        reject('CEP não encontrado.');
                    } else {
                        resolve(json);
                    }
                });
            }).on('error', (e) => {
                reject(e);
            });
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                logradouro: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf,
            }),
        };
    } catch (error) {
        return {
            statusCode: 404,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: error.toString() }),
        };
    }
};
