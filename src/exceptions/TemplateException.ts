export class TemplateException extends Error {
  public opStatus: number;
  public result: number = 0;
  public message: string;
  constructor(opStatus: number, message: string) {
    super(message);
    this.opStatus = opStatus;
    this.message = message;
  }
}
