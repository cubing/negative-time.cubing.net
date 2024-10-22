import { barelyServe } from "barely-a-dev-server";

barelyServe({
  entryRoot: "src/process-responses",
  esbuildOptions: {
    minify: false,
  },
});
