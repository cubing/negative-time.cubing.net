export const year = 2021;

export const data = `Timestamp,Name,Country Where You Participated,Event,Result,Comment (optional),Video URL (optional),Solve Reconstruction (optional)
10/30/2021 19:02:13,Devin Corr-Robinett,Portugal,3x3x3 Speedsolve,"-59min, 49.10sec",,,
10/31/2021 13:09:48,Vlad Hordiienko,Ukraine ,3x3x3 Speedsolve,"-59min, 49.38sec",good first pair,,
11/6/2021 23:04:13,Chris Hardwick,USA,3x3x3 Speedsolve,"-59 min, 46.39sec","This is a lot harder to do each year as I get older, but I still enjoy it!",,
11/6/2021 23:07:00,Tyler Farr,USA,3x3x3 Speedsolve,"-59min, 47.313sec",,,
11/7/2021 0:01:18,James Quinn,USA,3x3x3 Speedsolve,"-59min, 51.92sec",,,
11/7/2021 0:04:10,Jeremy Fleischman,USA,3x3x3 Speedsolve,"-59min, 46.65sec",Hello from the Wisconsin beach. Soo sleepy.,,
11/7/2021 0:06:08,Drew Forbush,USA,3x3x3 Mirror Cube,"-57 min, 63.55 sec",My cube is missing a piece lol,,
11/7/2021 1:02:15,David Reid,USA,3x3x3 Speedsolve,"-59min, 43.41sec",,,
11/7/2021 1:02:25,Michael Kastner,USA,3x3x3 Speedsolve,"-59min, 21.14sec",,,
11/7/2021 1:02:55,Stone Amsbaugh,USA,3x3x3 Speedsolve,"-59min, 42.25sec",,,
11/7/2021 1:26:09,Lyle Lowry,USA,2x2x2,"-59min, 45.45sec",,,
11/7/2021 1:27:50,Lyle Lowry,USA,3x3x3 Speedsolve,"-59min, 13.54sec",,,
11/7/2021 1:29:52,Lyle Lowry,USA,Skewb,"-59min, 2.3sec",,,
11/7/2021 1:35:58,Lyle Lowry,USA,Pyraminx,"-58min, 41.52sec","I realized too late that I probably submitted the wrong time for pyra, this is the correct time",,
11/7/2021 1:37:42,Lyle Lowry,USA,4x4x4,"-57min, 7.72 sec",,,
11/7/2021 1:46:11,Lyle Lowry,USA,3x3x3 With Feet,"-53min, 11.69sec","Wow, I improved by roughly an hour. Now I'll definitely be ready for the next competition!",,
11/7/2021 1:48:07,Lyle Lowry,USA,5x5x5,"-49min, 20.98sec",,,
11/7/2021 1:50:39,Lyle Lowry,USA,7x7x7,"-35min, 49.38sec","My first ever sub 10, nice",,
11/7/2021 2:07:00,Lucas Garron,USA,3x3x3 Speedsolve,"-59min, 49.25sec","I was initially a little disappointed, but I think it was actually not too bad considering I got cases with some very long algs. I managed very nearly 10tps for ELS + CLS + PLL!",https://youtu.be/8jfRVfI6ki4,"D F l U' r // Cross
U' R U' R' d' R' U' R // Slot 1
U' U2' R U R' y' R U R' // Slot 2
(U' y) R U R' // Slot 3
y (U2' y) R' F R2 U R' U' F' // ELS
U' R U2' R' U2' R U' R' U R U2' R' U2' R U' R' // CLS
U' F R U' R' U' R U R' F' R U R' U' R' F R F' U' // PLL"`;

export const eventData: Record<
  string,
  { code: string; scrambleString?: string }
> = {
  "3x3x3 Speedsolve": {
    code: "333",
    scrambleString: "R' U2 R L' U' D2 F' L' B' R D' L2 D' B2 D' F2 D2 L2",
  },
  "2x2x2": {
    code: "222",
  },
  "4x4x4": {
    code: "444",
  },
  "5x5x5": {
    code: "555",
  },
  "6x6x6": {
    code: "666",
  },
  "7x7x7": {
    code: "777",
  },
  "3x3x3 Blindfolded": {
    code: "333bf",
  },
  "3x3x3 One-Handed": {
    code: "333oh",
  },
  Clock: {
    code: "clock",
  },
  Pyraminx: {
    code: "pyraminx",
  },
  Skewb: {
    code: "skewb",
  },
  "Square-1": {
    code: "sq1",
  },
  "3x3x3 With Feet": {
    code: "333ft",
  },
  "Master Magic": {
    code: "master-magic",
  },
  "Mini Guildford": {
    code: "miniguild",
  },
  "3x3x3 Mirror Cube": {
    code: "mirror",
  },
};
