module.exports = {
  name: 'auth',
  description: 'ยืนยันตัวตน',
  run: async (interaction, client) => {
    const role = '871634427552358421';
    try {
      await interaction.member.roles.add(role);
      await interaction.member.send({
        content: `ยินดีด้วยคุณ <@${interaction.user.id}> ยืนยันตัวตนเรียบร้อย`,
        ephemeral: true,
      });
      await interaction.reply({
        content: `คุณเป็นสมาชิกเรียบร้อยแล้ว`,
        ephemeral: true,
      });
    } catch (error) {
      interaction.reply({
        content: `กำหนดยศบอทให้อยู่สูงว่ายศอื่นๆ`,
        ephemeral: true,
      });
    }
  },
};
/* 
TO DO 
- Admin set role 
*/
