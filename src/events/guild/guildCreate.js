module.exports = async (client, guild) => {
    client.users.fetch(process.env.OWNER_ID, false).then((user) => {
        user.send(`${user.username} เชิญบอทเข้าสู่เซิฟ ${guild.name} (${user.id})`);
    });
}