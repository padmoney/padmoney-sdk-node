import { AxiosInstance, AxiosRequestConfig } from 'axios';
import Credentials                           from './Credentials';

export default class CredentialsPassword extends Credentials {
    private username: string;
    private password: string;
    private token: string = '';

    constructor(username: string, password: string) {
        super('password');

        this.username = username;
        this.password = password;

        this.middleware = this.middleware.bind(this)
    }

    private headers(headers: any): any {
        return {
            ...headers,
            'Authorization': this.token
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
        const { status, data } = await axios.post('/auth', {
            login:    this.username,
            password: this.password
        })
        if (status === 401) {
            throw new Error('Invalid username or password')
        }
        if (status !== 200) {
            throw new Error((data && data.error) || 'Error on authentication.')
        }
        this.token = data.token
    }
}
