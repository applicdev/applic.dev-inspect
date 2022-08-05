import { createStore } from 'redux';

const storageDefault = {
  version: 0,
  'debug-counter': { val: 0 },
};

export const storage = createStore((state = storageDefault, { type }, value) => {
  switch (type) {
    // ?
    case 'storage:sync':
      state = { ...state, ...value };
      break;

    // ?
    case 'counter:inc':
      state['debug-counter'].val += 1;
      break;
    case 'counter:dec':
      state['debug-counter'].val -= 1;
      break;
  }

  return state;
});

function storageChanged({ force }) {
  const cur = globalThis.localStorage;
  const sta = storage.getState();

  // ? get values
  for (const k in cur) {
    if (Object.prototype.hasOwnProperty.call(cur, k)) {
      if (!force && cur.getItem(k) == JSON.stringify(sta[k])) continue;
      if (k in sta) {
        sta[k] = JSON.parse(cur.getItem(k));
      }
    }
  }

  // ? skip; when wrong version
  if (storageDefault.version != sta.version) return;

  storage.dispatch({ type: 'storage:sync' }, sta);

  // ? remove stale values
  for (const k in cur) {
    if (Object.prototype.hasOwnProperty.call(cur, k)) {
      if (k in sta) continue;
      localStorage.removeItem(k);
    }
  }
}

globalThis.addEventListener('storage', storageChanged.bind(null, { force: false }));
storageChanged({ force: true });

storage.subscribe(() => {
  const cur = globalThis.localStorage;
  const sta = storage.getState();

  // ? set values
  for (const k in sta) {
    const pla = JSON.stringify(sta[k]);
    const val = cur.getItem(k) || 'null';

    if (val != pla) {
      globalThis.localStorage.setItem(k, pla);
    }
  }
});
