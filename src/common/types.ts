export interface Pagination {
    page?: number
    perPage?: number
}

export interface BasicListParams extends Pagination {
    q?: string
}
