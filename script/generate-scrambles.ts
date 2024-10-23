import { rm } from "node:fs/promises";
import { join } from "node:path";
import { file, write } from "bun";
import { twizzleEvents } from "cubing/puzzles";
import { randomScrambleForEvent } from "cubing/scramble";

const allScrambles: Record<string, string[]> = {};

const outputDir = "./dist/scrambles";

rm(outputDir, { recursive: true, force: true });

for (const [event, info] of Object.entries(twizzleEvents)) {
  try {
    console.log(`[${info.eventName}] Generating…`);
    const numScrambles = event === "333mbf" ? 100 : 1;
    const eventScrambles: string[] = [];
    for (let i = 0; i < numScrambles; i++) {
      eventScrambles.push((await randomScrambleForEvent(event)).toString());
    }
    write(
      file(join(outputDir, `${info.eventName}.txt`)),
      eventScrambles.join("\n////////\n"),
    );
    allScrambles[event] = eventScrambles;
  } catch (e) {
    if (e.toString().includes("unsupported event")) {
      continue;
    }
    throw e;
  }
}

write(
  file(join(outputDir, "scrambles.json")),
  JSON.stringify(allScrambles, null, "  "),
);
