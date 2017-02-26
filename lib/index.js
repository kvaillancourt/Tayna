'use strict';

const fs      = require('fs');
const Clapp   = require('./modules/clapp-discord');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Discord = require('discord.js');
const bot     = new Discord.Client();
const sql = require('sqlite');
sql.open('./score.sqlite');

var app = new Clapp.App({
  name: cfg.name,
  desc: pkg.description,
  prefix: cfg.prefix,
  version: pkg.version,
  onReply: (msg, context) => {
    // Fired when input is needed to be shown to the user.

    context.msg.reply('\n' + msg).then(bot_response => {
      if (cfg.deleteAfterReply.enabled) {
        context.msg.delete(cfg.deleteAfterReply.time)
          .then(msg => console.log(`Deleted message from ${msg.author}`))
          .catch(console.log);
        bot_response.delete(cfg.deleteAfterReply.time)
          .then(msg => console.log(`Deleted message from ${msg.author}`))
          .catch(console.log);
      }
    });
  }
});

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
  app.addCommand(require("./commands/" + file));
});

// const prefix = '+';
bot.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type !== 'text') return;


  //check to see if the user is in the points database. 
  sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
    if (!row) {
      // add in the user
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
    } else {
      //caluclate points of already existing user 
      let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
      if (curLevel > row.level) {
        row.level = curLevel;
        sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
    }
  }).catch(() => {
    //create a table if one does not exist
    console.error;
    sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)').then(() => {
      sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [message.author.id, 1, 0]);
    });
  });

  if the message isn't a sql database message
  if (!message.content.startsWith(prefix)) {
    if (app.isCliSentence(message.content)) {
      app.parseInput(message.content, {
        msg: message
                // Keep adding properties to the context as you need them
      });
    }
  }

  if (message.content.startsWith(prefix + 'level')) {
    sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
      if (!row) return message.reply('Your current level is 0');
      message.reply(`Your current level is ${row.level}`);
    });
  } else

  if (message.content.startsWith(prefix + 'points')) {
    sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
      if (!row) return message.reply('sadly you do not have any points yet!');
      message.reply(`you currently have ${row.points} points, good going!`);
    });
  }

  if (app.isCliSentence(message.content)) {
    app.parseInput(message.content, {
      message: message
      // Keep adding properties to the context as you need them
    });
  }
});
// bot.on('message', msg => {
//   // Fired when someone sends a message

//   if (app.isCliSentence(msg.content)) {
//     app.parseInput(msg.content, {
//       msg: msg
//       // Keep adding properties to the context as you need them
//     });
//   }
// });

bot.login(cfg.token).then(() => {
  console.log('Running!');
});
