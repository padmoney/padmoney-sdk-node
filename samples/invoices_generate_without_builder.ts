import Padmoney, { CredentialsToken } from '../src';

const TOKEN  = 'JDJhJDEwJHYyMGVYOXRLU2pZUTJBckJ6YWV4Q2V1eUpqMTBINi5Jd3NiRDR4QjhOSE04SC9tQlQ5b1RP'
const SECRET = '123'

async function main() {
    const credentials = new CredentialsToken(TOKEN, SECRET)
    const padmoney    = new Padmoney(credentials, 'dev')
    try {
        await padmoney.configure()
        const invoice = await padmoney.invoices.create({
            // fineForDelay:              0,
            // interestMonthlyPercentage: 0,
            // virtualAccountID:          '',
            description:  'Foo Bar',
            discountType: 'none',

            // payer:        { id: '478f14ba-3fa1-0d84-9172-d1cdf79af298' },
            payer: {
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
            },
            items: [
                {
                    amount:  25.50,
                    dueDate: new Date(2020, 6, 20)
                },
                {
                    amount:  25.50,
                    dueDate: '2020-07-20'
                }
            ]
        })
        console.log(invoice)
    } catch ({ message }) {
        console.log(message)
    }
}

main()
