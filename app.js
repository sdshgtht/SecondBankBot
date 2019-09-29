var Discord = require('discord.js');
var bot = new Discord.Client();
const token = 'NjI2NzY1ODc2NTMxNTYwNDQ4.XY4rtw.R-HRJMTV6Tsi_-DoBJjVVcSNvyo';
const fs = require('fs');
const moment = require('moment');
let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

bot.on('message', message => {

  var sender = message.author;
  var msg = message.content.toUpperCase();
  var PREFIX = '&';

  if (message.content.startsWith(PREFIX + "bot")) {
    if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send(` ${message.author} You do not have PREMISSIONS to use this command`)
      message.channel.send({
          embed: new Discord.RichEmbed()
              .setAuthor(bot.user.username, bot.user.avatarURL)
              .setThumbnail(bot.user.avatarURL)
              .setColor('RANDOM')
              .setTitle('``INFO just a simple Bot ©`` ')
              .addField('``My Ping``', [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
              .addField('``RAM Usage``', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true)
              .addField('``servers``', [bot.guilds.size], true)
              .addField('``channels``', `[ ${bot.channels.size} ]`, true)
              .addField('``Users``', `[ ${bot.users.size} ]`, true)
              .addField('``My Name``',     `[ ${bot.user.tag} ]`, true)
              .addField('``My ID``', `[ ${bot.user.id} ]`, true)
              .addField('``My PREFIX``', `[ > ]`, true)
              .addField('``My Language``', `[ Java Script ]`, true)
              .setFooter('By | Ali.J')
      })
  }



  if (bot.user.id === message.author.id) { return }

  let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

  if (!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
  if (!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 0;
  if (!userData[sender.id + message.guild.id].lastDaily) userData[sender.id + message.guild.id].lastDaily = 'Not Collected';




  if (msg === prefix + 'CREDITS' || msg === prefix + 'BALANCE') {
    message.channel.send({embed:{
      title: "Bank",
      color: 0xF1C40F,
      fields:[{
        name:"Account Holder",
        value:message.author.username,
        inline:true

      },
      {
        name:"Account Balance",
        value:userData[sender.id + message.guild.id].money,
        inline:true
    }]

    }})

  }

  if (msg === prefix + 'DAILY') {
    if (userData[sender.id + message.guild.id].lastDaily != moment().format('L')) {
    userData[sender.id + message.guild.id].lastDaily = moment().format('L')
    userData[sender.id + message.guild.id].money += 500;
    message.channel.send({embed:{
      title:"Daily Reward",
      description:"You got 500$ added to your account!"
    }})
  } else {
    message.channel.send({embed:{
      title:"Daily Reward",
      description:"You already Collected your daily reward! You can collect your next reward **" + moment().endOf('day').fromNow() + ('**.')
    }})
  }
  }

  fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
    if (err) console.error(err);
  })

})

bot.on('ready', () => {
  console.log('Economy Launched...')
})


bot.login(token);
