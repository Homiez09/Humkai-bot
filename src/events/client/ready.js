require('dotenv').config();

const figlet = require('figlet');
const chalk = require('chalk');
const mongoose =require('mongoose');

module.exports = (client) => {
  const Act = [
    "abcdefu -GAYLE",
    "Blank space -Taylor Swift",
    "Stay -Justin Bieber",
  ];

  figlet(client.user.tag, function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(chalk.red.bold(data));
  });

  setInterval(() => {client.user.setPresence({activities: [{
          name: Act[Math.floor(Math.random() * Act.length)],
          // Type --> PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM, COMPETING
          type: "LISTENING",
        },
      ],
      // Status --> online, idle, dnd, invisible 
      status: "online",
    });
  }, 5000);

  if(!process.env.dbURL) return;
  mongoose.connect(process.env.dbURL,{
    useNewUrlParser:  true,
    useUnifiedTopology: true,
    //useFindAndModify: true
  }).then(() => {
    console.log("The client is now connect to the database")
  }).catch((err) => {
    console.log(err)
  });

};
