module.exports = async (client, guild) => {
    client.users.fetch(process.env.OWNER_ID, false).then((user) => {
        user.send(`${user.username} เตะบอทออกจากเซิฟ ${guild.name} (${user.id})`);
    });
}