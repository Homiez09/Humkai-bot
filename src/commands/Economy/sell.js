const { MessageEmbed } = require('discord.js');
const profileModel = require('../../schemas/profileDB');
// ไว้ทำใหม่
module.exports = {
    name: 'sell',
    description: 'ขายสินค้า',
    options: [
        {   
            name: 'options',
            description: 'ตัวเลือก',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'fish',
                    value: 'fish',
                },
                {
                    name: 'mine',
                    value: 'mine',
                },
                {
                    name: 'harvest',
                    value: 'harvest',
                }
            ]
        }
    ],
    run: async (interaction, client, profileData) => {
        const { options } = interaction;
        const choice = options.getString('options');

        switch (choice) {
            case 'fish':
                {
                    try {
                        let fish = profileData.fish;

                        let profit = parseInt(profileData.fish / 100, 10);
                        if (!(fish >= 1500))
                            return interaction.reply({
                                embeds: [
                                    await new MessageEmbed()
                                        .setDescription(':x: | คุณต้องปลาอย่างน้อย 1500g!')
                                        .setColor('RED'),
                                ],
                                ephemeral: false,
                            });

                        await profileModel.findOneAndUpdate(
                            {
                                userID: interaction.user.id,
                            },
                            {
                                $inc: {
                                    fish: -fish,
                                    coins: profit,
                                },
                            },
                        );
                        return interaction.reply({
                            embeds: [
                                await new MessageEmbed()
                                    .setDescription(`:fish: | คุณขายปลาทั้งหมด ${fish}g และได้รับเงิน ${profit}${process.env.CURRENCY}`)
                                    .setColor('GREEN'),
                            ],
                            ephemeral: false,
                        });
                    }catch(error) {
                        console.log(error);
                    }
                }
            break;
            case 'mine':
                {
                
                }
            break;
        }              
    }
}