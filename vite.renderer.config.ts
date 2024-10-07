import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /@fontinalia-constants\//, replacement: "/src/constants/" },
      { find: /@fontinalia-renderer\//, replacement: "/src/renderer/" },
      { find: /@fontinalia-remotion\//, replacement: "/src/remotion/" },
      { find: /@fontinalia-schema\//, replacement: "/src/schema/" },
      { find: /@fontinalia-shared\//, replacement: "/src/shared/" },
    ],
  },
});
