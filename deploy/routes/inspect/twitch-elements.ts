import { RouteConfig, Status } from '$fresh/server.ts';

const document_html = await Deno.readTextFile(
  new URL(
    '../../../labs/inspect/twitch-elements/main.gen.html', //
    import.meta.url,
  ),
);

export const handler = (req: Request): Response => {
  return new Response(document_html, {
    status: Status.OK,
    headers: {
      "content-type": "text/html",
    },
  });
};
