const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  if (args.length === 0) {
    message.channel.send("You have to ask me something, what else am I supposed to answer?")
  } else {
    var replies = [
      "Yes, for sure!",
      "You can rely on it.",
      "Yes.",
      "Most likely.",
      "Reply unclear, try again.",
      "The future is bleak...",
      "My sources say not today :pensive:.",
      "Concentrate harder and then ask again.",
      "No.",
      "Definitely NOT!",
      "I wouldn't recommend it.",
      "I say no.",
      "I don't feel like answering that."
    ]
  message.channel.send(`🎱 **|** ${replies[Math.floor(Math.random() * 12)]}`);
  }
}

module.exports.help = {
  name: "8ball",
  description: "8ball command"
}