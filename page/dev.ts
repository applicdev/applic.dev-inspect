#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from '$fresh/dev.ts';

Deno.run({ cmd: ['deno', 'run', '-A', './dev-bundle.ts'], cwd: './', stdout: 'null' });
await dev(import.meta.url, './main.ts');
