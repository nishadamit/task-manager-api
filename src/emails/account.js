const sgMail = require("@sendgrid/mail");
const sendGridApi = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridApi);

const sendWelcomeEmail = (email, name) => {
  console.log(email, name);
  sgMail
    .send({
      to: `${email}`,
      from: "amitn590@gmail.com",
      subject: "Thanks for joining in!",
      text: `Welcome to the app,${name}. Let me know how you get along the app`,
    })
    .then(() => console.log("mail send successfully!"))
    .catch((error) => console.log("message in sending mail", error.message));
};

const sendCancelationEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "amitn590@gmail.com",
      subject: "Sorry to see you go!",
      text: `Goodbye, ${name}. I hope to see you backtime soon`,
    })
    .then(() => console.log("Cancellation mail send successfully!"))
    .catch((error) => console.log("message in sending mail", error.message));
};

module.exports = { sendWelcomeEmail, sendCancelationEmail };
