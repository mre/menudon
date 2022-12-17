const { login } = require("masto");
const fs = require("fs");

const showOverlay = (text) => {
  document.getElementById("overlay").innerHTML = text;
  document.getElementById("overlay").style.display = "block";
};

const configPath = `${process.env.HOME}/.config/menudon/config.json`;
let config = null;

// check if the config file exists
if (!fs.existsSync(configPath)) {
  // Show overlay
  showOverlay(
    `Please create a config.json file at ${configPath} and restart the app`
  );
}

// read access token from file
try {
  config = JSON.parse(fs.readFileSync(configPath, "utf8"));
} catch (err) {
  showOverlay(`Cannot parse config.json file: ${err}`);
}

// Open Mastodon in the default browser
const openMastodon = () => {
  const { shell } = require("electron");
  shell.openExternal(config.instance);
};

const submit = async () => {
  try {
    const status = document.getElementById(
      "autosuggest-textarea__textarea"
    ).value;

    if (status && status.length > 0) {
      const masto = await login({
        url: config.instance,
        accessToken: config.token,
      });

      await masto.statuses.create({
        status: status,
        visibility: "public",
      });

      // Clear the text area and hide the window
      document.getElementById("autosuggest-textarea__textarea").value = "";
    }
    // catch and print any errors
  } catch (err) {
    console.log(err);
  }
};
