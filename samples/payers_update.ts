import Padmoney, { CredentialsToken } from '../src';

const TOKEN  = 'JDJhJDEwJHYyMGVYOXRLU2pZUTJBckJ6YWV4Q2V1eUpqMTBINi5Jd3NiRDR4QjhOSE04SC9tQlQ5b1RP'
const SECRET = '123'

async function main() {
    const credentials = new CredentialsToken(TOKEN, SECRET)
    const padmoney    = new Padmoney(credentials, 'dev')
    try {
        await padmoney.configure()
        const payer = await padmoney.payers.update({
            id: 'cbcd624b-9134-7a7d-0f4a-27acfd865629',
            name:      'John Dee Updated',
            nickname:  'John Dee Updated',
            cellPhone: '27999999999',
            document:  '27501555176',
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
        console.log(payer)
    } catch ({ message }) {
        console.log(message)
    }
}

main()
