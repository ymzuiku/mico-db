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
}

function onChangeCb(db: any, _get: any, key: string) {
  if (db.onChange) {
    _get(key).then((all: any) => {
      const next = JSON.stringify(all);
      if (db.lastOnChange !== next) {
        db.onChange(all);
      }
      db.lastOnChange = next;
    });
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

const caches = {} as { [key: string]: any };

export interface CollectionUpdateOpt<T> {
  $set?: Partial<T & BaseColl>;
}

export const collection = <T extends BaseColl>(
  key: string,
  opt: CollectionOptions<T>
) => {
  const _get = async (key: string) => {
    if (caches[key]) {
      return caches[key];
    }
    const data = await opt.get(key);
    caches[key] = data;
    return caches[key];
  };

  const _set = async (key: string, value: any) => {
    if (!caches[key]) {
      await _get(key);
    }
    caches[key] = value;
    await opt.set(key, value);
  };

  const initColl = async <T>(key: string): Promise<T[]> => {
    let coll = (await _get(key)) as any[];
    if (!coll) {
      coll = [];
      _set(key, coll);
    }
    return coll;
  };

  const db = {
    onChange: (void 0 as any) as void | ((dataList: T[]) => any),
    index: async (index: number, sort = opt.sort) => {
      let coll = await initColl<T>(key);
      if (opt.init && coll.length === 0) {
        await db.insertOne(opt.init);
      }
      coll = sortFn(sort, coll);
      return coll[index];
    },
    count: async () => {
      const coll = await initColl<T>(key);
      return coll.length;
    },
    find: async (
      filter?: Partial<T> | ((val: T) => any),
      sort = opt.sort
    ): Promise<T[]> => {
      let coll = await initColl<T>(key);

      if (opt.init && coll.length === 0) {
        await db.insertOne(opt.init);
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
    findOne: async (filter?: Partial<T> | ((val: T) => any)): Promise<T> => {
      const coll = await initColl<T>(key);
      if (opt.init && coll.length === 0) {
        await db.insertOne(opt.init);
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
    deleteMany: async (filter?: Partial<T>): Promise<T[]> => {
      if (!filter) {
        filter = {};
      }
      const coll = await initColl<T>(key);
      const keys = Object.keys(filter);
      if (keys.length === 0) {
        await _set(key, []);
        onChangeCb(db, _get, key);
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
      await _set(key, next);
      onChangeCb(db, _get, key);
      return out;
    },
    deleteOne: async (filter?: Partial<T>): Promise<T | undefined> => {
      if (!filter) {
        filter = {};
      }
      const coll = await initColl<T>(key);
      const keys = Object.keys(filter);
      if (keys.length === 0) {
        const del = coll.shift();
        await _set(key, coll);
        onChangeCb(db, _get, key);
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
      await _set(key, next);
      onChangeCb(db, _get, key);
      return del;
    },
    updateOne: async (
      filter: Partial<T & BaseColl>,
      { $set }: CollectionUpdateOpt<T>
    ): Promise<(T & BaseColl) | undefined> => {
      const coll = await initColl<T>(key);
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

      await _set(key, coll);
      onChangeCb(db, _get, key);
      return out;
    },
    updateMany: async (
      filter: Partial<T & BaseColl>,
      { $set }: CollectionUpdateOpt<T>
    ): Promise<T[]> => {
      const coll = await initColl<T>(key);
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
      await _set(key, coll);
      onChangeCb(db, _get, key);
      return out;
    },
    insertOne: async (data: Partial<T>) => {
      const coll = await initColl<T>(key);
      if (!data._id) {
        data._id = nanoid();
      }
      coll.push(data as any);
      await _set(key, coll);
      onChangeCb(db, _get, key);
      return coll;
    },
    insertMany: async (dataList: Partial<T>[]) => {
      const coll = await initColl<T>(key);
      dataList.forEach((v) => {
        if (!v._id) {
          v._id = nanoid();
        }
        coll.push(v as any);
      });
      await _set(key, coll);
      onChangeCb(db, _get, key);
      return coll;
    },
    removeDuplicatie: async (key: string): Promise<T[]> => {
      const coll = await initColl<T>(key);
      const out = [] as T[];
      const set = new Set();
      for (let index = 0; index < coll.length; index++) {
        const item = coll[index] as any;
        const val = item[key];
        if (val === void 0) {
          out.push(item);
          continue;
        }
        if (!set.has(val)) {
          set.add(val);
          out.push(item);
        }
      }
      await _set(key, out);
      onChangeCb(db, _get, key);
      return out;
    },
    setAll: async (dataList: Partial<T>[]): Promise<void> => {
      await _set(key, dataList);
      onChangeCb(db, _get, key);
    },
  };

  return db;
};
