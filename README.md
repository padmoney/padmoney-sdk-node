# padmoney-sdk-node

[![Build Status](https://travis-ci.org/padmoney/padmoney-sdk-node.svg?branch=master)](https://travis-ci.org/padmoney/padmoney-sdk-node)
[![Version](https://img.shields.io/npm/v/@padmoney/sdk)](https://www.npmjs.com/package/@padmoney/sdk)
![NPM](https://img.shields.io/npm/l/@padmoney/sdk)
https://img.shields.io/npm/types/@padmoney/sdk


## Instalação

```
npm i @padmoney/sdk

```

## Como usar

O diretório /samples contém exemplos das mais diversas chamadas à API do Padmoney.


### Invoices

```
import Padmoney, { CredentialsToken } from '@padmoney/sdk';

const TOKEN  = 'JDJhJDEwJHYyMGVYOXRLU2pZUTJBckJ6YWV4Q2V1eUpqMTBINi5Jd3NiRDR4QjhOSE04SC9tQlQ5b1RP'
const SECRET = '123'

async function main() {
    const credentials = new CredentialsToken(TOKEN, SECRET)
    const padmoney    = new Padmoney(credentials)
    await padmoney.configure()
    const invoice = padmoney
        .invoices
        .builder()
        .addItem(25.50, new Date(2020, 6, 20))
        .addItem(25.50, '2020-07-20')
        .setPayer({
                name:      'John Dee',
                nickname:  'John Dee',
                cellPhone: '27999999999',
                document:  '64773865261',
                address:   {
                    country:      'BR',
                    state:        'ES',
                    city:         'Vitória',
                    neighborhood: 'Jardim da Penha',
                    address:      'Rua José Neves Cypreste',
                    number:       '400',
                    zipcode:      '29060300'
                }
            })
        .create()
    console.log(invoice)
}

main()
```


## Contribuições

- Faça um fork
- Adicione sua feature ou correção de bug (git checkout -b my-new-feature)
- Commit suas mudanças (git commit -am 'Added some feature')
- Rode um push para o branch (git push origin my-new-feature)
- Envie um Pull Request


## Licença

[MIT License](https://github.com/padmoney/padmoney-sdk-node/blob/master/LICENSE)
