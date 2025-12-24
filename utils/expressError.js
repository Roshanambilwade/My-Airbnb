class ExpressError extends Error {
    constructor(status, message) {
        super();   // pass message to Error class
        this.status = status;
        this.message = message;
    }
}

module.exports = ExpressError;
