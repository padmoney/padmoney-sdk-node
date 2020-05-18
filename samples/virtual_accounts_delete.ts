import Padmoney, { CredentialsToken } from '../src';

const TOKEN  = 'JDJhJDEwJHYyMGVYOXRLU2pZUTJBckJ6YWV4Q2V1eUpqMTBINi5Jd3NiRDR4QjhOSE04SC9tQlQ5b1RP'
const SECRET = '123'

async function main() {
    const credentials = new CredentialsToken(TOKEN, SECRET)
    const padmoney    = new Padmoney(credentials, 'dev')
    try {
        await padmoney.configure()
        await padmoney.virtualAccounts.delete('11b33691-15ad-bc4f-885f-0e86b417c3ca')
        console.log('Virtual account deleted')
    } catch ({ message }) {
        console.log(message)
    }
}

main()
