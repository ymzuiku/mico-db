# mico-db

简易的 Web indexedDB 接口封装, 兼容 localStoage 和 sessionStorage, 内置 mini-mongodb API

Document: [https://mico-db.writeflowy.com](https://mico-db.writeflowy.com)

## API

```ts
import { CollectionOptions } from "./collection";
export declare const createMicoDb: (
  name?: string
) => {
  name: string;
  isHaveIndexedDb: boolean;
  version: number;
  /** remove indexedDb by key */
  remove: (key: string) => Promise<any>;
  collection: <T>(
    key: string,
    opt?: Partial<CollectionOptions<T>>
  ) => {
    proxy: import("./collection").ProxyCollection<T>;
    index: (
      index: number,
      sort?:
        | {
            [key: string]: number;
          }
        | undefined
    ) => Promise<T>;
    count: () => Promise<number>;
    find: (
      filter?: Partial<T> | ((val: T) => any) | undefined,
      sort?:
        | {
            [key: string]: number;
          }
        | undefined
    ) => Promise<T[]>;
    findOne: (
      filter?: Partial<T> | ((val: T) => any) | undefined
    ) => Promise<T>;
    deleteMany: (filter?: Partial<T> | undefined) => Promise<T[]>;
    deleteOne: (filter?: Partial<T> | undefined) => Promise<T | undefined>;
    updateOne: (
      filter: Partial<T & import("./collection").BaseColl>,
      data: Partial<T & import("./collection").BaseColl>
    ) => Promise<(T & import("./collection").BaseColl) | undefined>;
    updateMany: (
      filter: Partial<T & import("./collection").BaseColl>,
      data: Partial<T & import("./collection").BaseColl>
    ) => Promise<T[]>;
    insertOne: (data: Partial<T>) => Promise<T[]>;
    insertMany: (dataList: Partial<T>[]) => Promise<T[]>;
    removeDuplicatie: (key: string) => Promise<T[]>;
    set: (dataList: Partial<T>[]) => Promise<void>;
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
declare const micoDb: {
  name: string;
  isHaveIndexedDb: boolean;
  version: number;
  /** remove indexedDb by key */
  remove: (key: string) => Promise<any>;
  collection: <T>(
    key: string,
    opt?: Partial<CollectionOptions<T>>
  ) => {
    proxy: import("./collection").ProxyCollection<T>;
    index: (
      index: number,
      sort?:
        | {
            [key: string]: number;
          }
        | undefined
    ) => Promise<T>;
    count: () => Promise<number>;
    find: (
      filter?: Partial<T> | ((val: T) => any) | undefined,
      sort?:
        | {
            [key: string]: number;
          }
        | undefined
    ) => Promise<T[]>;
    findOne: (
      filter?: Partial<T> | ((val: T) => any) | undefined
    ) => Promise<T>;
    deleteMany: (filter?: Partial<T> | undefined) => Promise<T[]>;
    deleteOne: (filter?: Partial<T> | undefined) => Promise<T | undefined>;
    updateOne: (
      filter: Partial<T & import("./collection").BaseColl>,
      data: Partial<T & import("./collection").BaseColl>
    ) => Promise<(T & import("./collection").BaseColl) | undefined>;
    updateMany: (
      filter: Partial<T & import("./collection").BaseColl>,
      data: Partial<T & import("./collection").BaseColl>
    ) => Promise<T[]>;
    insertOne: (data: Partial<T>) => Promise<T[]>;
    insertMany: (dataList: Partial<T>[]) => Promise<T[]>;
    removeDuplicatie: (key: string) => Promise<T[]>;
    set: (dataList: Partial<T>[]) => Promise<void>;
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
export default micoDb;
```
