// Import discord.js module
const discord = require('discord.js');
// Create an instance of Discord that will use to control the bot
const bot = new discord.Client();
// Require config json
const config = require('./config.json');


bot.on('ready', () => {
    console.log("bot loaded up");

});

// listen to messages sent to server 
bot.on('message', message => {
    // So the bot doesn't reply to itself
    if (message.author.bot) return;
    
    // Check if the message starts with the prefix
    if (message.content.indexOf(config.prefix) === 0) {
        // Get the user's message excluding the prefix, and lower case it to avoid CaSe SeNsItIvE
        var text = message.content.substring(1).toLowerCase();
        var response; // ready response

        // get sender's member
        let member = message.member;
        switch(text) {
            case "role frontend":
            case "role backend":
            case "role fullstack":
                let 
                response = "You are now set as a " + text.substring(5) + " developer, " + message.author;
                let role = message.guild.roles.find("name", text.substring(5));
                member.addRole(role);
                break;
        }

        // Reply to the user's message
        message.channel.send(response);
    }
});
  
bot.login(config.token);


