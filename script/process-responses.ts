import { barelyServe } from "barely-a-dev-server";

await barelyServe({
  entryRoot: "src/process-responses",
  esbuildOptions: {
    minify: false,
  },
});
