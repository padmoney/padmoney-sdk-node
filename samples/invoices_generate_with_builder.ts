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
            .setPayer({ id: '478f14ba-3fa1-0d84-9172-d1cdf79af298' })
            .create()
        console.log(invoice)
    } catch ({ message }) {
        console.log(message)
    }
}

main()
