const Skoy = require('skoy');

module.exports = {
  name: 'skoy',
  description: 'นายเองก็เป็นได้นะสก๊อยอ่ะ',
  category: 'miscellaneous',
  botPerms: [],
  options: [
    {
      name: 'text',
      description: 'ใส่ข้อความ',
      type: 3,
      required: true,
    },
  ],
  run: async (interaction, client) => {
    try {
      const text = interaction.options.getString('text');
      pasaskoy = Skoy.convert(text);
      await interaction.reply(pasaskoy);
    } catch (error) {}
  },
};
