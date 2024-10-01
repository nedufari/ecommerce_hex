import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { readFile } from 'fs';
import * as path from  'path'
import * as fs from 'fs';

@Injectable()
export class MailService {
  constructor(private mailservice: MailerService) {}

  private resolveTemplatePath(templateName: string): string {
    const possiblePaths = [
      path.join(__dirname, '..', 'mailer', 'templates', templateName),
      path.join(process.cwd(), 'src', 'mailer', 'templates', templateName),
      path.join(process.cwd(), 'dist', 'mailer', 'templates', templateName),
    ];

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }

    throw new Error(`Template file ${templateName} not found`);
  }



  async VerifyOtpMail(email: string, otpCode: string, name: string): Promise<void> {
    const subject = 'Otp Verification Email';

     // Load the HTML template
     const templatePath = this.resolveTemplatePath('verify-email.html');
     let content = fs.readFileSync(templatePath, 'utf-8');
     
     content = content.replace('${name}', name);
     content = content.replace('${otpCode}', otpCode)
    

      await this.mailservice.sendMail({
        to: email,
        subject: subject,
        html: content,
     
      })
  }


  async WelcomeMail(email: string, name: string): Promise<void> {
    const subject = 'Welcome To Our Ecommerce';

    // Load the HTML template
    const templatePath = this.resolveTemplatePath('welcome-email.html');
    let content = fs.readFileSync(templatePath, 'utf-8');
    
    content = content.replace('${name}', name);

    await this.mailservice.sendMail({
      to: email,
      subject: subject,
      html: content,
    });
  }

  async ForgotPasswordMail(email: string, otpCode: string, name: string): Promise<void> {
    const subject = 'Forgot Password Otp';

     // Load the HTML template
     const templatePath = this.resolveTemplatePath('forgot-password-email.html');
     let content = fs.readFileSync(templatePath, 'utf-8');
     
     content = content.replace('${name}', name);
     content = content.replace('${otpCode}', otpCode)
    

      await this.mailservice.sendMail({
        to: email,
        subject: subject,
        html: content,
     
      })
  }
}
