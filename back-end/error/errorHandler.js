module.exports = class ErrorHandler extends Error {
    constructor(status, errorStatus, message = '') {
        super(message);
        this.status = status;
        this.errorStatus = errorStatus;

        Error.captureStackTrace(this, this.constructor);
    }
};
