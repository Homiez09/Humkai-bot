const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'giveaway',
    description: 'test',
    userPerms: ['MANAGE_MESSAGES'],
    options: [
      {
        name: 'start',
        description: 'Amount of messages you want to delete.',
        type: 1,
        options: [
            {
                name: "duration",
                description: "จำกัดเวลา (1m, 1h, 1d)",
                type: 3,
                required: true
            },
            {
                name: "winners",
                description: "จำนวนผู้ชนะ",
                type: 4,
                required: true
            },
            {
                name: "prize",
                description: "ของรางวัล",
                type: 3,
                required: true
            },
            {
                name: "channel",
                description: "เลือกห้อง",
                type: 7,
                channelTypes: ["GUILD_TEXT"]
            },
        ]
    },
    {
        name: "action",
        description: "ตัวเลือก",
        type: 1,
        options: [
            {
                name: "options",
                description: "เลือกตัวเลือก",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "end",
                        value: "end"
                    },
                    {
                        name: "pause",
                        value: "pause"
                    },
                    {
                        name: "unpause",
                        value: "unpause"
                    },
                    {
                        name: "reroll",
                        value: "reroll"
                    },
                    {
                        name: "delete",
                        value: "delete"
                    }
                ]
            },
            {
                name: "message-id",
                description: "test",
                type: 3,
                required: true
            }
        ]
    }
    ],
    run: async (interaction, client) => {
        const { options } = interaction;

        const Sub = options.getSubcommand();

        const errorEmbed = new MessageEmbed()
        .setColor("RED");

        const successEmbed = new MessageEmbed()
        .setColor("GREEN");

        switch(Sub) {
            case "start" : {
                const gchannel = options.getChannel("channel") || interaction.channel;
                const duration = options.getString("duration");
                const winnerCount = options.getInteger("winners");
                const prize = options.getString("prize");

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages: {
                        giveaway: "🎉 **GIVEAWAY STARTED** 🎉",
                        giveawayEnded: "🎊 **GIVEAWAY ENDED** 🎊",
                        winMessage: 'Congratulations, {winners}! You won **{this.prize}**!'
                    }
                }).then(async() => {
                    successEmbed.setDescription("Giveaway was successfully started.")
                    interaction.reply({ embeds: [successEmbed], ephemeral: true });
                }).catch((err) => {
                    errorEmbed.setDescription(`An error has occurred\n\`${err}\``)
                    interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                })
            }
            break;

            case "actions" : {
                const choice = options.getString("options");
                const messageId = options.getString("message-id")
                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);
                
                if (!giveaway) {
                    errorEmbed.setDescription(`Unable to find the giveaway with the message id : ${messageId} in this guild`)
                    interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                }
                switch(choice){
                    case "end":{
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription("Giveaway has been ended.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occurred\n\`${err}\``)
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                    break;
                    case "pause":{
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.pause(messageId).then(() => {
                            successEmbed.setDescription("Giveaway has been paused.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occurred\n\`${err}\``)
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                    break;
                    case "unpause":{
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.unpause(messageId).then(() => {
                            successEmbed.setDescription("Giveaway has been unpaused.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occurred\n\`${err}\``)
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                    break;
                    case "reroll":{
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.reroll(messageId).then(() => {
                            successEmbed.setDescription("Giveaway has been rerolled.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occurred\n\`${err}\``)
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                    break;
                    case "delete":{
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.delete(messageId).then(() => {
                            successEmbed.setDescription("Giveaway has been deleted.");
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occurred\n\`${err}\``)
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                    break;
                }
            }
            break;
        }
    }
  };
  