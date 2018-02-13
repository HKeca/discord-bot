class Command
{
    /**
     * Command Base class
     * @param  {string} name
     * @param  {string} description
     */
    constructor(name, description) {
        this.cmdName = name;
        this.cmdDescription = description;
    }

    /**
     * This will be called when a user calls the command
     */
    run() {}

    /**
     * This will run on setup.
     */
    setup() {}

    /* Getters and setters */
    
    set name(name) {
        if (name == null || name == "")
            throw "Invalid argument";
        this.cmdName = name;
    }

    set description(description) {
        if (description == null || description == "")
            throw "Invalid argument";
        this.cmdDescription = description;
    }

    get name() {
        if (this.cmdName == "")
            throw "Name not initiated";
        return this.cmdName;
    }

    get description() {
        if (this.cmdDescription == "")
            throw "Description not initiated";
        return this.cmdDescription;
    }
}

module.exports = Command;