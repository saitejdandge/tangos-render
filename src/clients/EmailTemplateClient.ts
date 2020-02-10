import { TemplateRenderException } from './../exceptions/TemplateRenderException';
import { TemplateCorruptedException } from './../exceptions/TemplateCorruptedException';
import { InvalidBaseTemplatException } from '../exceptions/InvalidBaseTemplateException';
import templates from '../config/baseTemplates';
import fs from 'fs';
import { getBaseTemplateFullPath } from '../utils/TemplateUtils';
import strings from '../config/strings';
export class EmailTemplateClient {
  private static emailTemplateClient: EmailTemplateClient;
  public cache: any = {};

  private companyName: string = strings.defaultCompanyName;
  private companyLogoUrl: string = strings.defaultCompanyLogoUrl;
  public static getInstance(): EmailTemplateClient {
    if (EmailTemplateClient.emailTemplateClient == null) {
      this.emailTemplateClient = new EmailTemplateClient();
    }
    return this.emailTemplateClient;
  }
  public initConfig(companyName: string, companyLogoUrl: string) {
    this.companyLogoUrl = companyLogoUrl;
    this.companyName = companyName;
  }
  private readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(new TemplateCorruptedException(err));
        }
      });
    });
  }
  public readBaseTemplateFile(templateName: string): Promise<any> {
    return new Promise<any>(async resolve => {
      let isBaseTemplateFound: boolean = false;
      Object.entries(templates).forEach(([, value]) => {
        if (value === templateName) {
          isBaseTemplateFound = true;
        }
      });
      if (!isBaseTemplateFound) {
        resolve(new InvalidBaseTemplatException());
      }
      if (this.cache[templateName] != null) {
        resolve({ result: 1, data: this.cache[templateName] });
      } else {
        try {
          const res = await this.readFile(getBaseTemplateFullPath(templateName));
          this.cache[templateName] = res;
          resolve({ result: 1, data: res });
        } catch (exception) {
          resolve(exception);
        }
      }
    });
  }
  public readTemplateFile(templateName: string): Promise<any> {
    return new Promise<any>(async resolve => {
      if (this.cache[templateName] != null) {
        resolve({ result: 1, data: this.cache[templateName] });
      } else {
        const res = await this.readFile(templateName);
        this.cache[templateName] = res;
        resolve({ result: 1, data: res });
      }
    });
  }
  private escapeRegExp(str:string) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }
  private replaceAll(str: string, find: string, replace: string): string {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  public renderValuesIntoHTML(templateContent: string, values: any, skipMissingFields = false): string {
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
      throw new TemplateRenderException();
    } else {
      return templateContent;
    }
  }
}
