// @ts-ignore
import parse from "csv-parse/lib/sync";
import { TwistyPlayer } from "cubing/twisty";
import { data, eventData } from "./data";

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
  const [_, min, sec] = result.match(
    "-([0-9]+) *min *,? *([0-9]+(\\.[0-9]+)?) *s(ec)?"
  );
  return -(parseInt(min, 10) * 60 * 100 + Math.round(parseFloat(sec) * 100));
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
      (a, b) => centiseconds(a.Result) - centiseconds(b.Result)
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

    const h2 = tableRoot.appendChild(document.createElement("h2"));
    h2.id = `results-${eventData[event].code}`;
    h2.append(event); // TODO: ID

    const table = tableRoot.appendChild(document.createElement("table"));

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
          console.log(eventData[event].scrambleString);
          const player = new TwistyPlayer({
            experimentalSetupAlg: eventData[event].scrambleString,
            alg: reconstructionString,
          });
          a.href = await player.experimentalModel.twizzleLink();
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
      new XMLSerializer().serializeToString(tableRoot)
    );
    button.textContent = "Copied!";
  });
}
main();
