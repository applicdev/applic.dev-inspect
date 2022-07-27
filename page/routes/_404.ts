export const handler = () => {
  return new Response(null, {
    status: 307,
    headers: { location: '/inspect/twitch-elements' },
  });
};
