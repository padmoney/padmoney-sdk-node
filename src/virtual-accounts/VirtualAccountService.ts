import AbstractService                                                from '../common/AbstractService';
import { VirtualAccount, VirtualAccountCreate, VirtualAccountUpdate } from './types';

export default class VirtualAccountService extends AbstractService {
    public async list(): Promise<VirtualAccount[]> {
        const { data } = await this.http.get('/virtual-accounts')
        return data || []
    }

    public async get(id: string): Promise<VirtualAccount> {
        const { data } = await this.http.get(`/virtual-accounts/${id}`)
        return data
    }

    public async create(virtualAccount: VirtualAccountCreate): Promise<VirtualAccount> {
        const { data } = await this.http.post('/virtual-accounts', virtualAccount)
        return data
    }

    public async update(virtualAccount: VirtualAccountUpdate): Promise<void> {
        const url = `/virtual-accounts/${virtualAccount.id}`
        await this.http.put(url, virtualAccount)
    }

    public async delete(id: string): Promise<void> {
        const url = `/virtual-accounts/${id}`
        await this.http.delete(url);
    }
}
