/** @jsx h */
/** @jsxFrag Fragment */
import { ComponentChildren, Fragment, h } from 'preact';
import { Head } from '$fresh/runtime.ts';

export type Props = {
  children: ComponentChildren;
  title?: string;
  name?: string;
  description?: string;
};

export const Container = ({ children, ...customMeta }: Props) => {
  return (
    <>
      <Seo {...customMeta} />
      {children}
    </>
  );
};

const Seo = ({ ...customMeta }) => {
  const meta = {
    title: 'Untitled',
    description: '',
    ...customMeta,
  };

  return (
    <Head>
      <meta content='index, follow' name='robots' />
      <meta content='width=device-width, initial-scale=1, user-scalable=no' name='viewport' />

      {/*  */}
      <title>{meta.title}</title>
      <meta content={meta.description} name='description' />
      {/* <meta content='null' name='keywords' /> */}
      {/*  */}

      {/*  */}
      <link href='/inspect/assets/images/72w/page.png' rel='icon' />
      <link href='/inspect/assets/images/192w/page.png' rel='apple-touch-icon' />
      {/*  */}

      {/*  */}
      <meta content='#f6f6f7' name='theme-color' />
      <meta content='#f6f6f7' name='theme-color' media='(prefers-color-scheme: light)' />
      <meta content='#171b22' name='theme-color' media='(prefers-color-scheme: dark)' />
      <link href='/inspect/page.webmanifest' rel='manifest' />
      {/*  */}

      {/*  */}
      <meta content='en-NL' property='og:locale' />
      <meta content='/inspect/assets/banner/1200w/page.png' property='og:image' />
      <meta content={meta.title} property='og:title' />
      <meta content='/inspect/' property='og:url' />
      <meta content={meta.description} property='og:description' />
      <meta content='summary_large_image' property='twitter:card' />
      {/*  */}

      {/*  */}
      <link rel='stylesheet' href='./assets/stylesheets/fonts/BreezeSans.css' />
      <link rel='stylesheet' href='./assets/stylesheets/pattern.css' />
      {/*  */}
    </Head>
  );
};