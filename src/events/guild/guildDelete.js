module.exports = async (client, guild) => {
  client.users.fetch(process.env.OWNER_ID, false).then((user) => {
    user.send(`❌ บอทออกจากเซิฟ ${guild.name} (${guild.id}, ${guild.ownerId})`);
  });
};
