require('dotenv').config();

const { Client, Intents, Collection } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const { readdirSync } = require('fs');

const client = new Client({
  shards: 'auto',
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

client.slash = new Collection();
client.together = new DiscordTogether(client);

// loadHandlers
readdirSync('./src/handlers/').forEach((dir) => {
  const fileName = dir.split('.')[0];
  require(`./handlers/${fileName}`)(client);
});

// Main Function
void (async () => {
  const token = process.env.TOKEN || ``;

  if (token) {
    await client.login(process.env.TOKEN);
  } else {
    console.log(`Can't found bot token :C`);

    process.exit(1);
  }
})();

process.on('unhandledRejection', (reason, p) => {
  console.log(reason, p);
});
process.on('uncaughtException', (err, origin) => {
  console.log(err, origin);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err, origin);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});
