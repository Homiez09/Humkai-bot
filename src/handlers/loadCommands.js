const { readdirSync } = require('fs');

module.exports = (client) => {
  readdirSync(`./src/commands/`).forEach((dir) => {
    readdirSync(`./src/commands/${dir}/`)
      .filter((e) => e.endsWith('js'))
      .forEach((file) => {
        const pull = require(`../../src/commands/${dir}/${file}`);
        client.slash.set(pull.name, pull);
      });
  });
  console.log('✅', 'Loaded all commands');
};