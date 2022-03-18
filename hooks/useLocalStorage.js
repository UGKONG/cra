// 로컬 스토리지 (GET, POST, PUT)
export function useLocalStorage (key = null, value) {
  if (!key || typeof(key) != 'string') return console.warn('useSession key is Null!!');
  if (!value) return window.localStorage[key];
  
  window.localStorage.setItem(key, value);
  return window.localStorage[key];
}

// 로컬 스토리지 (DELETE)
export function useRemoveLocalStorage (key) {
  if (!key || typeof(key) != 'string') return console.warn('delSession key is Null!!');
  window.localStorage.removeItem(key);

  return window.localStorage;
}