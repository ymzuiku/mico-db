export const createMicoDb = (name = "mico-db") => {
  let db: IDBDatabase;
  const setStorage = (type: string, key: string, obj: any) => {
    const fn = (window as any)[type];
    key = webDb.name + webDb.version + "_" + key;
    if (typeof obj === "object") {
      fn.setItem(key, JSON.stringify(obj));
    } else {
      fn.setItem(key, obj);
    }
  };
  const getStorage = (type: string, key: string) => {
    const fn = (window as any)[type];
    const obj = fn.getItem(webDb.name + webDb.version + "_" + key);
    if (obj && (obj[0] === "[" || obj[0] === "{")) {
      return JSON.parse(obj);
    }
    return obj;
  };

  const removeStorage = (type: string, key: string) => {
    const fn = (window as any)[type];
    fn.removeItem(webDb.name + webDb.version + "_" + key);
  };

  function initDb(store: string) {
    return new Promise((res) => {
      if (!db) {
        const reqDb = window.indexedDB.open(webDb.name, webDb.version);
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

  const webDb = {
    name,
    isHaveIndexedDb: typeof window.indexedDB !== "undefined",
    version: 1,
    remove: (key: string): Promise<any> => {
      return new Promise((res) => {
        if (!key) {
          return res();
        }
        if (!webDb.isHaveIndexedDb) {
          return res(webDb.removeLocalStorage(key));
        }
        const store = webDb.name + webDb.version;
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
    get: (key: string): Promise<any> => {
      return new Promise((res) => {
        if (!key) {
          return res(void 0);
        }
        if (!webDb.isHaveIndexedDb) {
          return res(webDb.getLocalStorage(key));
        }
        const store = webDb.name + webDb.version;
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
    set: (key: string, obj: any): Promise<any> => {
      return new Promise((res) => {
        if (!key) {
          return res(void 0);
        }
        if (!webDb.isHaveIndexedDb) {
          return res(webDb.setLocalStorage(key, obj));
        }
        const store = webDb.name + webDb.version;
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
  return webDb;
};

export default createMicoDb();
