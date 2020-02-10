import { TemplateException } from './TemplateException';
import strings from '../config/strings';
import errorCodes from '../config/templateErrorCodes';
export class TemplateCorruptedException extends TemplateException {
  constructor(data: any) {
    super(errorCodes.templateCorruptedErrorCode, strings.templateNotFound);
  }
}
