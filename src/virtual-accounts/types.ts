export interface VirtualAccount {
    id: string
    description: string
    number: string
    default: boolean
    active: boolean
    businessGroup: boolean
}

export type VirtualAccountUpdate = Omit<VirtualAccount, 'number' | 'active' | 'businessGroup'>
export type VirtualAccountCreate = Omit<VirtualAccountUpdate, 'id'>
