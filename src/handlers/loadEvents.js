const { readdirSync } = require('fs');

module.exports = (client) => {
  const loadCommands = (dirs) => {
    const events = readdirSync(`./src/events/${dirs}/`).filter((d) =>
      d.endsWith('js'),
    );
    for (let file of events) {
      const evt = require(`../../src/events/${dirs}/${file}`);
      const eName = file.split('.')[0];
      client.on(eName, evt.bind(null, client));
    }
  };
  // Add Folder Name
  ['client', 'guild', 'player'].forEach((x) =>
    loadCommands(x),
  );
};
