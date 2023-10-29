import { Handler, Status } from '$fresh/server.ts';
import { DEPLOY_INSTANCE, DEPLOY_PROXY_AUTHORIZATION } from './_middleware.ts';
import { ORIGIN_HOSTNAME } from './_middleware.ts';

type StaticMessage = {
  headers?: Headers;
  code?: Status;
  type?: null | 'application/json' | 'text/html';
};

export function message_response({ code }: StaticMessage): Response {
  return new Response(null, { status: code || Status.NotFound });
}

export const handler: Handler = (req: Request) => {
  const req_url = new URL(req.url);

  if (
    req_url.pathname.startsWith('/inspect/assets') ||
    req_url.pathname.startsWith('/inspect/locals')
  ) {
    const url = new URL(`.${req_url.pathname}`, `https://${ORIGIN_HOSTNAME}`);
    url.search = req_url.search;

     return fetch(url, {
      method: 'GET', //
      redirect: 'manual',
    }).catch((_) => {
      return message_response({
        headers: req.headers,
        code: Status.NotFound,
      });
    });
  }

  return message_response({
    headers: req.headers,
    code: Status.NotFound,
  });

  // // ? forward any subpaths 404
  // const req_url = new URL(req.url);

  // if (!req_url.pathname.startsWith('/inspect')) {
  //   const url = new URL(`.${req_url.pathname}`, `https://${ORIGIN_HOSTNAME}`);
  //   const headers = new Headers(req.headers);

  //   url.search = req_url.search;
  //   headers.set('Host', url.hostname);
  //   headers.set('Authorization', DEPLOY_PROXY_AUTHORIZATION);

  //   if (DEPLOY_INSTANCE !== '@no-deployment-id') {
  //     return new Response(null, {
  //       status: Status.TemporaryRedirect,
  //       headers: { location: url.href },
  //     });
  //   }

  //   return fetch(url, {
  //     method: 'GET',
  //     headers,
  //     redirect: 'manual',
  //   }).catch((_) => {
  //     return message_response({
  //       headers: req.headers,
  //       code: Status.NotFound,
  //     });
  //   });
  // }

  // // ?
  // const url = new URL(`./cdn`, `https://${ORIGIN_HOSTNAME}`);
  // const headers = new Headers(req.headers);

  // headers.set('Host', url.hostname);
  // headers.set('Authorization', DEPLOY_PROXY_AUTHORIZATION);

  // return fetch(url, {
  //   method: 'GET',
  //   headers,
  //   redirect: 'manual',
  // }).catch((_) => {
  //   return message_response({
  //     headers: req.headers,
  //     code: Status.NotFound,
  //   });
  // });
};
