const { MessageEmbed } = require('discord.js');
const profileModel = require('../../schemas/profileDB');
// ไว้ทำใหม่
module.exports = {
  name: 'fish',
  description: 'ตกปลา',
  run: async (interaction, client, profileData) => {
    try {
      const randomFish = Math.floor(Math.random() * (150 - 30 + 1)) + 30; // random number between 30 and 150

      const nameFish = ['item0', 'item1', 'item2']; // name of fish
      const randomNameFish = Math.floor(Math.random() * nameFish.length); // random number between 0 and 2 (length of nameFish)

      await profileModel.findOneAndUpdate(
        {
          userID: interaction.user.id,
        },
        {
          $inc: {
            fish: randomFish,
          },
        },
      );
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(
              `คุณตกได้${nameFish[randomNameFish]} น้ำหนัก ${randomFish}g`,
            )
            .setColor('GREEN'),
        ],
        ephemeral: false,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
