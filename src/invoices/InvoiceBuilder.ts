import { DiscountType, InvoiceRequest, InvoiceResponse, InvoicePayer } from './types';
import InvoiceService                                                  from './InvoiceService';

export default class InvoiceBuilder {
    private readonly service: InvoiceService;
    private readonly invoiceRequest: InvoiceRequest;

    constructor(service: InvoiceService, invoiceRequestPartial?: Partial<InvoiceRequest>) {
        this.service        = service;
        this.invoiceRequest = {
            payableWith:               ['bank_billet'],
            fineForDelay:              0,
            interestMonthlyPercentage: 0,
            virtualAccountID:          '',
            description:               '',
            discountType:              'none',
            items:                     [],
            payer:                     { id: '' },
            ...invoiceRequestPartial
        }
    }

    public setVirtualAccountID(virtualAccountID: string): InvoiceBuilder {
        Object.assign(this.invoiceRequest, {
            virtualAccountID
        });
        return this;
    }

    public setTaxes(fineForDelay: number, interestMonthlyPercentage: number): InvoiceBuilder {
        Object.assign(this.invoiceRequest, {
            fineForDelay,
            interestMonthlyPercentage
        })
        return this
    }

    public addItem(amount: number, dueDate: Date | string): InvoiceBuilder {
        this.invoiceRequest.items.push({ amount, dueDate });
        return this
    }

    public setPayer(payer: Pick<InvoicePayer, 'id'> | Partial<InvoicePayer>): InvoiceBuilder {
        Object.assign(this.invoiceRequest.payer, payer);
        return this
    }

    public setDiscount(type: DiscountType, value: number): InvoiceBuilder {
        Object.assign(this.invoiceRequest, {
            discountType:       type,
            discountPercentage: undefined,
            discountValue:      undefined
        });
        switch (type) {
            case 'fixed':
                this.invoiceRequest.discountValue = value;
                break;
            case 'percentage':
                this.invoiceRequest.discountPercentage = value;
                break;
        }
        return this
    }

    public get invoice(): InvoiceRequest {
        return this.invoiceRequest
    }

    public create(): Promise<InvoiceResponse> {
        return this.service.create(this.invoiceRequest)
    }
}
