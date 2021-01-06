export interface Item<T> {
    (data?: Partial<T>): T;
    merge: (value: Partial<T>) => void;
    set: (value: Partial<T>) => void;
    get: () => T;
}
export interface ItemOptions<T> {
    init?: T;
    type?: "sessionStorage" | "localStorage";
    set: (key: string, value: any) => void;
    get: (key: string) => T;
}
export declare const CreateItem: <T>(key: string, opt: ItemOptions<T>) => Item<T>;
