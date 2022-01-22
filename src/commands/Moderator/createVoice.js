module.exports = {
    name: "create-voice-channel",
    description: "สร้างห้องแชทเสียงอัติโนมัติ",
    userPerms: ['MANAGE_MESSAGES'],
    run: async(interaction, client) => {
        const channel = await interaction.guild.channels.create("Create New Room", {
            type: 'GUILD_VOICE',
        });
        interaction.reply({ content: "สามารถคลิกที่ห้องเสียงเพื่อสร้างห้องของตัวเองได้เลย" })
    }
}