import { useCallback, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const setValue = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("storage"));
};

export const useLocalStorage = <T>(key: string) => {
  const set = useCallback((value: T) => setValue(key, value), [key]);
  const value = useSyncExternalStore(
    subscribe,
    () => {
      const value = window.localStorage.getItem(key);
      return value;
    },
    () => null,
  );

  return { set, value } as const;
};
