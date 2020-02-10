import path from 'path';
export function getBaseTemplateFullPath(templateName: string): string {
  return path.join(__dirname, '../html_templates/' + templateName + '.html');
}
