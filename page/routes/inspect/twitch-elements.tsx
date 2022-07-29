/** @jsx h */
import { h} from 'preact';
import { Container } from '../../components/layout/container.tsx';
import { Head } from '$fresh/runtime.ts';


export default function Home() {
  return (
    <Container>
      {/*  */}
      <Head>
        <script src='/inspect/module/page.bundle.js'></script>
        <script src='/inspect/page.sw-register.js'></script>
      </Head>
      {/*  */}

      {/*  */}
      <my-element></my-element>
      {/*  */}
    </Container>
  );
}
