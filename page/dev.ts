#!/usr/bin/env -S deno run -A --watch=static/,routes/
import dev from '$fresh/dev.ts';

// await Deno.run({ cmd: ['deno', 'task', 'lint'] });
await Deno.run({ cmd: ['deno', 'task', 'bundle'] });

await dev(import.meta.url, './main.ts');
