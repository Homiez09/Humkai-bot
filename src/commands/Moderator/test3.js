const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'test3',
    description: 'test3',
    category: 'Moderator',
    userPerms: ['ADMINISTRATOR'],
    run: async (interaction, client) => {
        let channel = await interaction.guild.channels.create('Auth', {
            type: 'GUILD_TEXT',
        });
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('member')
                .setPlaceholder('เลือกเมนู')
                .addOptions([
                    {
                        label: 'Verify',
                        description: 'Click to verify',
                        value: 'verify',
                    },
                ]),
        );
        const embed = new MessageEmbed()
            .setTitle('Authentication')
            .setDescription('Welcome to the server! Please select a verify option')
            .setColor('GREEN');
            let msg = await channel.send({ embeds: [embed], components: [row] });
        // get message id from channel.
        console.log(msg.id);
        
    },
};