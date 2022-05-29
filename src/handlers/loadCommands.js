const { readdirSync } = require('fs');

module.exports = (client) => {
  console.log('Loading commands...');
  readdirSync('./src/commands/').map(async (dir) => {
    const commands = readdirSync(`./src/commands/${dir}/`).map(async (cmd) => {
      const pull = require(`../../src/commands/${dir}/${cmd}`);
      client.slash.set(pull.name, pull);
      console.log('✅', `[${dir}]`, `/${pull.name}`)
      if (pull.aliases) {
        pull.aliases.map((x) => client.slash.set(x, pull));
      }
    });
  });
  console.log('Finished loading commands.');
};
