const { readdirSync } = require('fs');

module.exports = (client) => {
    const playerFolder = readdirSync(`./src/player/`).filter((file) => file.endsWith(".js"));
    
    for (const file of playerFolder) {
        const event = require(`../../src/player/${file}`);

        client.player.on(event.name, (...args) => event.run(...args));
    }
};
