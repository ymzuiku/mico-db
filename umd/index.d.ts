import { CollectionOptions } from "./collection";
export declare const MicoDb: {
    (name?: string): {
        name: string;
        isHaveIndexedDb: boolean;
        version: number;
        /** remove indexedDb by key */
        remove: (key: string) => Promise<any>;
        collection: <T>(key: string, opt?: Partial<CollectionOptions<T>>) => {
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
            updateOne: (filter: Partial<T & import("./collection").BaseColl>, { $set }: import("./collection").CollectionUpdateOpt<T>) => Promise<(T & import("./collection").BaseColl) | undefined>;
            updateMany: (filter: Partial<T & import("./collection").BaseColl>, { $set }: import("./collection").CollectionUpdateOpt<T>) => Promise<T[]>;
            insertOne: (data: Partial<T>) => Promise<T[]>;
            insertMany: (dataList: Partial<T>[]) => Promise<T[]>;
            removeDuplicatie: (key: string) => Promise<T[]>;
            setAll: (dataList: Partial<T>[]) => Promise<void>;
        };
        localItem: <T_1>(key: string, init: T_1) => import("./item").Item<T_1>;
        sessionItem: <T_2>(key: string, init: T_2) => import("./item").Item<T_2>;
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
    nanoid: (size?: number) => string;
};
export default MicoDb;
