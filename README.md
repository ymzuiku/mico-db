# mico-db

简易的 Web indexedDB 接口封装, 兼容 localStoage 和 sessionStorage

## API

```ts
export declare const createMicoDb: (
  name?: string
) => {
  name: string;
  isHaveIndexedDb: boolean;
  version: number;
  remove: (key: string) => Promise<any>;
  get: (key: string) => Promise<any>;
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
  remove: (key: string) => Promise<any>;
  get: (key: string) => Promise<any>;
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
