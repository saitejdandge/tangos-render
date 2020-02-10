"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemplateException_1 = require("./TemplateException");
const strings_1 = __importDefault(require("../config/strings"));
const templateErrorCodes_1 = __importDefault(require("../config/templateErrorCodes"));
class TemplateRenderException extends TemplateException_1.TemplateException {
    constructor() {
        super(templateErrorCodes_1.default.templateRenderErrorCode, strings_1.default.templateRenderError);
    }
}
exports.TemplateRenderException = TemplateRenderException;
