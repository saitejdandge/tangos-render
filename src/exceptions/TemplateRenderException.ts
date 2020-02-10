import { TemplateException } from './TemplateException';
import strings from '../config/strings';
import errorCodes from '../config/templateErrorCodes';
export class TemplateRenderException extends TemplateException {
  constructor() {
    super(errorCodes.templateRenderErrorCode, strings.templateRenderError);
  }
}
