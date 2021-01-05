const Discord = require('discord.js')
const puppeteer = require('puppeteer')

module.exports.run = async (bot, message, args) => {
  
  var regions = ["na", "kr", "jp", "euw", "eune", "oce", "las", "lan", "br"]

  
  var krcheck = ["kr"]

  
  if (typeof args[1] != "string"){
    
    message.channel.send('Please enter a region and username. \n Ex. b!lol  `region` `username`');
  } else if (!regions.includes(args[0])){
    
    message.reply("Please enter a valid region.")
  } else {
    // Gathering Usernames and Region for Webscraping

    // Username with Spaces
    userv1 = args[1]
    for (var i=2; args.length>i; i++){
      userv1 = userv1 + " " + args[i];
    }

    // Username with '+'
    var userv2 = args[1];
    for (var i=2; args.length>i; i++){
      userv2 = userv2 + "+" + args[i];
    }
    // Username with %20
    var userv3 = args[1];
    for (var i=2; args.length>i; i++){
      userv3 = userv3 + "%20" + args[i];
    }

    // URL to check Game Stats
    var link = `https://${args[0].toLowerCase()}.op.gg/summoner/userName=${userv2}`;

    // URL to check User's Top Champions
    var link2 = `https://championmastery.gg/summoner?summoner=${userv2}&region=${args[0]}`;

    // URL to check User's Live Game Status
    var link3 = `https://www.lolskill.net/game/${args[0].toUpperCase()}/${userv3}`;

    if (krcheck.includes(args[0])){
      link =`https://www.op.gg/summoner/userName=${userv2}`;
    }

  

    // Determine if Summoner and Region are Valid


    async function mastery(link2){
      const browser = await puppeteer.launch();
      const page =  await browser.newPage(); 
      await page.goto (link2, {waitUntil: 'domcontentloaded'}); 

        const mastery1 = await page.evaluate(() => document.querySelector("#tbody > tr:nth-child(1)").innerText)

        const mastery1spl = await mastery1.split("\t");
        
        const mastery2 = await page.evaluate(() => document.querySelector("#tbody > tr:nth-child(2)").innerText)

        const mastery2spl = await mastery2.split("\t");

        const mastery3 = await page.evaluate(() => document.querySelector("#tbody > tr:nth-child(3)").innerText)

        const mastery3spl = await mastery3.split("\t");

        const champs = [mastery1spl[0], mastery1spl[1], mastery1spl[2], mastery2spl[0], mastery2spl[1], mastery2spl[2], mastery3spl[0], mastery3spl[1], mastery3spl[2]];
        browser.close()
        return champs;
      }
      let champs = mastery(link2).catch();

      async function livematch(link3){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setViewport({width: 1200, height: 1250, deviceScaleFactor: 1});
        await page.goto(link3, {waitUntil: 'domcontentloaded'});
        screenshot = await page.screenshot({
          path: 'live-game.png',
          fullpage: true,
          clip: {x:30, y: 350, width: 1150, height:900}
        });

        let checklive = await page.evaluate(() => document.querySelector("#current-game > div > div").innerText)

        if (checklive === `${userv1} is not in a game or the game is not spectatable.`){
          var liveimg = false;
        } else {
          var liveimg = true;
        }
        browser.close()
        return liveimg;
      }
      let liveimg = livematch(link3).catch();

      async function league(link){
        maschamps = await champs;
        liveimage = await liveimg;
        const browser = await puppeteer.launch();
        const page =  await browser.newPage(); 
        await page.goto (link, {waitUntil: 'domcontentloaded'}); 

        var click = await page.$('#SummonerRefreshButton');
        await click.evaluate(click => click.click());  
        
        // lvele
        const level = await page.evaluate (() => document.querySelector('div.ProfileIcon').innerText)
        const stats = await page.evaluate(() => document.querySelector('div.TierRankInfo').innerText)
        
        const stat= await   stats.split("\n"); // s4, 20lp, 326W 359L, Winratio 48%


        const lastgame = await page.evaluate(() => document.querySelector('div.GameStats').innerText)
        const lastgames = await lastgame.split("\n");

        const lastchamp = await page.evaluate(() => document.querySelector('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-summary > div.RealContent > div > div.Content > div.GameItemList > div:nth-child(1) > div > div.Content > div.GameSettingInfo > div.ChampionName').innerText)

        const lastkda = await page.evaluate(() => document.querySelector('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-summary > div.RealContent > div > div.Content > div.GameItemList > div:nth-child(1) > div > div.Content > div.KDA > div.KDA').innerText)

        const lastcs = await page.evaluate(() => document.querySelector('div.CS').innerText)

        const recentgamesratio = await page.evaluate(() => document.querySelector('div.WinRatioTitle').innerText)

        const [pfp] = await page.$x('/html/body/div[2]/div[2]/div/div/div[1]/div[2]/div/img');
        const pfpSrc = await pfp.getProperty('src');
        const pfpPic = await pfpSrc.jsonValue();

        if (liveimage === false){
          var livestats = `${userv1} is not currently in a game or not spectatable.`;
        } else {
          var livestats = `${userv1}'s live game lobby is displayed below.`;
        }

        if (stat[1] != "Unranked"){
          const embed = new Discord.MessageEmbed()
          .setTitle("LoL Profile: "+ userv1 +" ["+args[0].toUpperCase()+"]")
          .setColor('#D9FEEA')
          .setAuthor(`${userv1}'s Summoner Profile`, pfpPic)
          .setURL(link)
          .setDescription(`The summoner profile!`)
          .addFields(
            {name: "**Level:**", value: level, inline: true},
            {name: "**Recent Games:**", value: recentgamesratio, inline: true},
            {name: '\u200B', value: '\u200B', inline: true}, 
            {name: "**Top Champions:**", value: `**[${maschamps[1]}]** 1. ${maschamps[0]}: ${maschamps[2]} \n **[${maschamps[4]}]** 2. ${maschamps[3]}: ${maschamps[5]} \n **[${maschamps[7]}]** 3. ${maschamps[6]}: ${maschamps[8]}`, inline: true},
            {name: "**Ranked Stats:**", value: `**${stat[1]}** \n ${stat[2]} \n ${stat[3]}`, inline: true},
            {name: "**Last Game:**", value: `**${lastgames[0]}** game as **${lastchamp}** with **${lastkda}** (${lastcs}) **${lastgames[1]}**.`, inline: false},
            {name: "**Live Game:**", value: livestats, inline: true},
          )
          .setThumbnail(pfpPic)
          .setFooter(`Click the title to visit ${userv1}'s op.gg profile.`)

          message.channel.send(embed);
          if (liveimage === true){
            message.channel.send({files:["live-game.png"]});
          }
        } else {
          const embed = new Discord.MessageEmbed()
          .setTitle("LoL Profile: "+ userv1 +" ["+args[0].toUpperCase()+"]")
          .setColor('#D9FEEA')
          .setAuthor(`${userv1}'s Summoner Profile`, pfpPic)
          .setDescription(`The summoner profile!`)
          .setURL(link)
          .addFields(
            {name: "**Level:**", value: level, inline: true},
            {name: "**Recent Games:**", value: recentgamesratio, inline: true},
            {name: "**Top Champions:**", value: `**[${maschamps[1]}]** 1. ${maschamps[0]}: ${maschamps[2]} \n **[${maschamps[4]}]** 2. ${maschamps[3]}: ${maschamps[5]} \n **[${maschamps[7]}]** 3. ${maschamps[6]}: ${maschamps[8]}`, inline: false},
            {name: "**Ranked Stats:**", value: `Unranked`, inline: true},
            {name: "**Last Game:**", value: `**${lastgames[0]}** game as **${lastchamp}** with **${lastkda}** (${lastcs}) **${lastgames[1]}**.`, inline: false},
            {name: "**Live Game:**", value: livestats, inline: true},
          )
          .setThumbnail(pfpPic)
          .setFooter(`Click the title to visit ${userv1}'s op.gg profile.`)

          message.channel.send(embed);
          if (liveimage === true){
            message.channel.send({files:["live-game.png"]});
          }
        } 
        await browser.close()
        }

      league(link);
    }


  }


module.exports.help = {
  name: "lol",
  description: "Displays profile for Summoner given"
}