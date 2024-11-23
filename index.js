require('dotenv').config();
const Twilio = require("twilio");
const express = require("express");
const bodyParser = require("body-parser");
const Imap = require("imap-simple");
const cors = require("cors");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioClient = Twilio(accountSid, authToken);
const twilioWhatsappNumber = "whatsapp:************";

const app = express();

app.use(cors());
app.use(express.json());



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let ImapConfig = {
  imap: {
    user: "",
    password: "",
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    authTimeout: 3000,
    tlsOptions: { rejectUnauthorized: false },
  },
};

app.post("/send-mails", async (req, res) => {
  try {
    const email = req.body.mailid;
    const userPassword = req.body.password;
    const userPhoneNumber = req.body.number;

    if (!email || !userPassword || !userPhoneNumber) {
      return res
        .status(400)
        .json({
          error: "Missing required fields: email, password, or phone number.",
        });
    }

    ImapConfig = {
      ...ImapConfig,
      imap: {
        ...ImapConfig.imap,
        user: email,
        password: userPassword,
      },
    };

    const response = await SendEmailsToWhatsapp(userPhoneNumber);
    res
      .status(200)
      .json({
        message: "Emails sent successfully to WhatsApp.",
        data: response,
      });
  } catch (error) {
    console.error("Error in /send-mails:", error);

    if(error?.textCode==='AUTHENTICATIONFAILED'){
      res
      .status(500)
      .json({error:'Please enter the application password of your gmail app'});
    }else{
      res
      .status(500)
      .json(error);
    }
  }
});

async function fetchEmails() {
  try {
    const connection = await Imap.connect(ImapConfig);
    await connection.openBox("INBOX");
    const searchCriteria = ["SEEN", ["SUBJECT", "newsletter"]];
    const fetchOptions = {
      bodies: ["HEADER.FIELDS (FROM SUBJECT DATE)", "TEXT"],
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    const emailDetails = [];

    for (let msg of messages) {
      const body = msg.parts.filter((part) => part.which !== "TEXT")[0];
      const parsed = body.body;
      emailDetails.push({
        subject: parsed.subject,
        from: parsed.from,
        date: parsed.date,
      });
    }

    connection.end();
    return emailDetails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
}

async function sendToWhatsapp(message, userPhoneNumber) {
  try {
    const res = await twilioClient.messages.create({
      body: message,
      from: twilioWhatsappNumber,
      to: `whatsapp:${userPhoneNumber}`,
    });
    return res;
  } catch (err) {
    console.log('err :>> ', err);
  }
}

async function SendEmailsToWhatsapp(userPhoneNumber) {
  try {
    const emails = await fetchEmails();

    if (emails.length === 0) {
      console.log("No matching emails found.");
      return { message: "No emails to send." };
    }

    for (let email of emails) {
      const message = `
        Subject: ${email.subject}
        From: ${email.from}
        Date: ${email.date}
      `;
      await sendToWhatsapp(message, userPhoneNumber);
    }

    return { message: "All emails sent to WhatsApp successfully." };
  } catch (error) {
    throw error;
  }
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Client is listening on port ${port}!`);
});
