// @ts-ignore
import { parse } from "csv-parse/browser/esm/sync";
import { eventInfo } from "cubing/puzzles";
import { TwistyPlayer } from "cubing/twisty";
import { data, eventData } from "./data/data";

enum FieldName {
  Name = "Name",
  Event = "Event",
  Country = "Country Where You Participated",
  Result = "Result",
  Comment = "Comment (optional)",
  Reconstruction = "Solve Reconstruction (optional)",
  VideoURL = "Video URL (optional)",
  Timestamp = "Timestamp",
}

type Row = Record<FieldName, string>;

const parsed: Row[] = parse(data, {
  columns: true,
});

const by_event: Record<string, Row[]> = {};
for (const event in eventData) {
  by_event[event] = [];
}

for (const row of parsed) {
  const event = row.Event;
  if (!by_event[event]) {
    console.log("Unknown event", event, by_event);
  }
  // by_event[event] ||= [];
  by_event[event].push(row);
}

function centiseconds(result: string): number {
  try {
    const match = result.match(
      "-([0-9]+) *min *,? *([0-9]+(\\.[0-9]+)?) *s(ec)?",
    );
    if (!match) {
      throw new Error("No match!");
    }
    const [_, min, sec] = match;
    return -(
      Number.parseInt(min, 10) * 60 * 100 +
      Math.round(Number.parseFloat(sec) * 100)
    );
  } catch (e) {
    console.log(result);
    throw e;
  }
}

function format_centiseconds(result: number): string {
  if (result >= 0) {
    throw "Non-negative time?!!?";
  }
  const neg_result = -result;
  const neg_centiminutes = Math.floor(neg_result / (60 * 100));
  const neg_seconds = Math.floor((neg_result / 100) % 60);
  const neg_centiseconds = Math.floor(neg_result % 100);
  return `-${neg_centiminutes}min, ${neg_seconds}.${neg_centiseconds
    .toString()
    .padStart(2, "0")}sec`;
}

async function main() {
  const root = document.body;
  root.innerHTML = "";
  const tableRoot = root.appendChild(document.createElement("div"));
  for (const [event, rows] of Object.entries(by_event)) {
    if (rows.length === 0) {
      continue;
    }
    // TODO: handle ties
    const sorted_rows = rows.sort(
      (a, b) => centiseconds(a.Result) - centiseconds(b.Result),
    );

    const anyRowHasField = (fieldName: string): boolean => {
      for (const row of rows) {
        if (row[fieldName] !== "") {
          console.log(fieldName, row);
          return true;
        }
      }
      return false;
    };
    const anyRowHasVideoURL = anyRowHasField(FieldName.VideoURL);
    const anyRowHasReconstruction = anyRowHasField(FieldName.Reconstruction);

    const eventID = eventData[event].code;

    const section = tableRoot.appendChild(document.createElement("section"));
    section.id = `results-${eventID}`;

    const h2 = section.appendChild(document.createElement("h2"));
    const h2Link = document.createElement("a");
    h2Link.textContent = "🔗";
    h2Link.classList.add("section-link");
    h2Link.href = `#results-${eventID}`;
    // <a class="section-link" href="#results">🔗</a>
    h2.append(h2Link);
    h2.append(" ");
    if (eventID === "minx") {
      const nega = h2.appendChild(document.createElement("span"));
      nega.textContent = "Nega";
      nega.setAttribute("style", "font-variant: small-caps;");
      h2.append("minx");
      h2.append("*");
      section.appendChild(document.createElement("p")).textContent =
        "*Note: Negaminx is just like Megaminx, but solved in negative time.";
    } else {
      h2.append(event); // TODO: ID
    }

    const table = section.appendChild(document.createElement("table"));

    const thead = table.appendChild(document.createElement("thead"));
    const theadTr = thead.appendChild(document.createElement("tr"));
    theadTr.appendChild(document.createElement("td")).append("Rank");
    theadTr.appendChild(document.createElement("td")).append("Name");
    theadTr.appendChild(document.createElement("td")).append("Country");
    theadTr.appendChild(document.createElement("td")).append("Negative Time");
    if (anyRowHasVideoURL) {
      theadTr.appendChild(document.createElement("td")).append("🎥");
    }
    if (anyRowHasReconstruction) {
      theadTr.appendChild(document.createElement("td")).append("▶️");
    }
    theadTr.appendChild(document.createElement("td")).append("Comment");

    const tbody = table.appendChild(document.createElement("tbody"));
    let rank = 0;

    for (const row of sorted_rows) {
      const tr = tbody.appendChild(document.createElement("tr"));
      rank++;

      const newTD = (): HTMLTableCellElement =>
        tr.appendChild(document.createElement("td"));

      newTD().append(rank.toString());
      newTD().append(row.Name);
      newTD().append(row[FieldName.Country]);
      const formattedResult = format_centiseconds(centiseconds(row.Result));
      newTD().append(formattedResult);
      if (anyRowHasVideoURL) {
        const videoTD = newTD();
        const videoURL = row[FieldName.VideoURL];
        if (videoURL !== "") {
          const a = videoTD.appendChild(document.createElement("a"));
          a.href = videoURL;
          const span = a.appendChild(document.createElement("span"));
          span.title = "Video";
          span.textContent = "🎥";
        }
      }
      if (anyRowHasReconstruction) {
        const reconstructionTD = newTD();
        const reconstructionString = row[FieldName.Reconstruction];
        if (reconstructionString !== "") {
          const a = reconstructionTD.appendChild(document.createElement("a"));
          console.log(
            eventData[event].scrambleString,
            reconstructionString,
            event,
          );
          const info = eventInfo(eventData[event].code);
          if (!info) {
            throw new Error(
              `No event info for event: ${eventData[event].code}`,
            );
          }
          const player = new TwistyPlayer({
            experimentalSetupAlg: eventData[event].scrambleString,
            alg: reconstructionString,
            puzzle: info.puzzleID,
          });
          a.href = await player.experimentalModel.twizzleLink();
          console.log(a.href, reconstructionString);
          // algCubingNetLink({
          //   setup: algParse(eventData[event].scrambleString), // TODO
          //   alg: algParse(reconstructionString),
          //   title: `${row.Name}\nNegative Time Solve ${year}\n${formattedResult}`,
          // });
          const span = a.appendChild(document.createElement("span"));
          span.title = "Reconstruction";
          span.textContent = "▶️";
        }
      }
      newTD().append(row[FieldName.Comment]);
    }
  }

  const button = document.createElement("button");
  root.prepend(button);
  button.textContent = "Copy";
  button.addEventListener("click", () => {
    navigator.clipboard.writeText(
      new XMLSerializer().serializeToString(tableRoot),
    );
    button.textContent = "Copied!";
  });
}
main();
