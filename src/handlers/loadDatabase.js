const mongoose = require('mongoose');

module.exports = async () => {
  if (!process.env.dbURL) return;
  mongoose
    .connect(process.env.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: true
    })
    .then(() => {
      console.log('The client is now connect to the database');
    })
    .catch((err) => {
      console.log(err);
    });
};
