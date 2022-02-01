const { MessageEmbed } = require('discord.js');
const profileModel = require('../../schemas/profileDB');

module.exports = {
    name: 'lottery',
    description: 'ลอตเตอรี่',
    options: [
        {
            name: 'buy',
            description: 'ตัวเลือก',
            type: 1,
            options: [
                {
                    name: 'number',
                    description: `ตัวเลข 0-99 ราคา 1000${process.env.CURRENCY}`,
                    type: 4,
                    required: true,
                }
            ]
        },
    ],
    run: async(interaction, client, profileData) => {
        const { options } = interaction;
        const sub = options.getSubcommand();
        const price = 1000;

        if (!(profileData.lottery == "NaN"))
            return interaction.reply({
                embeds: [ 
                    await new MessageEmbed()
                    .setDescription(':x: | คุณซื้อลอตเตอรี่ไปแล้ว!')
                ],
                ephemeral: false,
            });
        
        if (!(profileData.coins >= price)) 
            return interaction.reply({
                embeds: [
                    await new MessageEmbed()
                    .setDescription(`:x: | คุณต้องใช้เงินอย่างน้อย ${price}${process.env.CURRENCY} เพื่อซื้อมัน!`)
                    .setColor('RED')
                ],
                ephemeral: false,
            });

        switch (sub) {
            case 'buy':
                {
                    const number = interaction.options.getInteger('number');
                    if (!(number >= 0 && number <= 99))
                        return interaction.reply({
                            embeds: [
                                await new MessageEmbed()
                                .setDescription(':x: | ตัวเลขต้องอยู่ในช่วง 0-99')
                                .setColor('RED')
                            ]
                        });
                    await profileModel.findOneAndUpdate({
                        userID: interaction.user.id
                    }, {
                        $inc: {
                            coins: -price,
                        },
                        lottery: number
                    });
                    return interaction.reply({
                        embeds: [
                            await new MessageEmbed()
                            .setDescription(`:white_check_mark: | ซื้อลอตเตอรี่สำเร็จแล้ว!`)
                            .setColor('GREEN')
                        ]
                    });
                }
            break;
        }
    }
}