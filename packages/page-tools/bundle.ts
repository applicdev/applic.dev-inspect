import { emptyDir } from 'https://deno.land/std@0.78.0/fs/mod.ts';

{
  const out = './docs/.pagelet/gh-pages';
  await emptyDir(`${out}`);
}

{
  const out = './docs/.pagelet/gh-production';
  await emptyDir(`${out}`);
}
