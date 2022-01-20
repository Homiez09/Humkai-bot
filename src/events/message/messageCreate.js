module.exports = async (client, msg) => {
  if (msg.channel.id == '875313424601612318') {
    if (msg.content == 'สวัสดี') {
      msg.channel.send('สวัสดีจ้า');
    }
  }
};
