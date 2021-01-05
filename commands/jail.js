const Discord = require('discord.js')
const jimp = require('jimp')

module.exports.run = async (bot, message, args) => {
  var userimg= message.author.displayAvatarURL({format: 'png', size: 1024});
  
  var imgs = [userimg, "jail.png"];
  var jimps = [];

  for (var i = 0; i< imgs.length; i++){
    jimps.push(jimp.read(imgs[i]));
  }


  Promise.all(jimps).then(function(data){
    return Promise.all(jimps);
  }).then(function(data){
    data[0].composite(data[1],0,0);

    data[0].write("jailed.png", function() {
      console.log("wrote the image")
    });
  });



  const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} is in trouble 😨`, message.author.avatarURL())
    .setColor('#c78deb')
    .setFooter(`Requested by ${message.author.tag}`)
  message.channel.send(embed)
  message.channel.send({files: ["jailed.png"]})
}

module.exports.help = {
  name: "jail",
  description: "Displays the user's avatar behind jail bars"
}