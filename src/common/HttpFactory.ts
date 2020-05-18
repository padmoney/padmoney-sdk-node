import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import CaseHelper                                                  from './CaseHelper';
import Credentials                                                 from './Credentials';

type Headers = { [key: string]: string }

const PRODUCTION_URL  = 'http://api.padmoney.com/v2';
const HOMOLOG_URL     = 'http://homolog.padmoney.com/api/v2';
const DEVELOPMENT_URL = 'http://localhost:8083/v2';

function getBaseURLFromEnv(env: string): string {
    switch (env) {
        case 'dev':
            return DEVELOPMENT_URL;
        case 'test':
            return HOMOLOG_URL;
        case 'prod':
            return PRODUCTION_URL;
        default:
            throw new Error('Environment invalid.')
    }
}

export default class HttpFactory {
    private readonly env!: string;
    private readonly baseURL!: string;
    private readonly cretentials!: Credentials;

    constructor(credentials: Credentials, env: string) {
        this.env         = env;
        this.baseURL     = getBaseURLFromEnv(env);
        this.cretentials = credentials;

        this.snakeCaseMiddleware = this.snakeCaseMiddleware.bind(this)
        this.camelCaseMiddleware = this.camelCaseMiddleware.bind(this)
        this.errorMiddleware     = this.errorMiddleware.bind(this)
    }

    public async authenticate() {
        await this.cretentials.authenticate(this.instance())
    }

    public get(): AxiosInstance {
        const instance = this.instance()
        this.cretentials.applyHeaders(instance);
        instance.interceptors.request.use(this.snakeCaseMiddleware)
        instance.interceptors.response.use(this.camelCaseMiddleware)
        instance.interceptors.response.use(this.errorMiddleware)
        return instance
    }

    private instance(): AxiosInstance {
        return axios.create({
            baseURL:        this.baseURL,
            validateStatus: () => true
        });
    }

    private snakeCaseMiddleware(config: AxiosRequestConfig) {
        if (config.params) {
            config.params = CaseHelper.toSnakeCase(config.params)
        }
        if (config.data) {
            config.data = CaseHelper.toSnakeCase(config.data)
        }
        return config
    }

    private camelCaseMiddleware(response: AxiosResponse) {
        if (response.data) {
            response.data = CaseHelper.toCamelCase(response.data)
        }
        return response
    }

    private errorMiddleware(response: AxiosResponse) {
        const { status, data } = response
        if (status !== 200) {
            throw new Error((data && data.error) || 'Unknown error')
        }
        return response
    }
}
