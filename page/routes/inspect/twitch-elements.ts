const FILE_URL = new URL('../../static/inspect/twitch-elements/index.html', import.meta.url).href;
const resp = await fetch(FILE_URL);

export const handler =  () => {
  return new Response(resp.body, {
    headers: { 'content-type': 'text/html' },
  });
};
