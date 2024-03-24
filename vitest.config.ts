import {defineConfig} from "vitest/config";
import codspeedPlugin from "@codspeed/vitest-plugin";

export default defineConfig({
  plugins: [codspeedPlugin()],
  test: {
    globals: true,
    sequence: {
      hooks: "list",
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"],
    },
  },
});
