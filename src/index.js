// Import discord.js module
const Discord = require('discord.js');

// Require Config
const config = require('./config.json');

// Create an instance of Discord that will use to control the bot
const bot = new Discord.Client();

// Command Manager
const CommandManager = new (require('./Commands/CommandManager.js'))();
CommandManager.setup();

const Logger = require('./Helpers/Logger.js');

// Logging
bot.on('disconnect', () => {
    Logger.info('LLC Bot has disconnected.')
});

bot.on('error', (err) => {
    Logger.error(err)
});

bot.on('ready', () => {
    Logger.log('info', 'LLC Bot has been successfully started');
});

// Message event
bot.on('message', async (message) => {
    // ensure the bot doesn't respond to any bot messages (including itself)
    if (message.author.bot) return;

    // check if sent message starts with the prefix
    if (message.content.indexOf(config.prefix) !== 0) return;

    // user input
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    // command without params
    const command = args.shift().toLowerCase();
    
    const cmdList = await CommandManager.listCommands(bot);

    if (CommandManager.match(command)) {
        CommandManager.match(command).run(message, args).then((response) => {
            return message.channel.send(response);
        }).catch((err) => {
            Logger.error(err);
        });
    } else {
        cmdList.forEach((embed) => {
            message.channel.send(embed);
        });
        return;
    }
});

// Run bot.
bot.login(config.token);