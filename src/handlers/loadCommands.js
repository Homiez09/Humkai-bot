const { readdirSync } = require('fs');

module.exports = (client) => {
  readdirSync('./src/commands/').map(async (dir) => {
    const commands = readdirSync(`./src/commands/${dir}/`).map(async (cmd) => {
      const pull = require(`../../src/commands/${dir}/${cmd}`);
      client.slash.set(pull.name, pull);
      if (pull.aliases) {
        pull.aliases.map((x) => client.slash.set(x, pull));
      }
    });
  });
};
