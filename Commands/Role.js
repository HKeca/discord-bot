const Command = require('./Command');

class Role extends Command
{
    constructor() {
        super("role", "A command to change your role.");
    }

    /**
     * Setup roles
     */
    setup() {}

    /**
     * Make sure the user only has one llc dev role
     * @param  {Member} author
     * @param  {Role} newRole
     */
    cleanRoles(author, newRole) {
        this.roles.forEach((role) => {
            if (role !== newRole && this.roles.includes(role))
                author.removeRole(role);
        });
    }

    /**
     * Add new role
     * @param  {Member} author
     * @param  {Role} role  
     * @return {Promise} 
     */
    tryAdd(author, role) {
        return new Promise((resolve, reject) => {
            author.addRole(this.roles[role])
                .then(member => {
                    resolve(role);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * Run command
     * @param  {Message} message context
     * @param  {string} command user input
     * @return {Promise}
     */
    run(message, command) {
        // Expecting a string "role [role]"
        let role = command.split(' ')[1];

        let author = message.member;

        this.roles = {
            frontend: message.guild.roles.find("name", "frontend"),
            backend: message.guild.roles.find("name", "backend"),
            fullstack: message.guild.roles.find("name", "fullstack")
        };

        return new Promise((resolve, reject) => {
            if (role == undefined)
                reject("No role");

            this.tryAdd(author, role)
                .then(role => {
                    resolve(this.response(author, role));
                })
                .catch(err => {
                    reject(err);
                }); 
        })
    }

    /**
     * Response
     *  
     * @param  {Member} author
     * @param  {Role} role 
     * @return {string} response
     */
    response(author, role) {
        let response = "You are now set as a " + role + " developer, " + author;

        return response;
    }
}

module.exports = Role;