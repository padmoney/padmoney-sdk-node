import AbstractService from '../common/AbstractService';
import InvoiceBuilder  from './InvoiceBuilder';

import {
    Invoice,
    InvoiceByItem,
    InvoiceRequest, InvoiceRequestItem,
    InvoiceResponse,
    ListParams
} from './types';

function zeroAtStart(v: number): string {
    return 10 > v ? `0${v}` : v.toString()
}

function prepareDate(d: Date) {
    return `${d.getFullYear()}-${zeroAtStart(d.getMonth() + 1)}-${zeroAtStart(d.getDate())}`
}

export default class InvoiceService extends AbstractService {
    public builder() {
        return new InvoiceBuilder(this)
    }

    public async create(request: InvoiceRequest): Promise<InvoiceResponse> {
        this.prepareRequest(request)
        const { data } = await this.http.post('/invoices', request);
        return data;
    }

    public async list(params?: ListParams): Promise<Invoice[]> {
        params && this.prepareListItemsParams(params)
        const { data } = await this.http.get('/invoices', { params });
        return data;
    }

    public async listItems(params?: ListParams): Promise<InvoiceByItem> {
        params && this.prepareListItemsParams(params)
        const { data } = await this.http.get('/invoices/items', { params });
        return data;
    }

    public async getItem(id: string): Promise<Invoice> {
        const { data } = await this.http.get(`/invoices/items/${id}`);
        return data;
    }

    private prepareRequest(request: InvoiceRequest) {
        request.items.forEach(this.prepareRequestItem.bind(this))
    }

    private prepareRequestItem(item: InvoiceRequestItem) {
        if (item.dueDate instanceof Date) {
            item.dueDate = prepareDate(item.dueDate)
        }
    }

    private prepareListItemsParams(params: ListParams) {
        if (params.from && params.from instanceof Date) {
            params.from = prepareDate(params.from)
        }
        if (params.to && params.to instanceof Date) {
            params.to = prepareDate(params.to)
        }
    }
}
