import { emptyDir } from 'https://deno.land/std@0.78.0/fs/mod.ts';

{
  const out = './docs/.typelet/gh-pages';
  await emptyDir(`${out}`);
}

{
  const out = './docs/.typelet/gh-production';
  await emptyDir(`${out}`);
}
