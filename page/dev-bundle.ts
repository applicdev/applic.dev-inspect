const MODULE_OUT = './static/inspect';
const MODULE_IMPORTMAP = './lib/import_map.json';
const MODULE = [
  { urn: './lib/inspect.ts', out: `${MODULE_OUT}/module/page.bundle.js` }, //
];

let upt: Promise<void[]> | null = null;

function updated() {
  if (upt) return;

  upt = Promise.all(
    MODULE.map(async (par) => {
      await new Promise((r) => setTimeout(r, 500));

      const runer = await Deno.run({
        cmd: ['deno', 'bundle', '--no-check', par.urn, `--importmap=${MODULE_IMPORTMAP}`],
        cwd: '../', //
        stdout: 'piped',
        // stderr: 'null'
      });

      const out: Uint8Array = await runer.output();
      const cur: Uint8Array = await Deno.readFile(par.out).catch(() => new Uint8Array());

      if (out.toString() != cur.toString()) Deno.writeFile(par.out, out);
      upt = null;
    })
  );
}

await updated();
for await (const _ of Deno.watchFs('../lib/')) await updated();
