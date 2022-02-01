const { MessageEmbed } = require('discord.js');
// ยังไม่ได้ทำระบบจับรางวัล
module.exports = {
    name: 'inventory',
    description: 'ช่องเก็บของ',
    run: async (interaction, client, profileData) => {
        let lotteryChk = profileData.lottery;
        if ((lotteryChk == "NaN")) {
            var lottery =  "คุณยังไม่ซื้อลอตเตอรี่";
        } else {
            var lottery =  `${lotteryChk} คือเลขลอตเตอรี่ของคุณ`;
        }
        return interaction.reply({
            embeds: [ await new MessageEmbed()
                .setTitle(':school_satchel: | Inventory')
                .setThumbnail(interaction.user.avatarURL())
                .addFields(
                    { name: 'Item', value: `:fish:\n:gem:\n:carrot:`, inline: true },
                    { name: 'Value', value: `${profileData.fish}g\n${profileData.mine}g\n${profileData.harvest}g`, inline: true },
                )
                .setFooter(`${lottery}`, interaction.user.displayAvatarURL())
                .setColor('BLUE'),
            ], ephemeral: false,
        });
    }
}