const profileModel = require('../../schemas/profileDB');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bank',
    description: 'ระบบธนาคาร',
    options: [
        {
            name: 'options',
            description: 'ตัวเลือก',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'withdraw',
                    value: 'withdraw',
                },
                {
                    name: 'deposit',
                    value: 'deposit',
                },
            ],
        },
        {
            name: 'amount',
            description: 'จำนวนเงิน',
            type: 4,
            required: true,
        },
    ],
    run: async (interaction, client, profileData) => {
        const { options } = interaction;
        const choice = options.getString('options');
        const amount = interaction.options.getInteger('amount');

        switch (choice) {
            case 'withdraw':
                {
                    try {
                        if (amount > profileData.bank)
                            return interaction.reply({
                                embeds: [
                                    await new MessageEmbed().setDescription(
                                        ':x: | คุณมีเงินในธนาคารไม่พอ!',
                                    ).setColor('RED'),
                                ],
                                ephemeral: false,
                            });

                        await profileModel.findOneAndUpdate(
                            {
                                userID: interaction.user.id,
                            },
                            {
                                $inc: {
                                    bank: -amount,
                                },
                            },
                        );
                        await profileModel.findOneAndUpdate(
                            {
                                userID: interaction.user.id,
                            },
                            {
                                $inc: {
                                    coins: amount,
                                },
                            },
                        );
                        return interaction.reply({
                            embeds: [ new MessageEmbed()
                            .setDescription(`:white_check_mark: | ถอนเงินจำนวน ${amount}${process.env.CURRENCY} เรียบร้อยแล้ว`).setColor('GREEN')],
                            ephemeral: false,
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                break;
            case 'deposit': {
                try {
                    if (amount > profileData.coins)
                        return interaction.reply({
                            embeds: [
                                await new MessageEmbed().setDescription(':x: | คุณมีเงินไม่พอ!').setColor('RED'),
                            ],
                            ephemeral: false
                        });
                    await profileModel.findOneAndUpdate(
                        {
                            userID: interaction.user.id,
                        },
                        {
                            $inc: {
                                coins: -amount,
                            },
                        },
                    );
                    await profileModel.findOneAndUpdate(
                        {
                            userID: interaction.user.id,
                        },
                        {
                            $inc: {
                                bank: amount,
                            },
                        },
                    );
                    return interaction.reply({
                        embeds: [
                            await new MessageEmbed().setDescription(`:white_check_mark: | ฝากเงินจำนวน ${amount}${process.env.CURRENCY} เรียบร้อยแล้ว`).setColor('GREEN'),
                        ],
                        ephemeral: false
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
};
