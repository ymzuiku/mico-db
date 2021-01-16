import { CreateItem } from "./item";
import { nanoid } from "./nanoid";

export interface BaseColl {
  _id?: string;
}

export interface CollectionOptions<T extends BaseColl> {
  type?: "sessionStorage" | "indexedDB" | "localStorage";
  init?: T;
  sort?: { [key: string]: number };
  set: (key: string, value: any) => void | Promise<void>;
  get: (key: string) => T[] | Promise<T[]>;
  waitInit: (key: string) => Promise<T[]>;
}

function onChangeCb(db: any, get: any, key: string) {
  if (db.onChange) {
    const all = get(key);
    const next = JSON.stringify(all);
    if (db.lastOnChange !== next) {
      db.onChange(all);
    }
    db.lastOnChange = next;
  }
}

const sortFn = (sort: any, coll: any[]) => {
  if (sort) {
    const k = Object.keys(sort)[0];
    const v = sort[k];
    if (v === 1) {
      coll = coll.sort((a: any, b: any) => a[k] - b[k]);
    } else if (v === -1) {
      coll = coll.sort((a: any, b: any) => b[k] - a[k]);
    }
  }
  return coll;
};

export interface CollectionUpdateOpt<T> {
  $set?: Partial<T & BaseColl>;
}

export const collection = <T extends BaseColl>(
  key: string,
  opt: CollectionOptions<T>
) => {
  const { get, set, waitInit } = opt;

  const initColl = <T>(key: string): T[] => {
    let coll = get(key) as any[];
    if (!coll) {
      coll = [];
      set(key, coll);
    }
    return coll;
  };

  const db = {
    onChange: (void 0 as any) as (list: T[]) => any,
    waitInit: () => {
      return Promise.resolve(waitInit(key));
    },
    index: (index: number, sort = opt.sort) => {
      let coll = initColl<T>(key);
      if (opt.init && coll.length === 0) {
        db.insertOne(opt.init);
      }
      coll = sortFn(sort, coll);
      return coll[index];
    },
    count: () => {
      const coll = initColl<T>(key);
      return coll.length;
    },
    find: (filter?: Partial<T> | ((val: T) => any), sort = opt.sort): T[] => {
      let coll = initColl<T>(key);

      if (opt.init && coll.length === 0) {
        db.insertOne(opt.init);
      }

      coll = sortFn(sort, coll);

      const keys = Object.keys(filter || {});
      if (keys.length === 0) {
        return coll;
      }
      let out: T[];
      if (typeof filter === "function") {
        out = coll.filter(filter);
      } else {
        out = coll.filter((item: any) => {
          let isPick = false;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
          return isPick;
        });
      }

      return out;
    },
    findOne: (filter?: Partial<T> | ((val: T) => any)): T => {
      const coll = initColl<T>(key);
      if (opt.init && coll.length === 0) {
        db.insertOne(opt.init);
      }
      const keys = Object.keys(filter || {});
      if (keys.length === 0) {
        return coll[0] || {};
      }
      let out: T | undefined;
      if (typeof filter === "function") {
        out = coll.find(filter);
      } else {
        out = coll.find((item: any) => {
          let isPick = false;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
          return isPick;
        });
      }
      return (out || {}) as any;
    },
    deleteMany: (filter?: Partial<T>): T[] => {
      if (!filter) {
        filter = {};
      }
      const coll = initColl<T>(key);
      const keys = Object.keys(filter);
      if (keys.length === 0) {
        set(key, []);
        return coll;
      }
      const out = [] as T[];
      const next = [] as T[];
      coll.forEach((item: any) => {
        let isPick = false;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if ((filter as any)[key] === item[key]) {
            isPick = true;
            break;
          }
        }
        if (!isPick) {
          next.push(item);
        } else {
          out.push(item);
        }
      });
      set(key, next);
      onChangeCb(db, get, key);
      return out;
    },
    deleteOne: (filter?: Partial<T>): T | void => {
      if (!filter) {
        filter = {};
      }
      const coll = initColl<T>(key);
      const keys = Object.keys(filter);
      if (keys.length === 0) {
        const del = coll.shift();
        set(key, coll);
        onChangeCb(db, get, key);
        return del;
      }
      const next = [] as T[];
      let del: T | undefined;
      coll.forEach((item: any) => {
        let isPick = false;
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if ((filter as any)[key] === item[key]) {
            isPick = true;
            break;
          }
        }
        if (del) {
          next.push(item);
        } else if (!isPick) {
          next.push(item);
        } else {
          del = item;
        }
      });
      set(key, next);
      onChangeCb(db, get, key);
      return del;
    },
    updateOne: (
      filter: Partial<T & BaseColl>,
      { $set }: CollectionUpdateOpt<T>
    ): (T & BaseColl) | void => {
      const coll = initColl<T>(key);
      const keys = Object.keys(filter);

      let out: T | undefined;
      if (keys.length === 0) {
        if ($set) {
          coll[0] = Object.assign(coll[0] || {}, $set);
        }
      } else {
        for (let index = 0; index < coll.length; index++) {
          const item = (coll[index] as any) || {};
          let isPick = false;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
          if (isPick) {
            Object.assign(item, $set);
            out = item;
            break;
          }
        }
      }

      set(key, coll);
      onChangeCb(db, get, key);
      return out;
    },
    updateMany: (
      filter: Partial<T & BaseColl>,
      { $set }: CollectionUpdateOpt<T>
    ): T[] => {
      const coll = initColl<T>(key);
      const keys = Object.keys(filter);
      const out = [] as T[];
      for (let index = 0; index < coll.length; index++) {
        const item = (coll[index] as any) || {};
        let isPick = keys.length === 0;
        if (!isPick) {
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
        }
        if (isPick) {
          Object.assign(item, $set);
          out.push(item);
        }
      }
      set(key, coll);
      onChangeCb(db, get, key);
      return out;
    },
    insertOne: (data: Partial<T>) => {
      const coll = initColl<T>(key);
      if (!data._id) {
        data._id = nanoid();
      }
      coll.push(data as any);
      set(key, coll);
      onChangeCb(db, get, key);
      return coll;
    },
    insertMany: (dataList: Partial<T>[]) => {
      const coll = initColl<T>(key);
      dataList.forEach((v) => {
        if (!v._id) {
          v._id = nanoid();
        }
        coll.push(v as any);
      });
      set(key, coll);
      onChangeCb(db, get, key);
      return coll;
    },
    removeDuplicatie: (key: string): T[] => {
      const coll = initColl<T>(key);
      const out = [] as T[];
      const list = new Set();
      for (let index = 0; index < coll.length; index++) {
        const item = coll[index] as any;
        const val = item[key];
        if (val === void 0) {
          out.push(item);
          continue;
        }
        if (!list.has(val)) {
          list.add(val);
          out.push(item);
        }
      }
      set(key, out);
      onChangeCb(db, get, key);
      return out;
    },
    setAll: async (dataList: Partial<T>[]) => {
      await set(key, dataList);
      onChangeCb(db, get, key);
    },
  };

  return db;
};

