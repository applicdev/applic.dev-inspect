/** @jsx h */
/** @jsxFrag Fragment */
import { ComponentChildren, Fragment, h } from 'preact';
import { Head } from '$fresh/runtime.ts';
import { PAGE, Page } from '../../data/page.ts';

export type Props = {
  children: ComponentChildren;
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
    ...PAGE['_app'],
    ...customMeta,
  };

  return (
    <Head>
      <meta content='index, follow' name='robots' />
      {/* FIXME: fresh also adds a viewport meta node
      <meta content='width=device-width, initial-scale=1, user-scalable=no' name='viewport' /> 
      */}

      {/*  */}
      <title>{meta.name}</title>
      <meta content={meta.og.description} name='description' />
      {/*  */}

      {/*  */}
      <link href='/inspect/assets/images/72w/page.png' rel='icon' />
      <link href='/inspect/assets/images/192w/page.png' rel='apple-touch-icon' />
      {/*  */}

      {/*  */}
      <meta content='#f6f6f6' name='theme-color' />
      <meta content='#f6f6f6' name='theme-color' media='(prefers-color-scheme: light)' />
      <meta content='#171b22' name='theme-color' media='(prefers-color-scheme: dark)' />
      <link href='/inspect/page.webmanifest' rel='manifest' />
      {/*  */}

      {/*  */}
      <meta content={meta.og.locale} property='og:locale' />
      <meta content={meta.og.image} property='og:image' />
      <meta content={meta.og.title} property='og:title' />
      <meta content={meta.og.url} property='og:url' />
      <meta content={meta.og.description} property='og:description' />
      <meta content='summary_large_image' property='twitter:card' />
      {/*  */}
    </Head>
  );
};