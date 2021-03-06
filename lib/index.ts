import { CreateItem } from "./item";
import { collection, CollectionOptions } from "./collection";
import { nanoid } from "./nanoid";

// 创建一个区别独立 key 前缀的 MicoDb
export const MicoDb = (name = "mico-db") => {
  let db: IDBDatabase;
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
      return collection(key, {
        ...opt,
        get:
          type === "indexedDB"
            ? micoDb.get
            : type === "sessionStorage"
            ? micoDb.getSessionStorage
            : micoDb.getLocalStorage,
        set:
          type === "indexedDB"
            ? micoDb.set
            : type === "sessionStorage"
            ? micoDb.setSessionStorage
            : micoDb.setLocalStorage,
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

MicoDb.nanoid = nanoid;

export default MicoDb;
