import { resolve } from 'https://deno.land/std@0.149.0/path/mod.ts';

const STATIC_INSPECT_PATH = resolve(Deno.cwd(), `./static/inspect/twitch-elements/index.html`);
const STATIC_INSPECT = await Deno.readTextFile(STATIC_INSPECT_PATH);

export const handler = () => {
  return new Response(STATIC_INSPECT, {
    headers: { 'content-type': 'text/html' },
  });
};
