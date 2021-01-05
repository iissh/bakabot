const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("🐣 **bakabot Commands** 🐣")
  .setDescription("Below are a list of all of bakabot's Commands:")
  .setColor("#CEFAF7")
  .addFields(
    {name: "**b!lol**", value: "Displays the Summoner Profile for the User provided.", inline: false},
    {name: "**b!jail**", value: "Puts the user in Jail!", inline: false},
    {name: "**b!meme**", value: "Produces a random meme.", inline: false},
    {name: "**b!love**", value: "Produces the compatibility percentage between two people.", inline: false},
    {name: "**b!simprate**", value: "Produces a simp percentage for the user.", inline: false},
    {name: "**b!8ball**", value: "Says an answer from 8ball based on the statement or question provided.", inline: false},
    {name: "**b!ping**", value: "bakabot replies with \"Pong!\"", inline: false},
    {name: "**b!help**", value: "Displays the list of commands (you are looking at it).", inline: false})
  .setFooter("Visit {this link} for more information and an extensive list of commands.")
  message.channel.send(embed)
}

module.exports.help = {
  name:"help",
  description: "Displays the commands"
}