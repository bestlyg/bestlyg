/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { fetch } from '@/utils';
export interface BestlygHealthRequest {
    /** 环境变量 */
    env?: string;
}

export interface BestlygHealthResponse {
    code: number;

    msg?: string;

    /** 会返回BestlygHealthRequest请求中的env，如果没有env就返回bestlyg */
    data?: string;
}

export interface BestlygLogin {

}

export namespace BestlygService {
    export namespace HealthCheck {
        export type Request = BestlygHealthRequest;
        export type Response = BestlygHealthResponse;
        export const url = '/api/health';
        export const method = 'get';
        export const serializer = 'json';
        export const request = async (req: Request): Promise<Response> => {
            return fetch({ url, method, serializer, data: req });
        };
    }
}