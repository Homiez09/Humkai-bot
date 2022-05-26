const { MessageEmbed } = require('discord.js');
const ttsModel = require('../../schemas/ttsDB');
module.exports = {
    name: 'tts2',
    description: 'text to speech',
    category: 'miscellaneous',
    userPerms: [],
    botPerms: [],
    options: [
        {
            name: 'options',
            description: 'ตัวเลือก',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'on',
                    value: 'on',
                },
                {
                    name: 'off',
                    value: 'off',
                }
            ]
        }
    ],
    run: async (interaction, client, word) => {
        const { options } = interaction;
        const choice = options.getString('options');

        let ttsData;
        try {
            ttsData = await ttsModel.findOne({
                guildID: interaction.guild.id,
            });
            if (!ttsData) {
                ttsData = await ttsModel.create({
                    guildID: interaction.guild.id,
                    ttsStatus: false,
                    channelID: interaction.channel.id
                });
            }
        } catch (e) {
            console.log(e);
        }

        switch (choice) {
            case 'on':
                {
                    ttsData = await ttsModel.findOne({
                        guildID: interaction.guild.id,
                    });
                    if (ttsData.ttsStatus === false) {
                        await interaction.deferReply();
                        ttsData = await ttsModel.findOneAndUpdate(
                            { guildID: interaction.guild.id },
                            {
                                ttsStatus: true,
                                channelID: interaction.channel.id
                            },
                        );

                        ttsData = await ttsModel.findOne({
                            guildID: interaction.guild.id,
                        });

                        const embed = new MessageEmbed()
                            .setColor('#3CB371')
                            .setDescription(`Ttf Status: Enabled | Active: <#${ttsData.channelID}>`)
                            .setFooter(
                                `Request by ${interaction.user.tag}`,
                                interaction.user.displayAvatarURL(),
                            );
                        await interaction.editReply({ embeds: [embed], ephemeral: false });
                    } else {
                        ttsData = await ttsModel.findOne({
                            guildID: interaction.guild.id,
                        });
                        const embed = new MessageEmbed()
                            .setColor('#3CB371')
                            .setDescription(`Ttf Status: Enabled | Active: <#${ttsData.channelID}>`)
                            .setFooter(
                                `Request by ${interaction.user.tag}`,
                                interaction.user.displayAvatarURL(),
                            );
                        await interaction.reply({ embeds: [embed], ephemeral: false })
                    }
                }
                break;
            case 'off':
                {
                    ttsData = await ttsModel.findOne({
                        guildID: interaction.guild.id,
                    });
                    if (ttsData.ttsStatus === true) {
                        await interaction.deferReply();
                        ttsData = await ttsModel.findOneAndUpdate(
                            { guildID: interaction.guild.id },
                            {
                                ttsStatus: false,
                                channelID: interaction.channel.id
                            },
                        );

                        const embed = new MessageEmbed()
                            .setColor('#FF0000')
                            .setDescription(`Ttf Status: Disabled.`)
                            .setFooter(
                                `Request by ${interaction.user.tag}`,
                                interaction.user.displayAvatarURL(),
                            );
                        await interaction.editReply({ embeds: [embed], ephemeral: false });
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#FF0000')
                            .setDescription(`Ttf Status: Disabled`)
                            .setFooter(
                                `Request by ${interaction.user.tag}`,
                                interaction.user.displayAvatarURL(),
                            );
                        await interaction.reply({ embeds: [embed], ephemeral: false })
                    }
                }
        }
    }
}