export interface BaseColl {
    _id?: string;
}
export interface CollectionOptions<T extends BaseColl> {
    type?: "sessionStorage" | "indexedDB" | "localStorage";
    init?: T;
    sort?: {
        [key: string]: number;
    };
    set: (key: string, value: any) => void | Promise<void>;
    get: (key: string) => T[] | Promise<T[]>;
}
export interface CollectionUpdateOpt<T> {
    $set?: Partial<T & BaseColl>;
}
export declare const collection: <T extends BaseColl>(key: string, opt: CollectionOptions<T>) => {
    onChange: void | ((dataList: T[]) => any);
    index: (index: number, sort?: {
        [key: string]: number;
    } | undefined) => Promise<T>;
    count: () => Promise<number>;
    find: (filter?: Partial<T> | ((val: T) => any) | undefined, sort?: {
        [key: string]: number;
    } | undefined) => Promise<T[]>;
    findOne: (filter?: Partial<T> | ((val: T) => any) | undefined) => Promise<T>;
    deleteMany: (filter?: Partial<T> | undefined) => Promise<T[]>;
    deleteOne: (filter?: Partial<T> | undefined) => Promise<T | undefined>;
    updateOne: (filter: Partial<T & BaseColl>, { $set }: CollectionUpdateOpt<T>) => Promise<(T & BaseColl) | undefined>;
    updateMany: (filter: Partial<T & BaseColl>, { $set }: CollectionUpdateOpt<T>) => Promise<T[]>;
    insertOne: (data: Partial<T>) => Promise<T[]>;
    insertMany: (dataList: Partial<T>[]) => Promise<T[]>;
    removeDuplicatie: (key: string) => Promise<T[]>;
    setAll: (dataList: Partial<T>[]) => Promise<void>;
};
