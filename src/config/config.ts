/* eslint-disable */

export const RESP_CODE = {
    SUCCESS: '0',
    FAIL: '1'
}
export type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type RES_TYPE = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
export interface AXIOS_CONFIG_TYPE {
    baseURL?: string;
    url: string;
    data?: any;
    params?: any;
    method?: METHOD;
    headers?: any;
    timeout?: number;
    responseType?: RES_TYPE;
    [propName: string]: any;
}

export interface AXIOS_RES {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: AXIOS_CONFIG_TYPE;
    request?: any;
}

export interface PARAMS {
    pageNo: number;
    pageSize: number;
    title?: string;
    create_time_start?: string;
    create_time_end?: string;
    update_time_start?: string;
    update_time_end?: string;
}

export interface TEXT {
    mdId: number;
    title: string;
    content: string;
    create_time: string;
    update_time: string;
    tag: string;
    classification: string;
}