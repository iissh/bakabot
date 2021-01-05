const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if(args.length === 0){
    const embed = new Discord.MessageEmbed()
    .setTitle('Simp Rate')
    .setColor('#D9FEEA')
    .setDescription(`You are ${Math.floor(Math.random() * 100 + 1)}% simp.`);
    message.channel.send(embed);
  }else if (args[0] ==='<@!791505361491197973>'){
    const embed = new Discord.MessageEmbed()
    .setTitle('Simp Rate')
    .setColor('#D9FEEA')
    .setDescription(`I don't simp for anybody 😒`);
    message.channel.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
    .setTitle('Simp Rate')
    .setColor('#D9FEEA')
    .setDescription(`${args[0]} is ${Math.floor(Math.random() * 100 + 1)}% simp.`);
    message.channel.send(embed);
  }
}

module.exports.help = {
  name: "simprate",
  description: "Rates how much of a Simp the person is"
}