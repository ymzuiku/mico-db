export interface Item<T> {
    merge: (value: any) => void;
    set: (value: any) => void;
    get: () => T;
}
export interface ItemOptions<T> {
    init?: T;
    type?: "sessionStorage" | "localStorage";
    set: (key: string, value: any) => void;
    get: (key: string) => T;
}
export declare const CreateItem: <T>(key: string, opt: ItemOptions<T>) => Item<T>;
