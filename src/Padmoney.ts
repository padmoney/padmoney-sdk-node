import Credentials           from './common/Credentials';
import HttpFactory    from './common/HttpFactory';
import InvoiceService from './invoices/InvoiceService';
import PayerService   from './payers/PayerService';
import VirtualAccountService from './virtual-accounts/VirtualAccountService';

export default class Padmoney {
    private readonly http: HttpFactory
    private invoiceService?: InvoiceService;
    private virtualAccountService?: VirtualAccountService;
    private payerService?: PayerService

    public constructor(credentials: Credentials, env: string = 'prod') {
        this.http = new HttpFactory(credentials, env);
    }

    public async configure() {
        await this.http.authenticate()
    }

    public get invoices(): InvoiceService {
        if (!this.invoiceService) {
            this.invoiceService = new InvoiceService(this.http)
        }
        return this.invoiceService
    }

    public get virtualAccounts(): VirtualAccountService {
        if (!this.virtualAccountService) {
            this.virtualAccountService = new VirtualAccountService(this.http)
        }
        return this.virtualAccountService as VirtualAccountService;
    }

    public get payers(): PayerService {
        if (!this.payerService) {
            this.payerService = new PayerService(this.http)
        }
        return this.payerService
    }
}
