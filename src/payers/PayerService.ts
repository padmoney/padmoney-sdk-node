import AbstractService     from '../common/AbstractService';
import { BasicListParams } from '../common/types'
import { Payer }           from './types'

export default class PayerService extends AbstractService {
    public async create(payer: Payer): Promise<Payer> {
        const { data } = await this.http.post('/payers', payer)
        return data
    }

    public async update(payer: Payer): Promise<Payer> {
        const { data } = await this.http.put(`/payers/${payer.id}`, payer)
        return data
    }

    public async get(id: string): Promise<Payer | null> {
        const { data } = await this.http.get(`/payers/${id}`)
        return data
    }

    public async list(params?: BasicListParams): Promise<Payer[]> {
        const { data } = await this.http.get('/payers', { params })
        return data || []
    }

    public async delete(id: string): Promise<void> {
        await this.http.delete(`/payers/${id}`)
    }
}
