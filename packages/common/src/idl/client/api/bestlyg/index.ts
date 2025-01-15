/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { fetch } from '@/idl/utils/index';
export interface BestlygHealthRequest {
    /** 环境变量 */
    env?: string;
}

export interface Item {
    /** xxx */
    a: number;

    parent?: Item;
}

export interface BestlygHealthResponse {
    code: number;

    msg?: string;

    /** 会返回BestlygHealthRequest请求中的env，如果没有env就返回bestlyg */
    data: string;

    item?: Item;
}

export namespace BestlygService {
    export namespace HealthCheck {
        export type Request = BestlygHealthRequest;
        export type Response = BestlygHealthResponse;
        export const url = '/api/health';
        export const method = 'get';
        export const serializer = 'json';
        export const request = async (req: Request) => {
            return fetch<Request, Response>({ url, method, serializer, data: req });
        };
    }
}

export interface GetSidebarsRequest {

}

export interface SidebarItem {
    name: string;

    link: string;
}

export interface SidebarGroup {
    name: string;

    items?: SidebarItem[];

    groups?: SidebarGroup[];
}

export interface GetSidebarsResponse {
    groups?: SidebarGroup[];
}

export namespace ClientService {
    export namespace GetSidebars {
        export type Request = GetSidebarsRequest;
        export type Response = GetSidebarsResponse;
        export const url = '/api/client/sidebars';
        export const method = 'get';
        export const serializer = 'json';
        export const request = async (req: Request) => {
            return fetch<Request, Response>({ url, method, serializer, data: req });
        };
    }
}