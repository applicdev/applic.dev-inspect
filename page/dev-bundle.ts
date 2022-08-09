import { ensureDir } from 'https://deno.land/std/fs/mod.ts';
import { dirname } from 'https://deno.land/std/path/mod.ts';

[
  { urn: './lib/inline.ts', out: `./page/static/inspect/module/inline.bundle.js` }, //
  { urn: './lib/loaded.ts', out: `./page/static/inspect/module/loaded.bundle.js` }, //
].map(async (par) => {
  const runer = await Deno.run({
    cmd: ['deno', 'bundle', '--no-check', par.urn],
    cwd: './',
    stdout: 'piped',
    // stderr: 'null'
  });

  const out: Uint8Array = await runer.output();
  const cur: Uint8Array = (await Deno.readFile(par.out).catch(() => {})) || new Uint8Array();

  ensureDir(dirname(par.out));
  if (out.toString() != cur.toString()) Deno.writeFile(par.out, out);
});
