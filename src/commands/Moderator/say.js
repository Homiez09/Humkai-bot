const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Mod Only | สั่งให้บอทพูด',
    userPerms: ["MANAGE_MESSAGES"],
    options: [
        {
            name: 'msg',
            description: "Sent Bot's Message",
            type: 3,
            required: true,
        }
    ],
    run: async (interaction, client) => {
        const msg = interaction.options.getString('msg')
        const embed = new MessageEmbed()
            .setColor("#3CB371")
            .setDescription(`${msg}`)
        interaction.reply({ embeds: [embed],  ephemeral: false});
    }
}