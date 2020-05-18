import Padmoney, { CredentialsToken } from '../src';

const TOKEN  = 'JDJhJDEwJHYyMGVYOXRLU2pZUTJBckJ6YWV4Q2V1eUpqMTBINi5Jd3NiRDR4QjhOSE04SC9tQlQ5b1RP'
const SECRET = '123'

async function main() {
    const credentials = new CredentialsToken(TOKEN, SECRET)
    const padmoney    = new Padmoney(credentials, 'dev')
    await padmoney.configure()
    try {
        const invoices = await padmoney.invoices.listItems({
            perPage: 10,
            page:    1
            // payerId: '{{payerId}}',
            // virtualAccountId: '{{virtualAccountId}}',
            // periodType: 'by-emission' | 'by-payment' | 'by-overdue',
            // from: '2020-05-15',
            // to: new Date(2020, 4, 20),
            // amountFrom: 000000,
            // amountTo: 99999,
            // status:  'generating' | 'opened' | 'overdue' | 'paid' | 'pending' | 'canceled' | 'rejected' | 'canceling'

        })
        /**
         * without filters works too
         * const invoices = await padmoney.invoices.listItems()
         */
        console.log(invoices)
    } catch ({ message }) {
        console.log(message)
    }
}

main()
