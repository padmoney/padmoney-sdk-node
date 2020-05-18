import HttpFactory from './HttpFactory';

export default class AbstractService {
    private readonly httpFactory: HttpFactory;

    constructor(httpFactory: HttpFactory) {
        this.httpFactory = httpFactory;
    }

    protected get http() {
        return this.httpFactory.get()
    }
}
