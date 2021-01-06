export interface Item<T> {
  (data?: Partial<T>): T;
  merge: (value: Partial<T>) => void;
  set: (value: Partial<T>) => void;
  get: () => T;
}

export interface ItemOptions<T> {
  init?: T;
  type?: "sessionStorage" | "localStorage";
  set: (key: string, value: any) => void;
  get: (key: string) => T;
}

export const CreateItem = <T>(key: string, opt: ItemOptions<T>): Item<T> => {
  const item = (data?: Partial<T>): T => {
    if (data) {
      const old = opt.get(key);
      Object.assign(old, data);
      opt.set(key, old);
      return old;
    }
    return opt.get(key);
  };
  item.get = function (): T {
    let out = opt.get(key);
    if (!out) {
      out = opt.init as any;
      opt.set(key, out);
    }
    return out;
  } as Item<T>;
  item.set = (data: Partial<T>): T => {
    opt.set(key, data);
    return data as T;
  };
  item.merge = (data: Partial<T>): T => {
    const old = opt.get(key);
    Object.assign(old, data);
    opt.set(key, old);
    return old;
  };
  return item;
};
