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
    waitInit: (key: string) => Promise<T[]>;
}
export interface CollectionUpdateOpt<T> {
    $set?: Partial<T & BaseColl>;
}
export declare const collection: <T extends BaseColl>(key: string, opt: CollectionOptions<T>) => {
    onChange: (list: T[]) => any;
    waitInit: () => Promise<T[]>;
    index: (index: number, sort?: {
        [key: string]: number;
    } | undefined) => T;
    count: () => number;
    find: (filter?: Partial<T> | ((val: T) => any) | undefined, sort?: {
        [key: string]: number;
    } | undefined) => T[];
    findOne: (filter?: Partial<T> | ((val: T) => any) | undefined) => T;
    deleteMany: (filter?: Partial<T> | undefined) => T[];
    deleteOne: (filter?: Partial<T> | undefined) => void | T;
    updateOne: (filter: Partial<T & BaseColl>, { $set }: CollectionUpdateOpt<T>) => void | (T & BaseColl);
    updateMany: (filter: Partial<T & BaseColl>, { $set }: CollectionUpdateOpt<T>) => T[];
    insertOne: (data: Partial<T>) => T[];
    insertMany: (dataList: Partial<T>[]) => T[];
    removeDuplicatie: (key: string) => T[];
    setAll: (dataList: Partial<T>[]) => Promise<void>;
};
export declare const createMicoDb: (name?: string) => {
    name: string;
    nanoid: (size?: number) => string;
    isHaveIndexedDb: boolean;
    version: number;
    /** remove indexedDb by key */
    remove: (key: string) => Promise<any>;
    collection: <T>(key: string, opt?: Partial<CollectionOptions<T>>) => {
        onChange: (list: T[]) => any;
        waitInit: () => Promise<T[]>;
        index: (index: number, sort?: {
            [key: string]: number;
        } | undefined) => T;
        count: () => number;
        find: (filter?: Partial<T> | ((val: T) => any) | undefined, sort?: {
            [key: string]: number;
        } | undefined) => T[];
        findOne: (filter?: Partial<T> | ((val: T) => any) | undefined) => T;
        deleteMany: (filter?: Partial<T> | undefined) => T[];
        deleteOne: (filter?: Partial<T> | undefined) => void | T;
        updateOne: (filter: Partial<T & BaseColl>, { $set }: CollectionUpdateOpt<T>) => void | (T & BaseColl);
        updateMany: (filter: Partial<T & BaseColl>, { $set }: CollectionUpdateOpt<T>) => T[];
        insertOne: (data: Partial<T>) => T[];
        insertMany: (dataList: Partial<T>[]) => T[];
        removeDuplicatie: (key: string) => T[];
        setAll: (dataList: Partial<T>[]) => Promise<void>;
    };
    localItem: <T_2>(key: string, init: T_2) => import("./item").Item<T_2>;
    sessionItem: <T_3>(key: string, init: T_3) => import("./item").Item<T_3>;
    get: (key: string) => Promise<any>;
    /** set indexedDb by key */
    set: (key: string, obj: any) => Promise<any>;
    setLocalStorage: (key: string, obj: any) => void;
    getLocalStorage: (key: string) => any;
    removeLocalStorage: (key: string) => void;
    setSessionStorage: (key: string, obj: any) => void;
    getSessionStorage: (key: string) => any;
    removeSessionStorage: (key: string) => void;
};
declare const micoDb: {
    name: string;
    nanoid: (size?: number) => string;
    isHaveIndexedDb: boolean;
    version: number;
    /** remove indexedDb by key */
    remove: (key: string) => Promise<any>;
    collection: <T>(key: string, opt?: Partial<CollectionOptions<T>>) => {
        onChange: (list: T[]) => any;
        waitInit: () => Promise<T[]>;
        index: (index: number, sort?: {
            [key: string]: number;
        } | undefined) => T;
        count: () => number;
        find: (filter?: Partial<T> | ((val: T) => any) | undefined, sort?: {
            [key: string]: number;
        } | undefined) => T[];
        findOne: (filter?: Partial<T> | ((val: T) => any) | undefined) => T;
        deleteMany: (filter?: Partial<T> | undefined) => T[];
        deleteOne: (filter?: Partial<T> | undefined) => void | T;
        updateOne: (filter: Partial<T & BaseColl>, { $set }: CollectionUpdateOpt<T>) => void | (T & BaseColl);
        updateMany: (filter: Partial<T & BaseColl>, { $set }: CollectionUpdateOpt<T>) => T[];
        insertOne: (data: Partial<T>) => T[];
        insertMany: (dataList: Partial<T>[]) => T[];
        removeDuplicatie: (key: string) => T[];
        setAll: (dataList: Partial<T>[]) => Promise<void>;
    };
    localItem: <T_2>(key: string, init: T_2) => import("./item").Item<T_2>;
    sessionItem: <T_3>(key: string, init: T_3) => import("./item").Item<T_3>;
    get: (key: string) => Promise<any>;
    /** set indexedDb by key */
    set: (key: string, obj: any) => Promise<any>;
    setLocalStorage: (key: string, obj: any) => void;
    getLocalStorage: (key: string) => any;
    removeLocalStorage: (key: string) => void;
    setSessionStorage: (key: string, obj: any) => void;
    getSessionStorage: (key: string) => any;
    removeSessionStorage: (key: string) => void;
};
export default micoDb;
