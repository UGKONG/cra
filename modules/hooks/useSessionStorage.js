// 세션 스토리지 (GET, POST, PUT)
export function useSessionStorage (key = null, value) {
  if (!key || typeof(key) != 'string') return console.warn('useSession key is Null!!');
  if (!value) return window.sessionStorage[key];
  
  window.sessionStorage.setItem(key, value);
  return window.sessionStorage[key];
}

// 세션 스토리지 (DELETE)
export function useRemoveSessionStorage (key) {
  if (!key || typeof(key) != 'string') return console.warn('delSession key is Null!!');
  window.sessionStorage.removeItem(key);

  return window.sessionStorage;
}
