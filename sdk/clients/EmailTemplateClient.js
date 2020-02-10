"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemplateRenderException_1 = require("./../exceptions/TemplateRenderException");
const TemplateCorruptedException_1 = require("./../exceptions/TemplateCorruptedException");
const InvalidBaseTemplateException_1 = require("../exceptions/InvalidBaseTemplateException");
const baseTemplates_1 = __importDefault(require("../config/baseTemplates"));
const fs_1 = __importDefault(require("fs"));
const TemplateUtils_1 = require("../utils/TemplateUtils");
const strings_1 = __importDefault(require("../config/strings"));
class EmailTemplateClient {
    constructor() {
        this.cache = {};
        this.companyName = strings_1.default.defaultCompanyName;
        this.companyLogoUrl = strings_1.default.defaultCompanyLogoUrl;
    }
    static getInstance() {
        if (EmailTemplateClient.emailTemplateClient == null) {
            this.emailTemplateClient = new EmailTemplateClient();
        }
        return this.emailTemplateClient;
    }
    initConfig(companyName, companyLogoUrl) {
        this.companyLogoUrl = companyLogoUrl;
        this.companyName = companyName;
    }
    readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
                if (!err) {
                    resolve(data);
                }
                else {
                    reject(new TemplateCorruptedException_1.TemplateCorruptedException(err));
                }
            });
        });
    }
    readBaseTemplateFile(templateName) {
        return new Promise(async (resolve) => {
            let isBaseTemplateFound = false;
            Object.entries(baseTemplates_1.default).forEach(([, value]) => {
                if (value === templateName) {
                    isBaseTemplateFound = true;
                }
            });
            if (!isBaseTemplateFound) {
                resolve(new InvalidBaseTemplateException_1.InvalidBaseTemplatException());
            }
            if (this.cache[templateName] != null) {
                resolve({ result: 1, data: this.cache[templateName] });
            }
            else {
                try {
                    const res = await this.readFile(TemplateUtils_1.getBaseTemplateFullPath(templateName));
                    this.cache[templateName] = res;
                    resolve({ result: 1, data: res });
                }
                catch (exception) {
                    resolve(exception);
                }
            }
        });
    }
    readTemplateFile(templateName) {
        return new Promise(async (resolve) => {
            if (this.cache[templateName] != null) {
                resolve({ result: 1, data: this.cache[templateName] });
            }
            else {
                const res = await this.readFile(templateName);
                this.cache[templateName] = res;
                resolve({ result: 1, data: res });
            }
        });
    }
    escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    }
    replaceAll(str, find, replace) {
        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    }
    renderValuesIntoHTML(templateContent, values, skipMissingFields = false) {
        console.log(values);
        Object.entries(values).forEach(([key, value]) => {
            // tslint:disable-next-line: no-parameter-reassignment
            templateContent = this.replaceAll(templateContent, '$' + [key], value + '');
        });
        // tslint:disable-next-line: no-parameter-reassignment
        templateContent = this.replaceAll(templateContent, '$companyName', this.companyName);
        // tslint:disable-next-line: no-parameter-reassignment
        templateContent = this.replaceAll(templateContent, '$companyLogoUrl', this.companyLogoUrl);
        if (!skipMissingFields && templateContent.includes('$')) {
            throw new TemplateRenderException_1.TemplateRenderException();
        }
        else {
            return templateContent;
        }
    }
}
exports.EmailTemplateClient = EmailTemplateClient;
