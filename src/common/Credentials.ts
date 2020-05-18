import { AxiosInstance } from 'axios';

export default abstract class Credentials {
    public readonly type: string;

    protected constructor(type: string) {
        this.type = type;
    }

    public abstract async authenticate(axios: AxiosInstance): Promise<void>;

    public abstract applyHeaders(axios: AxiosInstance): void;

}
