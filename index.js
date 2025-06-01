import https from 'https';

export const handler = async (event) => {
    const cep = event.cep?.replace(/\D/g, '');

    if (!cep || cep.length !== 8) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'CEP inválido. Informe um CEP com 8 dígitos.' }),
        };
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

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
    }).catch(err => {
        return { error: err };
    });

    if (dados.error) {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: dados.error }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf,
        }),
    };
};