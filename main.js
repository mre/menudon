const { menubar } = require("menubar");

const mb = menubar({
  dir: __dirname + "/app",
  icon: "light.png",
  browserWindow: {
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  },
});

// mb.on("ready", async () => {});

// open dev tools for debugging
// mb.on("after-create-window", () => {
//   mb.window.openDevTools();
// });
