interface ProxyCollection<T> {
    onChange?: (dataList: T[]) => any;
    find?: (filter: Partial<T>, data: T[]) => any;
    findOne?: (filter: Partial<T>, data?: T) => any;
    deleteOne?: (filter: Partial<T>, data?: T) => any;
    deleteMany?: (filter: Partial<T>, data: T[]) => any;
    updateOne?: (filter: Partial<T>, inputData: Partial<T>, returnData?: T) => any;
    updateMany?: (filter: Partial<T>, inputData: Partial<T>, returnData: T[]) => any;
    insertOne?: (inputData: Partial<T>) => any;
    insertMany?: (inputList: Partial<T>[]) => any;
    removeDuplicatie?: (key: string, returnData: T[]) => any;
}
interface CollectionOptions<T> {
    initData?: T;
    sort?: {
        [key: string]: number;
    };
    proxy?: ProxyCollection<T>;
}
export declare const createMicoDb: (name?: string) => {
    name: string;
    isHaveIndexedDb: boolean;
    version: number;
    /** remove indexedDb by key */
    remove: (key: string) => Promise<any>;
    collection: <T>(key: string, opt?: CollectionOptions<T>) => {
        proxy: ProxyCollection<T>;
        index: (index: number, sort?: {
            [key: string]: number;
        } | undefined) => Promise<T>;
        count: () => Promise<number>;
        find: (filter?: Partial<T> | ((val: T) => any) | undefined, sort?: {
            [key: string]: number;
        } | undefined) => Promise<T[]>;
        findOne: (filter: Partial<T> | ((val: T) => any)) => Promise<T | undefined>;
        deleteMany: (filter: Partial<T>) => Promise<T[]>;
        deleteOne: (filter: Partial<T>) => Promise<T | undefined>;
        updateOne: (filter: Partial<T>, data: Partial<T>) => Promise<T | undefined>;
        updateMany: (filter: Partial<T>, data: Partial<T>) => Promise<T[]>;
        insertOne: (data: Partial<T>) => Promise<T[]>;
        insertMany: (dataList: Partial<T>[]) => Promise<T[]>;
        removeDuplicatie: (key: string) => Promise<T[]>;
        set: (dataList: Partial<T>[]) => Promise<void>;
    };
    dbItem: <T_1>(key: string, initData: T_1) => {
        get: () => Promise<T_1>;
        set: (value: Partial<T_1>) => Promise<void>;
        remove: () => Promise<any>;
    };
    sessionItem: <T_2>(key: string, initData?: T_2 | undefined) => {
        get: () => T_2;
        set: (value: Partial<T_2>) => void;
        remove: () => any;
    };
    localItem: <T_4>(key: string, initData?: T_4 | undefined) => {
        get: () => T_4;
        set: (value: Partial<T_4>) => void;
        remove: () => any;
    };
    /** get indexedDb by key */
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
declare const _default: {
    name: string;
    isHaveIndexedDb: boolean;
    version: number;
    /** remove indexedDb by key */
    remove: (key: string) => Promise<any>;
    collection: <T>(key: string, opt?: CollectionOptions<T>) => {
        proxy: ProxyCollection<T>;
        index: (index: number, sort?: {
            [key: string]: number;
        } | undefined) => Promise<T>;
        count: () => Promise<number>;
        find: (filter?: Partial<T> | ((val: T) => any) | undefined, sort?: {
            [key: string]: number;
        } | undefined) => Promise<T[]>;
        findOne: (filter: Partial<T> | ((val: T) => any)) => Promise<T | undefined>;
        deleteMany: (filter: Partial<T>) => Promise<T[]>;
        deleteOne: (filter: Partial<T>) => Promise<T | undefined>;
        updateOne: (filter: Partial<T>, data: Partial<T>) => Promise<T | undefined>;
        updateMany: (filter: Partial<T>, data: Partial<T>) => Promise<T[]>;
        insertOne: (data: Partial<T>) => Promise<T[]>;
        insertMany: (dataList: Partial<T>[]) => Promise<T[]>;
        removeDuplicatie: (key: string) => Promise<T[]>;
        set: (dataList: Partial<T>[]) => Promise<void>;
    };
    dbItem: <T_1>(key: string, initData: T_1) => {
        get: () => Promise<T_1>;
        set: (value: Partial<T_1>) => Promise<void>;
        remove: () => Promise<any>;
    };
    sessionItem: <T_2>(key: string, initData?: T_2 | undefined) => {
        get: () => T_2;
        set: (value: Partial<T_2>) => void;
        remove: () => any;
    };
    localItem: <T_3>(key: string, initData?: T_3 | undefined) => {
        get: () => T_3;
        set: (value: Partial<T_3>) => void;
        remove: () => any;
    };
    /** get indexedDb by key */
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
export default _default;
