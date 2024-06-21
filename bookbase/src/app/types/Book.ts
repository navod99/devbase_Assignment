export interface BookDetails {
    id: string,
    title: string;
    author: string;
}

export interface BookListResponse {
    data: BookDetails[],
    totalCount: string
}
