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
  const out = (data?: Partial<T>) => {
    if (data) {
      out.merge(data);
      return out.get();
    }
    return out.get();
  };
  out.get = function (): T {
    let out = opt.get(key);
    if (!out) {
      out = opt.init as any;
      opt.set(key, opt);
    }
    return out;
  } as Item<T>;
  out.set = (data: Partial<T>) => {
    opt.set(key, data);
  };
  out.merge = (data: Partial<T>) => {
    const old = opt.get(key);
    const next = { ...old, ...data };
    opt.set(key, next);
  };
  return out;
};
