const { readdirSync } = require('fs');

module.exports = (client) => {
  readdirSync(`./src/events/`).forEach((dir) => {
    readdirSync(`./src/events/${dir}/`).filter((e) => e.endsWith('js')).forEach((file) => {
      console.log(file)
      const evt = require(`../../src/events/${dir}/${file}`);
      const eName = file.split(".")[0]
      client.on(eName, evt.bind(null, client));
    });
  });
};
