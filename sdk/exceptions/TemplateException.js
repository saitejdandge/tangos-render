"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateException extends Error {
    constructor(opStatus, message) {
        super(message);
        this.result = 0;
        this.opStatus = opStatus;
        this.message = message;
    }
}
exports.TemplateException = TemplateException;
