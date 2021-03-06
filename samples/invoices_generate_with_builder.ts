import Padmoney, { CredentialsToken } from '../src';

const TOKEN  = 'JDJhJDEwJHYyMGVYOXRLU2pZUTJBckJ6YWV4Q2V1eUpqMTBINi5Jd3NiRDR4QjhOSE04SC9tQlQ5b1RP'
const SECRET = '123'

async function main() {
    const credentials = new CredentialsToken(TOKEN, SECRET)
    const padmoney    = new Padmoney(credentials, 'dev')
    try {
        await padmoney.configure()
        const invoice = await padmoney
            .invoices
            .builder()
            .addItem(25.50, new Date(2020, 6, 20))
            .addItem(25.50, '2020-07-20')
            // .setTaxes(5, 5) // Fine for delay / Interest monthly percentage
            // .setVirtualAccountID('{{virtual_account_id}}')
            // .setDiscount('fixed', 10.00)
            // .setDiscount('percentage', 10.00)
            // .setPayer({ id: '478f14ba-3fa1-0d84-9172-d1cdf79af298' })
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
    } catch ({ message }) {
        console.log(message)
    }
}

