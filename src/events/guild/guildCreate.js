module.exports = async (client, guild) => {
  console.log(guild)
  client.users.fetch(process.env.OWNER_ID, false).then((user) => {
    user.send(`✅ บอทเข้าสู่เซิฟ ${guild.name} (${guild.id}, ${guild.ownerId})`);
  });
};
