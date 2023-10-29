import { MiddlewareHandlerContext, Status } from '$fresh/server.ts';
import { message_response } from './_404.ts';

// ?
export const DEPLOY_INSTANCE = //
  Deno.env.get('DENO_DEPLOYMENT_ID') || '@no-deployment-id';
export const DEPLOY_PROXY_AUTHORIZATION = //
  Deno.env.get('PROXY_AUTHORIZATION') || '@no-proxy-authorization';

// ? known request origins
export const ORIGIN_HOSTNAME = 'applic.dev';

export function handler(
  req: Request,
  ctx: MiddlewareHandlerContext,
): Promise<Response> | Response {
  const req_url = new URL(req.url);
  // const req_host = (new URL(req.url).host || '@no-host').split(':')[0];

  const is_pathed = //
    req_url.pathname.startsWith('/inspect') ||
    req_url.pathname.startsWith('/robots.txt');

  const is_authed = DEPLOY_INSTANCE === '@no-deployment-id' || ( //
    DEPLOY_PROXY_AUTHORIZATION !== '@no-proxy-authorization' &&
    DEPLOY_PROXY_AUTHORIZATION === (
      req.headers.get('Authorization') || //
      '@no-proxy-authorization'
    )
  );

  if (!is_authed) {
    // ? proxy requests to host namespace; when running locally
    const url = new URL(`.${req_url.pathname}`, `https://${ORIGIN_HOSTNAME}`);
    url.search = req_url.search;

    // ? forward host requests to host namespace
    return new Response(null, {
      status: Status.TemporaryRedirect,
      headers: { location: url.href },
    });
  }

  if (!is_pathed) {
    // ? proxy requests to host namespace; when running locally
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

  return ctx.next();
}
