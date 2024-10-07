import { BaseWindow, BrowserWindow, dialog, MenuItem } from "electron";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import http from "node:http";
import { serve } from "micro";
import handler from "serve-handler";
import { ipcMain } from "@fontinalia-shared/ipcs";
import { CompositionProps } from "@fontinalia-remotion/components/metadata/Composition/schema";

const { invoke } = ipcMain;
let server: http.Server | null = null;

export const openProjectHandler = async (item: MenuItem, window?: BaseWindow) => {
  const ret = await dialog.showOpenDialog({
    title: "Open Project",
    filters: [{ name: "Fontinalia Project", extensions: ["json"] }],
    properties: ["openFile"],
  });

  if (ret.canceled) {
    return;
  }

  const path = ret.filePaths[0];

  try {
    const data = await readFile(path, "utf-8");
    const json = JSON.parse(data);
    const composition = await CompositionProps.safeParseAsync(json);
    if (composition.success) {
      if (!existsSync(composition.data.metadata.workingDirectory)) {
        return;
      }

      if (server) {
        server.close();
      }

      server = http
        .createServer(
          serve((req, res) => {
            return handler(req, res, { public: composition.data.metadata.workingDirectory });
          }),
        )
        .listen(9271, "localhost");

      await invoke.openProject(BrowserWindow.getFocusedWindow()!, composition.data);
    }
  } catch (error) {
    console.error(error);
  }
};