// 创建一个区别独立 key 前缀的 MicoDb
export const createMicoDb = (name = "mico-db") => {
  let db: IDBDatabase;
  const caches = {} as any;
  const setStorage = (type: string, key: string, obj: any) => {
    const fn = (window as any)[type];
    key = micoDb.name + micoDb.version + "_" + key;
    fn.setItem(key, JSON.stringify({ json: obj }));
  };
  const getStorage = (type: string, key: string) => {
    const fn = (window as any)[type];
    const obj = fn.getItem(micoDb.name + micoDb.version + "_" + key);
    const data = JSON.parse(obj);
    if (data) {
      return data.json;
    }
  };

  const removeStorage = (type: string, key: string) => {
    const fn = (window as any)[type];
    fn.removeItem(micoDb.name + micoDb.version + "_" + key);
  };

  function initDb(store: string) {
    return new Promise((res) => {
      if (!db) {
        const reqDb = window.indexedDB.open(micoDb.name, micoDb.version);
        reqDb.onerror = console.error;
        reqDb.onsuccess = (event: any) => {
          if (!db) {
            db = event.target.result;
          }
          res(void 0);
        };
        reqDb.onupgradeneeded = function (event: any) {
          if (!db) {
            db = event.target.result;
          }
          db.createObjectStore(store, { keyPath: "_id" });
        };
      } else {
        res(void 0);
      }
    });
  }

  const micoDb = {
    name,
    nanoid,
    isHaveIndexedDb: typeof window.indexedDB !== "undefined",
    version: 1,
    /** remove indexedDb by key */
    remove: (key: string): Promise<any> => {
      return new Promise((res) => {
        if (!key) {
          return res(void 0);
        }
        if (!micoDb.isHaveIndexedDb) {
          return res(micoDb.removeLocalStorage(key));
        }
        const store = micoDb.name + micoDb.version;
        initDb(store).then(() => {
          if (db.objectStoreNames.contains(store)) {
            const transaction = db.transaction([store], "readwrite");
            const objectStore = transaction.objectStore(store);
            const request = objectStore.delete(key);
            request.onerror = (err) => {
              console.error(err);
              res(void 0);
            };
            request.onsuccess = res;
          } else {
            res(void 0);
          }
        });
      });
    },
    collection: <T>(key: string, opt: Partial<CollectionOptions<T>> = {}) => {
      const type = opt.type || "indexedDB";

      if (type === "sessionStorage") {
        return collection(key, {
          ...opt,
          waitInit: micoDb.getSessionStorage as any,
          get: (key) => micoDb.getSessionStorage(key) || [],
          set: micoDb.setSessionStorage,
        });
      }

      if (type === "localStorage") {
        const _get = async (key: string) => {
          if (caches[key]) {
            return caches[key];
          }

          caches[key] = micoDb.getLocalStorage(key) || [];

          return caches[key];
        };

        const _set = (key: string, value: any) => {
          if (!caches[key]) {
            _get(key);
          }
          caches[key] = value;
          micoDb.set(key, value);
        };
        return collection(key, {
          ...opt,
          waitInit: _get,
          get: _get,
          set: _set,
        });
      }

      const waitInit = async (key: string) => {
        caches[key] = await micoDb.get(key);

        return caches[key];
      };
      const _get = (key: string) => {
        if (caches[key]) {
          return caches[key];
        }
        caches[key] = [];

        micoDb.get(key).then((v) => {
          caches[key] = v || [];
        });

        return caches[key];
      };

      const _set = (key: string, value: any) => {
        if (!caches[key]) {
          _get(key);
        }
        caches[key] = value;
        micoDb.set(key, value);
      };
      return collection(key, {
        ...opt,
        waitInit,
        get: _get,
        set: _set,
      });
    },
    localItem: <T>(key: string, init: T) => {
      return CreateItem<T>(key, {
        init,
        type: "localStorage",
        set: micoDb.setLocalStorage,
        get: micoDb.getLocalStorage,
      });
    },
    sessionItem: <T>(key: string, init: T) => {
      return CreateItem<T>(key, {
        init,
        type: "sessionStorage",
        set: micoDb.setSessionStorage,
        get: micoDb.getSessionStorage,
      });
    },
    get: (key: string): Promise<any> => {
      return new Promise((res) => {
        if (!key) {
          return res(void 0);
        }
        if (!micoDb.isHaveIndexedDb) {
          return res(micoDb.getLocalStorage(key));
        }
        const store = micoDb.name + micoDb.version;
        initDb(store).then(() => {
          if (db.objectStoreNames.contains(store)) {
            const transaction = db.transaction([store]);
            const objectStore = transaction.objectStore(store);
            const request = objectStore.get(key);
            request.onsuccess = function (event: any) {
              const result = event.target.result;
              res(result && result.obj);
            };
          } else {
            res(void 0);
          }
        });
      });
    },
    /** set indexedDb by key */
    set: (key: string, obj: any): Promise<any> => {
      return new Promise((res) => {
        if (!key) {
          return res(void 0);
        }
        if (!micoDb.isHaveIndexedDb) {
          return res(micoDb.setLocalStorage(key, obj));
        }
        const store = micoDb.name + micoDb.version;
        initDb(store).then(() => {
          if (db.objectStoreNames.contains(store)) {
            const transaction = db.transaction([store], "readwrite");
            const objectStore = transaction.objectStore(store);
            const request = objectStore.put({
              obj,
              _id: key,
            });
            request.onerror = (err) => {
              console.error(err);
              res(void 0);
            };
            request.onsuccess = res;
          } else {
            res(void 0);
          }
        });
      });
    },
    setLocalStorage: (key: string, obj: any) => {
      setStorage("localStorage", key, obj);
    },
    getLocalStorage: (key: string) => {
      return getStorage("localStorage", key);
    },
    removeLocalStorage: (key: string) => {
      removeStorage("localStorage", key);
    },
    setSessionStorage: (key: string, obj: any) => {
      setStorage("sessionStorage", key, obj);
    },
    getSessionStorage: (key: string) => {
      return getStorage("sessionStorage", key);
    },
    removeSessionStorage: (key: string) => {
      removeStorage("sessionStorage", key);
    },
  };
  return micoDb;
};

const micoDb = createMicoDb();

export default micoDb;
