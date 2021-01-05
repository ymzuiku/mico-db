export interface Item<T> {
    merge: (key: string, value: any) => void;
    set: (key: string, value: any) => void;
    get: (key: string) => T;
}
export interface ItemOptions<T> {
    init?: (data: T) => any;
    type?: "sessionStorage" | "localStorage";
    set: (key: string, value: any) => void;
    get: (key: string) => T;
}
export declare const CreateItem: <T>(opt: ItemOptions<T>) => Item<T>;
