class Command
{
    /**
     * Command base class
     * @param  {string} name
     * @param  {string} description
     * @param  {array} alias
     */
    constructor(name, description, alias = []) {
        this.cmdName = name;
        this.cmdDescription = description;
        this.cmdAlias = alias;
    }

    /**
     * This will be called when a user calls the command
     *
     * @return {Promise} MUST return a promise
     */
    run() {}

    /**
     * This will run on setup.
     */
    setup() {}

    /* Getters and setters */
    
    /**
     * Set Name
     * @param  {string} name
     */
    set name(name) {
        if (name == null || name == '')
            throw new Error('Invalid argument');
        this.cmdName = name;
    }

    /**
     * Set Description
     * @param  {string} description
     */
    set description(description) {
        if (description == null || description == '')
            throw new Error('Invalid argument');
        this.cmdDescription = description;
    }

    /**
     * Set Alias
     * @param  {array} alias command aliases
     */
    set alias(alias) {
        if (alias == null || alias == '')
            throw new Error('Invalid argument');
        this.cmdAlias = alias;
    }

    /**
     * Get Name
     * @return {string} command name
     */
    get name() {
        if (this.cmdName == '')
            throw new Error('Name not initiated');
        return this.cmdName;
    }

    /**
     * Get Description
     * @return {string} description
     */
    get description() {
        if (this.cmdDescription == '')
            throw new Error('Description not initiated');
        return this.cmdDescription;
    }

    /**
     * Get Alias
     * @return {array} command aliases
     */
    get alias() {
        if (this.cmdAlias == null)
            throw new Error('Aliases not initiated');
        return this.cmdAlias;
    }
}

module.exports = Command;