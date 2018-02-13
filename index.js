// Import discord.js module
const discord = require('discord.js');

// Require Config
const config = require('./config.json');

// Create an instance of Discord that will use to control the bot
const bot = new discord.Client();

// Command Manager
const CommandManager = new (require('./Commands/CommandManager'))();
CommandManager.setup();

const logger = require('./Logger');

// Logging
bot.on('disconnect', function() {
    logger.info('LLC Bot has Disconnected.')
})

bot.on('error', function(err) {
    logger.error(err)
})

bot.on('ready', () => {
    logger.log('info', 'LLC Bot has been Sucessfully Started');
});

// Message event
bot.on('message', message => {
    // So the bot doesn't reply to itself
    if (message.author.bot) return;

    // Check if the message starts with the prefix
    if (message.content.indexOf(config.prefix) === 0) {
        // user input
        let input = message.content.substring(1).toLowerCase();

        // Command without params
        let cmd = input.split(' ')[0];

        let command = CommandManager.match(cmd);
            
        if (command == false)
            return logger.error(cmd + ' command not found');

        // Each command is ran with messsage context and user input
        command.run(message, input)
            .then(response => {
                message.channel.send(response);
            })
            .catch(err => {
                logger.error(err);
            });
            
    }
});

// Run bot.
bot.login(config.token);