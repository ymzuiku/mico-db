export declare const createMicoDb: (name?: string) => {
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
declare const _default: {
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
export default _default;
