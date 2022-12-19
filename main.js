const { app, session, Menu, Tray, nativeTheme } = require("electron");
const { menubar } = require("menubar");
const path = require("path");

function getTrayIcon(isDark = nativeTheme.shouldUseDarkColors) {
  // some logic to determine what icon to use
  return path.join(__dirname, `assets/icon${isDark ? "-dark" : ""}.png`);
}

app.on("ready", () => {
  "use strict";

  const iconPath = getTrayIcon();
  const tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { role: "about" },
    { type: "separator" },
    { role: "quit" },
  ]);

  const mb = menubar({
    icon: getTrayIcon(),
    tray,
    dir: __dirname + "/app",
    showDockIcon: false,
    browserWindow: {
      transparent: true,
      width: 295,
      height: 320,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    },
  });

  // open dev tools for debugging
  // mb.on("after-create-window", () => {
  //   mb.window.openDevTools();
  // });

  mb.on("ready", async () => {
    nativeTheme.on("updated", () => mb.tray.setImage(getTrayIcon()));
    tray.on("right-click", () => {
      mb.hideWindow();
      mb.tray.popUpContextMenu(contextMenu);
    });
  });
});
