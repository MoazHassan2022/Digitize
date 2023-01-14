const nodemailer = require("nodemailer");
const pug = require("pug");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Admin<${process.env.EMAIL_USERNAME}>`;
  }
  newTransport() {
    try {
        return nodemailer.createTransport({
          service: "Outlook",
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
          tls: { rejectUnauthorized: false },
        });
    } catch (err) {
      console.log(err);
    }
  }
  send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    this.newTransport().sendMail(emailOptions, (err) => {
      if (err) console.log(err);
    });
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "رابط اعادة ادخال كلمة المرور (صالح لمدة 10 دقائق فقط)"
    );
  }
};
