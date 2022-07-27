import { resolve } from 'https://deno.land/std@0.149.0/path/mod.ts';

const STATIC_INSPECT_PATH = resolve(new URL('.', import.meta.url).pathname, `../../../static/inspect/twitch-elements/index.html`);
const STATIC_INSPECT = await Deno.readTextFile(STATIC_INSPECT_PATH).catch((err: Error) => {
  console.log('import.meta.url', new URL('.', import.meta.url).pathname);
  console.log('STATIC_INSPECT_PATH', STATIC_INSPECT_PATH);
  return err.toString();
});

export const handler = () => {
  return new Response(STATIC_INSPECT, {
    headers: { 'content-type': 'text/html' },
  });
};
