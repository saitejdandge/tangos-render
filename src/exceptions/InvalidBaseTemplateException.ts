import { TemplateException } from './TemplateException';
import strings from '../config/strings';
import errorCodes from '../config/templateErrorCodes';
export class InvalidBaseTemplatException extends TemplateException {
  constructor() {
    super(errorCodes.invalidBaseTemplateErrorCode, strings.invalidBaseTemplate);
  }
}
