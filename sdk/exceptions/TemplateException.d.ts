export declare class TemplateException extends Error {
    opStatus: number;
    result: number;
    message: string;
    constructor(opStatus: number, message: string);
}
