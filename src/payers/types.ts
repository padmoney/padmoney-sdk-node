export interface Address {
    zipcode: string;
    address: string;
    complement?: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
}

export interface Payer {
    id?: string;
    name: string;
    nickname: string;
    document: string;
    phone?: string;
    cellPhone?: string;
    email?: string;
    sendEmail?: string;
    sendSMS?: string;
    address: Address;
}
