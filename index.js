require("dotenv").config();

const { Client, Intents, Collection, AutocompleteInteraction } = require('discord.js');
const client = new Client({ 
    shards: "auto",
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
    ] 
});
const { DiscordTogether } = require('discord-together');

client.slash = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.together = new DiscordTogether(client);

["loadEvents", "loadCommands"]
    .forEach(file => {
        require(`./handlers/${file}`)(client);
    });

client.login(process.env.TOKEN)