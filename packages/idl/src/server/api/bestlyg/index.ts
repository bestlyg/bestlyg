export interface BestlygHealthRequest {
    env?: string;
}

export interface BestlygHealthResponse {
    code: number;

    msg?: string;

    data?: string;
}

export namespace BestlygService {
    export namespace HealthCheck {
        export type Request = BestlygHealthRequest;
        export type Response = BestlygHealthResponse;
        export const url = '/api/health';
        export const method = 'get';
        export const serializer = 'json';
        
    }
}