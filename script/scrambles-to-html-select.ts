import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { file } from "bun";
import { eventInfo } from "cubing/puzzles";
import { JSDOM } from "jsdom";

const YEAR = 2025;

const dom = new JSDOM("");
const { window } = dom;
const { document } = window;

console.error(`Generating scrambles for year: ${YEAR}`);

const allScrambles: Record<string, string[]> = await file(
  join("./src/static", `${YEAR}`, `scrambles-${YEAR}.json`),
).json();

const select = document.body.appendChild(document.createElement("select"));
select.style = "width: 100%;";

for (const [eventID, scrambles] of Object.entries(allScrambles)) {
  if (eventID === "333mbf") {
    continue; // TODO
  }

  const option: HTMLOptionElement = select.appendChild(
    document.createElement("option"),
  );
  const info = eventInfo(eventID);
  if (!info) {
    throw new Error(`Unknown event: ${eventID}`);
  }
  const { puzzleID, eventName } = info;
  option.setAttribute("data-puzzle", puzzleID);
  option.setAttribute("data-scramble", scrambles[0]);
  option.textContent = eventName;

  if (eventID === "fto") {
    // TODO: this should be a boolean setter, but it doesn't work in JSDOM: https://github.com/jsdom/jsdom/issues/1130
    // option.selected = true;
    option.setAttribute("selected", "");
  }
}

console.log(select.outerHTML);
