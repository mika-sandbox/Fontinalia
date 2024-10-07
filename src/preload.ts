// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { Titlebar, TitlebarColor } from "custom-electron-titlebar";

window.addEventListener("DOMContentLoaded", () => {
  new Titlebar({
    backgroundColor: TitlebarColor.fromHex("#171717"),
    menuBarBackgroundColor: TitlebarColor.fromHex("#262626"),
    menuTransparency: 0.75,
    itemBackgroundColor: TitlebarColor.fromHex("#404040"),
  });
});
