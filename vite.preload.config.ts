import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: [
      { find: /@fontinalia-constants\//, replacement: "/src/constants/" },
      { find: /@fontinalia-main\//, replacement: "/src/main/" },
      { find: /@fontinalia-remotion\//, replacement: "/src/remotion/" },
      { find: /@fontinalia-schema\//, replacement: "/src/schema/" },
      { find: /@fontinalia-shared\//, replacement: "/src/shared/" },
    ],
  },
});
