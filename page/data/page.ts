export type PageList = Record<string, Page>;
export type Page = {
  name: string;
  short_name: string;
  description: string;
  og: {
    locale: string; //
    title: string;
    image: string;
    description: string;
    url: string;
  };
};

export const PAGE = (() => {
  const list: PageList = {};
  const page: Page = {
    name: 'Inspect',
    short_name: 'Inspect',
    og: {
      locale: 'en-NL',
      title: 'Inspect',
      image: '/assets/banner/1200w/page.png',
      description: 'A interactive viewer to test, compare, and export graphics.',
      url: '/inspect/',
    },
  };

  list['_app'] = { ...page };
  list['_404'] = { ...page, name: `${page.name} - 404` };

  return list;
})();
