const MODULE_OUT = './static/inspect';
const MODULE_IMPORTMAP = './lib/import_map.json';
const MODULE = [
  { urn: './lib/inspect.ts', out: `${MODULE_OUT}/module/page.bundle.js` }, //
];

function updated() {
  return Promise.all(
    MODULE.map(async (par) => {
      const runer = await Deno.run({
        cmd: ['deno', 'bundle', '--no-check', par.urn, `--importmap=${MODULE_IMPORTMAP}`],
        cwd: '../', //
        stdout: 'piped',
        // stderr: 'null'
      });

      const out: Uint8Array = await runer.output();
      const cur: Uint8Array = await Deno.readFile(par.out).catch(() => new Uint8Array());

      if (out.toString() != cur.toString()) Deno.writeFile(par.out, out);
    })
  );
}

await updated();
for await (const _ of Deno.watchFs('../lib/')) await updated();
