const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if(args.length === 0){
    message.channel.send("❌ You need to mention atleast 1 user in the server.");
  }else {
    let lovepercent = Math.floor(Math.random() * 100 + 1);
    let whitebars = Math.round(25 * (lovepercent / 100));
    let blackbars = 25 - Math.round(25 * (lovepercent / 100));
    if (lovepercent < 20){
        result = "There is NO hope."
    } else if (lovepercent < 50){
        result = "Oh yikes...";
    } else if (lovepercent < 70){
        result = "Seems like it's working";
    } else if (lovepercent < 90){
        result = "You are perfect for eachother :smile:";
    } else {
        result = "A MATCH MADE I HEAVEN :heart_eyes:"
    }

    if (args.length === 1){
      const embed = new Discord.MessageEmbed()
      .setTitle('🤍 🤍 Love Test 🤍 🤍')
      .setColor('#ffc7e2')
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`\n 💙 ${message.author} \n💙 ${args[0]} \n \n ${lovepercent}% **<||** \` ${"█".repeat(whitebars)} ${" ".repeat(blackbars)} \`**||>** \n\n **Outcome:** ${result}`);
      message.channel.send(embed);
    } else {
      const embed = new Discord.MessageEmbed()
      .setTitle('🤍 🤍 Love Test 🤍 🤍')
      .setColor('#ffc7e2')
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`\n 💙 ${args[0]} \n💙 ${args[1]} \n \n ${lovepercent}% **<||** \` ${"█".repeat(whitebars)} ${" ".repeat(blackbars)} \`**||>** \n\n **Outcome:** ${result}`);
      message.channel.send(embed);
    }

  }
}

module.exports.help = {
  name: "love",
  description: "Love Test between two people"
}