const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports.run = async (bot, message, args) => {
    const subReddits = ["meme", "me_irl", "dankmeme"]
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);

    var randdesc = ["You wanted it, you got it!", "A meme a day, keeps the doctor away!", "Here's something funny", "I loved this one..."]

    const embed = new Discord.MessageEmbed()
    .setImage(img)
    .setDescription(`${randdesc[Math.floor(Math.random() * 3)]}`)
    .setTitle(`From /r/${random}`)
    .setColor('RANDOM')
    .setURL(`http://reddit.com/${random}`)

    message.channel.send(embed);

}

module.exports.help = {
  name:"meme",
  description: "Displays a meme"
}