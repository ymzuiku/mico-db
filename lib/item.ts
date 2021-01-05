export interface Item<T> {
  merge: (value: any) => void;
  set: (value: any) => void;
  get: () => T;
}

export interface ItemOptions<T> {
  init?: T;
  type?: "sessionStorage" | "localStorage";
  set: (key: string, value: any) => void;
  get: (key: string) => T;
}

export const CreateItem = <T>(key: string, opt: ItemOptions<T>): Item<T> => {
  const out = {
    get: (): T => {
      return opt.get(key);
    },
    set: (data: Partial<T>) => {
      opt.set(key, data);
    },
    merge: (data: Partial<T>) => {
      const old = opt.get(key);
      const next = { ...old, ...data };
      opt.set(key, next);
    },
  };
  return out;
};