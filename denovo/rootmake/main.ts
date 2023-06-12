import type { Denovo } from "https://deno.land/x/denovo_core@v0.0.5/mod.ts";

export function main(denovo: Denovo): Promise<void> {
  denovo.dispatcher = {
    "find-root"(pwd: string): Promise<string | undefined> {
      return findRoot(pwd);
    },
  };
  return Promise.resolve();
}

async function findRoot(dir: string): Promise<string | undefined> {
  for await (const entry of Deno.readDir(dir)) {
    if (entry.isFile && entry.name == "Makefile") {
      return dir;
    }
  }

  if (dir == "/") {
    return undefined;
  }

  return findRoot(await Deno.realPath(dir + "/.."));
}
