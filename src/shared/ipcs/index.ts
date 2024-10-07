import { createInterprocess } from "interprocess";

export const { ipcMain, ipcRenderer, exposeApiToGlobalWindow } = createInterprocess({
  main: {},
  renderer: {
    openProject: async (_, data: any) => {
      return "Hello from the renderer";
    },
  },
});
