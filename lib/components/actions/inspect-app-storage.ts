import { createStore } from 'redux';

const initial = {
  shortlived: {
    version: 0,
  },
  persistent: {
    'debug:counter': { val: 0 }
  }
};

export const storage = createStore((state, { type }, value) => {
  if (!state) state = { ...initial.shortlived, ...initial.persistent };

  switch (type) {
    // ?
    case 'storage:sync':
      state = { ...state, ...value };
      break;

    // ?
    case 'counter:inc':
      state['debug:counter'].val += 1;
      break;
    case 'counter:dec':
      state['debug:counter'].val -= 1;
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

  storage.dispatch({ type: 'storage:sync' }, sta);

  // ? remove stale values
  for (const k in cur) {
    if (Object.prototype.hasOwnProperty.call(cur, k)) {
      if (k in initial.shortlived || k in initial.persistent) continue;
      localStorage.removeItem(k);
    }
  }
}


// ? clear; when version changed
if (initial.shortlived.version != storage.getState().version) {
  globalThis.localStorage.clear();
  globalThis.localStorage.setItem('version', initial.shortlived.version);
};

storageChanged({ force: true });
globalThis.addEventListener('storage', storageChanged);

storage.subscribe(() => {
  const cur = globalThis.localStorage;
  const sta = storage.getState();

  // ? set values
  for (const k in sta) {
    if (k in initial.shortlived) continue;

    const pla = JSON.stringify(sta[k]);
    const val = cur.getItem(k);

    if (val != pla) {
      globalThis.localStorage.setItem(k, pla);
    }
  }
});
