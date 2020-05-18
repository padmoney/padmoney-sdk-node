import Credentials                           from './Credentials';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

const TYPE_TOKEN = 'token';

export default class CredentialsToken extends Credentials {
    private readonly token!: string;
    private readonly secret!: string;

    constructor(token: string, tokenSecret: string) {
        super(TYPE_TOKEN);

        this.token  = token;
        this.secret = tokenSecret;

        this.middleware = this.middleware.bind(this)
    }

    private headers(headers: any): any {
        return {
            ...headers,
            'Padmoney-Token':  this.token,
            'Padmoney-Secret': this.secret
        }
    }

    private middleware(config: AxiosRequestConfig): AxiosRequestConfig {
        return {
            ...config,
            headers: this.headers(config.headers)
        }
    }

    public applyHeaders(axios: AxiosInstance) {
        axios.interceptors.request.use(this.middleware)
    };

    public async authenticate(axios: AxiosInstance): Promise<void> {
        this.applyHeaders(axios)
        const { status } = await axios.get('/accounts/me')
        if (status !== 200) {
            throw new Error('Invalid token ou secret')
        }
    }
}
