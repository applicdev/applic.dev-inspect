/** @jsx h */
import { h } from 'preact';
import { Container } from '../../components/layout/container.tsx';
import { Head } from '$fresh/runtime.ts';

const inline: string = await  (async () => {
  try {
    return await (await fetch(new URL('../../static/inspect/module/inline.bundle.js', import.meta.url))).text();
  } catch (_) {
    return '/* file missing */';
  }
})()

export default function Home() {
  return (
    <Container>
      <Head>
        {/*  */}
        <link rel='stylesheet' href='/inspect/assets/stylesheets/fonts/BreezeSans.css' />
        <style></style>
        {/*  */}

        {/*  */}
        <script defer>{inline}</script>
        <script defer src='/inspect/module/loaded.bundle.js'></script>
        <script defer src='/inspect/page.sw-register.js'></script>
        {/*  */}
      </Head>

      {/*  */}
      <page-bounds node-unresolved={true}>
        <inspect-app></inspect-app>
      </page-bounds>
      {/*  */}
    </Container>
  );
}
