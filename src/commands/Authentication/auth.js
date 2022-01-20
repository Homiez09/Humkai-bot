module.exports = {
    name: 'auth',
    description: 'ยืนยันตัวตน',
    run: async (interaction, client) => {
        const role = "871634427552358421";
        await interaction.member.roles.add(role);
        interaction.reply({ content: `คุณเป็นสมาชิกเรียบร้อยแล้ว`, ephemeral: true })
    }

}