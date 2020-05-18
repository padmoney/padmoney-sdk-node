import { Pagination } from '../common/types'

export type DiscountType = 'none' | 'fixed' | 'percentage'
export type PaymentTypes = 'bank_billet'
export type InvoiceRequestPayer = InvoicePayer | Omit<InvoicePayer, 'id'> | Pick<InvoicePayer, 'id'>
export type InvoiceRequestItem = Pick<Item, 'amount' | 'dueDate'>

export interface BankBillet {
    id: string,
    amount: number,
    status: string,
    number: number,
    ourNumber: string,
    barcode: string,
    identificationField: string,
    instructions: string,
    discountType: DiscountType,
    discountLimitDate: Date | string,
    dueDate: Date | string,
    documentDate: Date | string
}

export interface Item {
    amount: number
    dueDate: Date | string
    url: string
    bankBillet: BankBillet
}

export interface InvoicePayer {
    id: string
    name: string
    document: string
    email: string
    phoneNumber: string
    address: {
        zipcode: string,
        address: string,
        neighborhood: string,
        addressNumber: string,
        addressComplement?: string,
        city: string,
        state: string,
        number: string
    }
}

export interface InvoiceRequest {
    virtualAccountID?: string
    documentNumber?: string
    notificationUrl?: string
    notificationCode?: string
    description: string

    discountType: DiscountType
    discountValue?: number
    discountPercentage?: number
    discountDays?: number

    interestMonthlyPercentage?: number
    fineForDelay?: number

    payer: InvoiceRequestPayer

    items: InvoiceRequestItem[]

    payableWith: Array<PaymentTypes>
}

export interface InvoiceResponse {
    id: string
    amount: number
    payableWith: PaymentTypes[]
    requestId: string

    payer: InvoicePayer

    discountType: string
    discountValue?: number
    discountPercentage?: number
    discountDays?: number

    interestMonthlyPercentage?: number
    fineForDelay?: number

    items: Item[]
}

export interface Invoice {
    id: string
    payer: InvoicePayer,
    amount: number
    payableWith: string[]
    discountType: string
    discountValue: string
    discountPercentage: string
    discountDays: string
    interestMonthlyPercentage: number
    fineForDelay: number
    items: Array<{
        id: string
        number: number
        amount: number
        status: string
        canceledAt: Date | string
        createdAt: Date | string
        processedAt: Date | string
        bankBillet: {
            id: string
            amount: number
            processedAt: Date | string
            paidAmount: number
            canceledAt: Date | string
            status: string
            number: number
            ourNumber: string
            barcode: string
            identification_field: string
            instructions: string
            discount_type: string
            paidDiscount: number
            paidRebate: number
            otherExpensesValue: number
            fineValue: number
            otherReceiptsValue: number
            interestValue: number
            dueDate: Date | string
            documentDate: Date | string
        },
        url: string,
        dueDate: Date | string
    }>
}

export interface InvoiceByItem {
    id: string,
    payer: {
        id: string,
        name: string,
        document: string,
        phone: string,
        email: string,
        address: {
            zipcode: string,
            address: string,
            complement: string,
            number: string,
            neighborhood: string,
            city: string,
            state: string
        },
        sendEmail: boolean,
        sendSms: boolean
    },
    amount: number,
    payableWith: PaymentTypes[],
    requestId: string,
    discountType: string,
    interestMonthlyPercentage: number,
    fineForDelay: number,
    items: Array<{
        id: string,
        number: 1,
        amount: 110,
        status: string,
        bank_billet: {
            id: string,
            amount: number,
            paidAmount: number,
            status: string,
            number: number,
            ourNumber: string,
            barcode: string,
            identificationField: string,
            instructions: string,
            discountType: string,
            paidDiscount: number,
            paidRebate: number,
            otherExpensesValue: number,
            fineValue: number,
            otherReceiptsValue: number,
            interestValue: number,
            dueDate: string,
            documentDate: string,
            processedAt: string,
            paidAt: string
        },
        url: string,
        dueDate: string,
        createdAt: string,
        processedAt: string
    }>
}

export type ListParamsPeriodType = 'by-emission' | 'by-payment' | 'by-overdue'
export type ListParamsStatus =
    'generating'
    | 'opened'
    | 'overdue'
    | 'paid'
    | 'pending'
    | 'canceled'
    | 'rejected'
    | 'canceling'

export interface ListParams extends Pagination {
    payerId?: string
    virtualAccountId?: string
    periodType?: ListParamsPeriodType
    from?: Date | string
    to?: Date | string
    amountFrom?: number
    amountTo?: number
    status?: ListParamsStatus
}
