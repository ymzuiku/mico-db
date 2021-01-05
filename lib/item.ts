export interface Item<T> {
  merge: (key: string, value: any) => void;
  set: (key: string, value: any) => void;
  get: (key: string) => T;
}

export interface ItemOptions<T> {
  init?: (data: T) => any;
  type?: "sessionStorage" | "localStorage";
  set: (key: string, value: any) => void;
  get: (key: string) => T;
}

export const CreateItem = <T>(opt: ItemOptions<T>): Item<T> => {
  const out = {
    get: (key: string): T => {
      return opt.get(key);
    },
    set: (key: string, data: Partial<T>) => {
      opt.set(key, data);
    },
    merge: (key: string, data: Partial<T>) => {
      const old = opt.get(key);
      const next = { ...old, ...data };
      opt.set(key, next);
    },
  };
  return out;
};
