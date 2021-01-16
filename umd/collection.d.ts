export interface BaseColl {
    _id?: string;
}
export interface ProxyCollection<T extends BaseColl> {
    onChange?: (dataList: T[]) => any;
    find?: (filter: Partial<T>, data: T[]) => any;
    findOne?: (filter: Partial<T>, data?: T) => any;
    deleteOne?: (filter: Partial<T>, data?: T) => any;
    deleteMany?: (filter: Partial<T>, data: T[]) => any;
    updateOne?: (filter: Partial<T>, inputData: {
        $set?: Partial<T>;
        $unset?: Partial<T>;
    }, returnData?: T) => any;
    updateMany?: (filter: Partial<T>, inputData: {
        $set?: Partial<T>;
        $unset?: Partial<T>;
    }, returnData: T[]) => any;
    insertOne?: (inputData: Partial<T>) => any;
    insertMany?: (inputList: Partial<T>[]) => any;
    removeDuplicatie?: (key: string, returnData: T[]) => any;
}
export interface CollectionOptions<T extends BaseColl> {
    type?: "sessionStorage" | "indexedDB" | "localStorage";
    init?: T;
    sort?: {
        [key: string]: number;
    };
    proxy?: ProxyCollection<T>;
    set: (key: string, value: any) => void | Promise<void>;
    get: (key: string) => T[] | Promise<T[]>;
}
export interface CollectionUpdateOpt<T> {
    $set?: Partial<T & BaseColl>;
}
export declare const collection: <T extends BaseColl>(key: string, opt: CollectionOptions<T>) => {
    proxy: ProxyCollection<T>;
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
    set: (dataList: Partial<T>[]) => Promise<void>;
};
