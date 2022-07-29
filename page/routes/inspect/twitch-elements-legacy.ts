const FILE_URL = new URL('../../static/inspect/twitch-elements-legacy/twitch-elements-legacy.html', import.meta.url).href;
const resp = await (await fetch(FILE_URL)).arrayBuffer();

export const handler =  () => {
  return new Response(resp, {
    headers: { 'content-type': 'text/html' },
  });
};
