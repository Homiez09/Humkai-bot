const { MessageEmbed, Message, MessageSelectMenu } = require('discord.js');
const profileModel = require('../../schemas/profileDB');

module.exports = {
    name: "steal",
    description: 'ปล้น',
    options: [
        {
            name: 'target',
            description: 'เป้าหมาย',
            type: 6,
            required: true,
        }
    ],
    run: async (interaction, client, profileData) => {
        const target = interaction.options.getUser('target') || interaction.member;
        try {         
            if (target.id === profileData.userID)
                return interaction.reply({
                    embeds: [
                        await new MessageEmbed().setDescription(
                            ':x: | ไม่ปล้นเงินตัวเองได้!',
                        ).setColor('RED'),
                    ],
                    ephemeral: false,
                });
            let targetChk;
            targetChk = await profileModel.findOne({ userID: target.id });
            if (!targetChk)
                return interaction.reply({
                    embeds: [
                        await new MessageEmbed().setDescription(
                            ':x: | ไม่พบข้อมูลผู้ใช้งานนี้!',
                        ).setColor('RED'),
                    ],
                    ephemeral: false,
                });
            if (!(targetChk.coins >= 500))
                return interaction.reply({
                    embeds: [
                        await new MessageEmbed().setDescription(':x: | เป้าหมายมีเงินไม่พอ',).setColor('RED')
                    ],
                    ephemeral: false
                })
            if(targetChk.protection)
                return interaction.reply({
                    embeds: [
                        await new MessageEmbed().setDescription(':x: | ผู้ใช้งานนี้ถูกปล้นไปแล้ว',).setColor('RED')
                    ]
                })
            let money = parseInt(targetChk.coins * 0.2, 10)
            await profileModel.findOneAndUpdate(
                {
                    userID: interaction.user.id,
                },
                {
                    $inc: {
                        coins: money
                    },
                },
            );
    
            await profileModel.findOneAndUpdate(
                {
                    userID: target.id
                },
                {
                    $inc: {
                        coins: -money
                    },
                    protection: true
                }
            );
            target.send({ embeds: [
                await new MessageEmbed().setDescription(
                `คุณถูกปล้นเงินไป ${money}${process.env.CURRENCY} โดยใครบางคน`,
                ).setColor('RED')], ephemeral: false })
            return interaction.reply({
                embeds: [
                    await new MessageEmbed().setDescription(
                        `:ninja: | คุณปล้นเงินของ ${target} จำนวน ${money}${process.env.CURRENCY}`,
                    )
                    .setColor('RED')
                ],
                ephemeral: true,
            });
        } catch (error) {
            console.log(error);
        }
    }
}