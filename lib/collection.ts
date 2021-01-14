const getId = () => {
  return "u" + Date.now() + Math.random();
};

export interface BaseColl {
  _id?: string;
}

export interface ProxyCollection<T extends BaseColl> {
  onChange?: (dataList: T[]) => any;
  find?: (filter: Partial<T>, data: T[]) => any;
  findOne?: (filter: Partial<T>, data?: T) => any;
  deleteOne?: (filter: Partial<T>, data?: T) => any;
  deleteMany?: (filter: Partial<T>, data: T[]) => any;
  updateOne?: (
    filter: Partial<T>,
    inputData: Partial<T>,
    returnData?: T
  ) => any;
  updateMany?: (
    filter: Partial<T>,
    inputData: Partial<T>,
    returnData: T[]
  ) => any;
  insertOne?: (inputData: Partial<T>) => any;
  insertMany?: (inputList: Partial<T>[]) => any;
  removeDuplicatie?: (key: string, returnData: T[]) => any;
}

export interface CollectionOptions<T extends BaseColl> {
  type?: "sessionStorage" | "indexedDB" | "localStorage";
  init?: T;
  sort?: { [key: string]: number };
  proxy?: ProxyCollection<T>;
  set: (key: string, value: any) => void | Promise<void>;
  get: (key: string) => T[] | Promise<T[]>;
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

export const collection = <T extends BaseColl>(
  key: string,
  opt: CollectionOptions<T>
) => {
  if (!opt.proxy) {
    opt.proxy = {};
  }
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
    proxy: opt.proxy,
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

      if (opt.proxy!.find) {
        await Promise.resolve(opt.proxy!.find(filter as any, out));
      }
      // if (opt.proxy!.onChange) {
      //   const all = await _get(key);
      //   await Promise.resolve(opt.proxy!.onChange(all));
      // }
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
      if (opt.proxy!.findOne) {
        await Promise.resolve(
          opt.proxy!.findOne(filter as any, (out || {}) as any)
        );
      }
      // if (opt.proxy!.onChange) {
      //   const all = await _get(key);
      //   await Promise.resolve(opt.proxy!.onChange(all));
      // }
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
        if (opt.proxy!.deleteMany) {
          await Promise.resolve(opt.proxy!.deleteMany(filter!, coll));
        }
        if (opt.proxy!.onChange) {
          const all = await _get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
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
      if (opt.proxy!.deleteMany) {
        await Promise.resolve(opt.proxy!.deleteMany(filter, out));
      }
      if (opt.proxy!.onChange) {
        const all = await _get(key);
        await Promise.resolve(opt.proxy!.onChange(all));
      }
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
        if (opt.proxy!.deleteOne) {
          await Promise.resolve(opt.proxy!.deleteOne(filter!, del));
        }
        if (opt.proxy!.onChange) {
          const all = await _get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
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
      if (opt.proxy!.deleteOne) {
        await Promise.resolve(opt.proxy!.deleteOne(filter, del));
      }
      if (opt.proxy!.onChange) {
        const all = await _get(key);
        await Promise.resolve(opt.proxy!.onChange(all));
      }
      return del;
    },
    updateOne: async (
      filter: Partial<T & BaseColl>,
      data: Partial<T & BaseColl>
    ): Promise<(T & BaseColl) | undefined> => {
      const coll = await initColl<T>(key);
      const keys = Object.keys(filter);

      let out: T | undefined;
      if (keys.length === 0) {
        coll[0] = Object.assign(coll[0] || {}, data);
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
            Object.assign(item, data);
            out = item;
            break;
          }
        }
      }

      await _set(key, coll);
      if (opt.proxy!.updateOne) {
        await Promise.resolve(opt.proxy!.updateOne(filter, data, out));
      }
      if (opt.proxy!.onChange) {
        const all = await _get(key);
        await Promise.resolve(opt.proxy!.onChange(all));
      }
      return out;
    },
    updateMany: async (
      filter: Partial<T & BaseColl>,
      data: Partial<T & BaseColl>
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
          Object.assign(item, data);
          out.push(item);
        }
      }
      await _set(key, coll);
      if (opt.proxy!.updateMany) {
        await Promise.resolve(opt.proxy!.updateMany(filter, data, out));
      }
      if (opt.proxy!.onChange) {
        const all = await _get(key);
        await Promise.resolve(opt.proxy!.onChange(all));
      }
      return out;
    },
    insertOne: async (data: Partial<T>) => {
      const coll = await initColl<T>(key);
      if (!data._id) {
        data._id = getId();
      }
      coll.push(data as any);
      await _set(key, coll);
      if (opt.proxy!.insertOne) {
        await Promise.resolve(opt.proxy!.insertOne(data));
      }
      if (opt.proxy!.onChange) {
        const all = await _get(key);
        await Promise.resolve(opt.proxy!.onChange(all));
      }
      return coll;
    },
    insertMany: async (dataList: Partial<T>[]) => {
      const coll = await initColl<T>(key);
      dataList.forEach((v) => {
        if (!v._id) {
          v._id = getId();
        }
        coll.push(v as any);
      });
      await _set(key, coll);
      if (opt.proxy!.insertMany) {
        await Promise.resolve(opt.proxy!.insertMany(dataList));
      }
      if (opt.proxy!.onChange) {
        const all = await _get(key);
        await Promise.resolve(opt.proxy!.onChange(all));
      }
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
      if (opt.proxy!.removeDuplicatie) {
        await Promise.resolve(opt.proxy!.removeDuplicatie(key, out));
      }
      if (opt.proxy && opt.proxy.onChange) {
        const all = await _get(key);
        await Promise.resolve(opt.proxy.onChange(all));
      }
      return out;
    },
    set: async (dataList: Partial<T>[]): Promise<void> => {
      await _set(key, dataList);
      if (opt.proxy!.onChange) {
        const all = await _get(key);
        await Promise.resolve(opt.proxy!.onChange(all));
      }
    },
  };
  return db;
};
