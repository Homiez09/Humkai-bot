const Canvas = require('canvas');
const rankModel = require('../../schemas/rankDB');

module.exports = {
  name: 'rank',
  description: 'ดูระดับของคุณ',
  category: 'Rank',
  run: async (interaction, client) => {
    const applyText = (canvas, text) => {
      const context = canvas.getContext('2d');

      let fontSize = 60;

      do {
        context.font = `${(fontSize -= 10)}px sans-serif`;
      } while (context.measureText(text).width > canvas.width - 300);

      return context.font;
    };

    const user = interaction.user;
    const avatar = user.displayAvatarURL({ format: 'png', dynamic: true });
    const card = await Canvas.loadImage('./src/assets/images/rank.png');
    const avatarImg = await Canvas.loadImage(avatar);

    let canvas = Canvas.createCanvas(600, 400);
    let ctx = canvas.getContext('2d');

    ctx.drawImage(card, 0, 0, canvas.width, canvas.height);

    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 0;
    ctx.chadowOffsetY = 2;
    ctx.shadowBlur = 3;

    rankData = await rankModel.findOne({
      userID: user.id,
    });

    if (!rankData) {
      rankData = await rankModel.create({
        userID: user.id,
      });
    }

    ctx.font = applyText(canvas, `lvl ${rankData.rank}`);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`lvl ${rankData.rank}`, 25, 65);

    //progress bar
    const progress = rankData.point / Math.pow(rankData.rank, 4);
    let progressBar = progress * 100;
    // if progressBar > 100 change to 100
    if (progressBar > 100) {
      progressBar = 100;
    }

    ctx.fillStyle = '#5151d7';
    ctx.fillRect(19, 277, progressBar * 5.6, 42);
    ctx.fillStyle = '#FFFFFF';

    ctx.beginPath();
    ctx.arc(300, 157, 102, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImg, 200, 57, 204, 204);

    const buffer = await canvas.toBuffer();
    try {
      await interaction.reply({
        files: [{ attachment: buffer, name: 'rank.png' }],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
