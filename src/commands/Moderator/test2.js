module.exports = {
    name: 'test2',
    description: 'ไม่มีอะไรจ้าเฉพาะเซิฟหลัก',
    category: 'Moderator',
    userPerms: ['ADMINISTRATOR'],
    run: async (interaction, client) => {
        let highest_position = interaction.guild.roles.highest.position;
        let position_bot_role = interaction.guild.me.roles.highest.position
        if (!(position_bot_role == highest_position)) return interaction.reply("Please give me the highest role in the server!");
        if (position_bot_role == highest_position) {
            interaction.reply("Bot is now the highest role in the server!")
        }
    },
};
