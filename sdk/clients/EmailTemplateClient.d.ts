export declare class EmailTemplateClient {
    private static emailTemplateClient;
    cache: any;
    private companyName;
    private companyLogoUrl;
    static getInstance(): EmailTemplateClient;
    initConfig(companyName: string, companyLogoUrl: string): void;
    private readFile;
    readBaseTemplateFile(templateName: string): Promise<any>;
    readTemplateFile(templateName: string): Promise<any>;
    private escapeRegExp;
    private replaceAll;
    renderValuesIntoHTML(templateContent: string, values: any, skipMissingFields?: boolean): string;
}
