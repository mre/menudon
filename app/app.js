const { login } = require("masto");
const fs = require("fs");

// read access token from file
// ~/.config/mastodon/config.json
const config = JSON.parse(
  fs.readFileSync(`${process.env.HOME}/.config/menudon/config.json`, "utf8")
);

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
        visibility: "direct",
      });

      // Clear the text area and hide the window
      document.getElementById("autosuggest-textarea__textarea").value = "";
    }
    // catch and print any errors
  } catch (err) {
    console.log(err);
  }
};
