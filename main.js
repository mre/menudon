const { app, session, Menu, Tray } = require("electron");
const { menubar } = require("menubar");
const path = require("path");

app.on("ready", () => {
  "use strict";

  const iconPath = path.join(__dirname, "assets", "light.png");
  const tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { role: "about" },
    { type: "separator" },
    { role: "quit" },
  ]);

  const mb = menubar({
    tray,
    dir: __dirname + "/app",
    browserWindow: {
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
    tray.on("right-click", () => {
      mb.hideWindow();
      mb.tray.popUpContextMenu(contextMenu);
    });
  });
});
