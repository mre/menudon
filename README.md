# Menudon

![Screenshot](assets/screenshot.jpg)

Send toots from your menubar. Supports emoji. 🐘

## Installation

Download the latest release from the [releases page](https://github.com/mre/menudon/releases).

## Setup

Put your Mastodon credentials in `~/.config/menudon/config.json`:

```json
{
  "instance": "https://mastodon.social",
  "username": "yourusername",
  "token": "yourtoken"
}
```

You can get your token from the [Mastodon API](https://mastodon.social/settings/applications).

## Usage

Open the menubar app and write a toot.

## Development

Build and run the app:

```bash
$ npm install
$ npm start
```

## Packaging

```bash
$ npm run build
```

## Why?

Lazyness (and billionaires going berserk on Twitter).

## License

MIT

App icon by [Iconduck](https://iconduck.com/icons/1891/mastodon).
