// Import discord.js module
const discord = require('discord.js');
// Create an instance of Discord that will use to control the bot
const bot = new discord.Client();
// Require config json
const config = require('./config.json');


bot.on('ready', () => {
    console.log("LLC Bot successfully started."); // message to run on startup
});

// listen to messages sent to server (every message a user sends in the server)
bot.on('message', message => {
    // So the bot doesn't reply to itself
    if (message.author.bot) return;
    
    // Check if the message starts with the prefix
    if (message.content.indexOf(config.prefix) === 0) {
        // Get the user's message excluding the prefix, and lower case it to avoid CaSe SeNsItIvE
        var text = message.content.substring(1).toLowerCase();
        var response = ''; // ready a string for setting the response in

        // get the Member who sent the message.
        let member = message.member;


        // Switching through all strings after the prefix
        // e.g ![role frontend]    whatever is in the [] is the string we're switching through.
        switch(text) {
            // Role prefix for frontend/backend.
            case "role frontend":
            case "role backend":
            case "role fullstack":
                let role_name = text.substring(5); // !role [frontend/backend/fullstack] - this gets the role name
                let response = "You are now set as a " + role_name + " developer, " + message.author; // write a response
                let role = message.guild.roles.find("name", role_name); // find the proper Role matching the role_name
                member.addRole(role); // add the member to the role.
                break;
        }

        // Reply to the user's message with our response
        if(response !== '') message.channel.send(response);
    }
});
  
// log the bot in. (never remove this)
bot.login(config.token);