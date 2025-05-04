/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { request as fetch } from '@/idl/utils/request';
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
    
        export const request = async (data: Request): Promise<Response | null | undefined> => {
            return fetch({ url, method, serializer, data });
        };
    
    }
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

export interface SidebarsRequest {

}

export interface SidebarsResponse {
    groups?: SidebarGroup[];
}

export namespace ClientService {
    export namespace GetDocsSidebars {
    
        export type Request = SidebarsRequest;
    
        export type Response = SidebarsResponse;
    
        export const url = '/api/client/docs/sidebars';
    
        export const method = 'get';
    
        export const serializer = 'json';
    
        export const request = async (data: Request): Promise<Response | null | undefined> => {
            return fetch({ url, method, serializer, data });
        };
    
    }

    export namespace GetLeetcodeSidebars {
    
        export type Request = SidebarsRequest;
    
        export type Response = SidebarsResponse;
    
        export const url = '/api/client/leetcode/sidebars';
    
        export const method = 'get';
    
        export const serializer = 'json';
    
        export const request = async (data: Request): Promise<Response | null | undefined> => {
            return fetch({ url, method, serializer, data });
        };
    
    }
}