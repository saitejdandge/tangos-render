"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailTemplateClient_1 = require("./clients/EmailTemplateClient");
// const t = async () => {
//   const res: any = await EmailTemplateClient.getInstance().readBaseTemplateFile(templates.userOTPTemplate);
//   EmailTemplateClient.getInstance().initConfig('theFrames', 'https://www.yahoo.com/');
//   console.log(EmailTemplateClient.getInstance().renderValuesIntoHTML(res.data, { user_name: 'Tej', otp: '1244' }));
// };
// t();
exports.default = {
    EmailTemplateClient: EmailTemplateClient_1.EmailTemplateClient,
};
