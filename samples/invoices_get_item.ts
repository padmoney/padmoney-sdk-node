import Padmoney, { CredentialsToken } from '../src';

const TOKEN  = 'JDJhJDEwJHYyMGVYOXRLU2pZUTJBckJ6YWV4Q2V1eUpqMTBINi5Jd3NiRDR4QjhOSE04SC9tQlQ5b1RP'
const SECRET = '123'

async function main() {
    const credentials = new CredentialsToken(TOKEN, SECRET)
    const padmoney    = new Padmoney(credentials, 'dev')
    await padmoney.configure()
    try {
        const invoice = await padmoney.invoices.getItem('147b0574-2fa9-2e35-1b3b-81d58d490b65')
        console.log(invoice)
    } catch ({ message }) {
        console.log(message)
    }
}

main()
