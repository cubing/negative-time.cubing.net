export const year = 2019;

export const data = `Timestamp,Name,Country Where You Participated,Event,Result,Comment (optional),Video URL (optional),Solve Reconstruction (optional)
---,Janelle Tin,USA,3x3x3 One-Handed,"-59min, 39.54sec",,,
---,Daniel Chan,USA,3x3x3 One-Handed,"-59min, 39.96sec",Not my best but was fun to do this again after so long. Thanks Jan and Cal!,,
---,Nathan P,USA,3x3x3 Speedsolve,-59min 33sec,,,
---,Chris Hardwick,USA,3x3x3 Speedsolve,"-59min, 46.01sec",Very happy with this time considering I am soooo tired after setting my alarm and did absolutely no warm-up.,,
---,Calvin Le,USA,3x3x3 Speedsolve,"-59min, 39.31sec","Speedcubing for 10 years, first time.",,
---,Devin Corr-Robinett,USA,3x3x3 Speedsolve,"-59min, 47.64sec",,,
---,Brandon Harnish,USA,3x3x3 Speedsolve,"-59min, 42.67sec",,,
---,Jeremy Fleischman,USA,3x3x3 Speedsolve,"-59min, 47.2sec",Messed up cross. So sleepy this year :(,,
---,Vincent Sheu,USA,3x3x3 Speedsolve,"-59min, 46.46sec",,,
---,Nicholas Mckee,USA,3x3x3 Speedsolve,-59min 47.71sec,,,
---,Nicholas McKee,USA,Clock,-59min 42.98sec,lol,,
---,Nicholas McKee,USA,3x3 Blindfolded,-55min 21.56sec,went extra safe for this solve,,
---,Lucas Garron,USA,3x3x3 Speedsolve,"-59 min, 46.17sec",+2 😬,https://www.youtube.com/watch?v=0YN0uQCSldY,"x2' R' U r R' U' x U' l2' // Cross
U R' U R y R' U2' R // Slot 1
R U2' R' U' R U R' // Slot 2
y' U y' U2' R' U R U' R' U' R // Slot 3
U' r U' r' U2' r U r' U2' R U R' // ELS
y' U R' U' R U R' U' R U R' U' R // CLS
R' U R' U' R D' R' D R' U D' R2 U' R2' D R3 // PLL (+2)"`;

export const eventData: Record<
  string,
  { code: string; scrambleString?: string }
> = {
  "3x3x3 Speedsolve": {
    code: "333",
    scrambleString: "D F D2 R' D' L U' R' F' B' R' U2 L' B2 R' B2 R2 D2 R",
  },
  "3x3x3 One-Handed": {
    code: "333oh",
  },
  "3x3 Blindfolded": {
    code: "333bf",
  },
  "Square-1": {
    code: "sq1",
  },
  Clock: {
    code: "clock",
  },
};
