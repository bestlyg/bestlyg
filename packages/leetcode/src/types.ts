export interface LeetCodeGraphQLQuery {
    operationName?: string;
    variables?: { [key: string]: unknown };
    query: string;
    headers?: { [key: string]: string };
}
