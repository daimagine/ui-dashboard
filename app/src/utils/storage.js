export function set(params) {
  const value = JSON.stringify(params.value);
  if (params.persist) {
    localStorage.setItem(params.key, value);
  } else {
    sessionStorage.setItem(params.key, value);
  }
}

export function get(key) {
  const value = localStorage.getItem(key) || sessionStorage.getItem(key);
  return JSON.parse(value);
}

export function remove(key) {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
}
