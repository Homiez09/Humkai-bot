const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'test',
    description: 'Mod Only | Add role',
    userPerms: ['MANAGE_MESSAGES'],
    run: async (interaction, client) => {
        const row = new MessageActionRow()
            .addComponents(
                [
                    new MessageButton()
                    .setCustomId('member')
                    .setLabel('Member')
                    .setStyle('SUCCESS')
                    .setEmoji('✅')
                ],
                [
                    new MessageButton()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setStyle('DANGER')
                    .setEmoji('❌')
                ]
            );

        const embed = new MessageEmbed()
            .setTitle("Auto Role")
            .setDescription("กรุณาเลือกสิทธิ์ของคุณ")
            .setColor("GREEN")

        interaction.reply({ embeds: [embed], components: [row], ephemeral: false });
    }
};