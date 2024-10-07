import { Menu, MenuItemConstructorOptions } from "electron";

const template: MenuItemConstructorOptions[] = [
  {
    role: "fileMenu",
    submenu: [
      { label: "New Project" },
      { label: "Open Project" },
      { label: "Open Recent Project" },
      { label: "Close Project", enabled: false },
      { type: "separator" },
      { label: "Save Project" },
      { label: "Save Project As…" },
      { type: "separator" },
      {
        label: "Import",
        submenu: [{ label: "Import Media" }, { label: "Import Sequence" }],
      },
      { label: "Import Project" },
      { type: "separator" },
      {
        label: "Export",
        submenu: [{ label: "Export Media" }, { label: "Export Sequence" }],
      },
      { label: "Export Project" },
      { type: "separator" },
      { label: "Preferences" },
      { role: "quit" },
    ],
  },
  {
    role: "editMenu",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { label: "Cut Head" },
      { label: "Cut Tail" },
      { role: "copy" },
      { label: "Copy Head" },
      { label: "Copy Tail" },
      { role: "paste" },
      { type: "separator" },
      { label: "Duplicate" },
      { type: "separator" },
      { role: "selectAll" },
      { label: "Deselect All" },
      {
        label: "Select",
        submenu: [{ label: "Next" }, { label: "Previous" }, { label: "Above" }, { label: "Below" }],
      },
    ],
  },
  { role: "viewMenu" },
  { role: "windowMenu" },
  {
    role: "help",
    submenu: [{ label: "Online Documentation" }, { role: "about" }],
  },
];

if (process.platform === "darwin") {
  template.unshift({ role: "appMenu" });
}

export const menu = Menu.buildFromTemplate(template);
