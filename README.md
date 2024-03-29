<div align="center">
    <img style="width: 100px" src="image/README/1702528067173.png" />
    <h3 style="text-align: center">Guardsman</h3>
</div

---
<img src="https://git.bunkerbravointeractive.com/bunker-bravo-interactive/guardsman-discord-extended/badges/master/pipeline.svg" alt="Pipeline Status" />


# Guardsman Discord Extended
<p>Guardsman is Bunker Bravo's moderation and management suite. This component (guardsman-discord-extended) is responsible for providing a Discord management interface for partnered guilds and global Bunker Bravo moderators. </p>

# Links
[Bunker Bravo Interactive Discord Server](https://discord.gg/GdgZeZNuBe)
[(INTERNAL) Guardsman Web Panel](https://guardsman.bunkerbravointeractive.com)
[Guardsman Web Repository](https://git.bunkerbravointeractive.com/bunker-bravo-interactive/guardsman-web)

# Installation
To install Guardsman Discord on your system, follow these steps:

**NOTE: Guardsman Discord Extended has only been tested on linux and win32.**

**NOTE: Guardsman Discord Extended REQUIRES a working Guardsman Web installation. Please follow the installation instructions for [Guardsman Web](https://git.bunkerbravointeractive.com/bunker-bravo-interactive/guardsman-web).**

- Clone the [Guardsman Discord Extended](https://git.bunkerbravointeractive.com/bunker-bravo-interactive/guardsman-discord-extended) repository. (ex: `git clone https://git.bunkerbravointeractive.com/bunker-bravo-interactive/guardsman-discord-extended.git)`

- Install NPM dependencies with your package manager of choice (`npm install`, `pnpm install`, `yarn install`)

- Copy `.env.example` to `.env` (`cp .env.example .env`)

- Database migrations can be found in the [Guardsman Web](https://git.bunkerbravointeractive.com/bunker-bravo-interactive/guardsman-web) repository. You **MUST** have a working Guardsman Web installation to run Guardsman Discord Extended.

# Configuration
The following configuration values **MUST** be set:
- `DISCORD_BOT_TOKEN`
- `DISCORD_BOT_CLIENT_ID`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`

Default values that are already configured are acceptable for use.

For verification to work, the following values must be set:
- `ROBLOX_CLIENT_ID`
- `ROBLOX_CLIENT_TOKEN`
- `APP_URL`
- `VERIFICATION_COMPLETE_URI`
- `GUARDSMAN_API_URL`
- `GUARDSMAN_API_TOKEN`
- `API_PORT`

# Running the bot
To deploy the bot to production, run `npm run build` to generate the minified files. Then, you may start the bot via `build/src/index.js`

To run the bot in a development environment, run `npm run dev`.