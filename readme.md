# Mail Notifier with Twilio Integration

This project is a **Mail Notifier** that checks emails from a Gmail account and sends them to a WhatsApp number using **Twilio**. The application uses **Twilio API** to send messages to a specified WhatsApp number when an email is received in the Gmail account.

## Requirements

Before running the application, you'll need to perform the following steps:

### 1. Set Up Twilio Account

1. **Create a Twilio Account**:
   - Go to [Twilio's Console](https://www.twilio.com/console).
   - Sign up or log in to your account.
   - After logging in, you will need to get the **Account SID** and **Auth Token** from the Twilio Console. These are required to connect to the Twilio API.

2. **Get a Twilio WhatsApp Number**:
   - In the Twilio Console, go to **Messaging > Senders**.
   - You can use the **Twilio Sandbox for WhatsApp** for development and testing.
   - Follow the steps in the Twilio Console to configure a WhatsApp sender number.

3. **Twilio Documentation**:
   - [Twilio Docs](https://www.twilio.com/docs)
   - [WhatsApp Sandbox Setup](https://www.twilio.com/docs/whatsapp/sandbox)

### 2. Set Up Gmail Account

1. **Enable IMAP on Gmail**:
   - Log in to your Gmail account.
   - Go to **Settings** > **See all settings** > **Forwarding and POP/IMAP**.
   - Enable **IMAP Access**.

2. **Enable 2-Step Verification on Gmail**:
   - Go to [Google Account Security](https://myaccount.google.com/security) and turn on **2-Step Verification**.

3. **Create an Application-Specific Password**:
   - After enabling 2-Step Verification, you need to create an **App Password** for the application to access Gmail securely.
   - Go to [Google's App Passwords page](https://myaccount.google.com/apppasswords) and follow the instructions to generate an **App Password**.
   - Use this generated password instead of your regular Gmail password in the app.

> **Important**: If you encounter a **"wrong password"** error when running the app, it means you need to provide the **application-specific password** instead of your regular Gmail password.

### 3. Set Up the Application

1. **Clone the Repository**:
   - Clone the repository to your local machine:
     ```bash
     git clone https://github.com/your-username/mail-notifier.git
     cd mail-notifier
     ```

2. **Install Dependencies**:
   - Install the required dependencies using `npm`:
     ```bash
     npm install
     ```

3. **Set Up Environment Variables**:
   - Inside the project directory, create a `.env` file to store your **Twilio Account SID**, **Auth Token**, and other sensitive data.
     ```
     TWILIO_ACCOUNT_SID=your_account_sid
     TWILIO_AUTH_TOKEN=your_auth_token
     ```

### 4. Start the Application

1. **Run the Application**:
   - Start the server using **nodemon** for automatic restarts:
     ```bash
     npm run dev
     ```

2. The application will now be running on **http://localhost:4000**.

### 5. Send Test Request using `curl`

Once the app is running, you can test it by sending a POST request to the API.

1. Open a terminal and run the following `curl` command to trigger the email-to-WhatsApp functionality:
   ```bash
   curl --location 'http://localhost:4000/send-mails' \
   --header 'Content-Type: application/json' \
   --data-raw '{
     "mailid":"youremail@gmail.com",
     "number":"+{countrycode}{yourphonenumber}",
     "password":"your_application_specific_password"
   }'
   ```

   Replace the placeholders:
   - `youremail@gmail.com` with your Gmail address.
   - `+{countrycode}{yourphonenumber}` with your phone number, including the country code.
   - `your_application_specific_password` with the app password you created in Gmail.

### 6. Connect Your Phone Number to Twilio WhatsApp Sandbox

To send WhatsApp messages via Twilio, you need to connect your phone number to the **Twilio WhatsApp Sandbox**.

1. **Enroll Your Number in the Sandbox**:
   - In the Twilio Console, navigate to **Messaging > Try it Out > Send WhatsApp Messages**.
   - You will see a WhatsApp Sandbox number, and instructions to connect your phone. The usual process is:
     - Send the command `join {code}` to the WhatsApp number displayed in the sandbox settings.
     - Replace `{code}` with the unique code provided in the sandbox setup page.

2. **Reply with the Code**:
   - After sending the `join` message, you should receive a confirmation message from Twilio. Make sure you reply with the code provided.

3. **Update the Twilio WhatsApp Number**:
   - Once connected, replace the default `whatsapp:+14155238886` number in your code with the WhatsApp number from the Twilio Sandbox.

### Troubleshooting

- **Error: Wrong Password**: If you receive an error indicating that the password is incorrect, ensure you have entered the correct **application-specific password** for your Gmail account (instead of your regular Gmail password).
  
  [Click here for instructions on creating an app password](https://myaccount.google.com/apppasswords).

- **Error: Could not connect to Twilio API**: Double-check your **Twilio Account SID** and **Auth Token** in your `.env` file to ensure they are correct.

- **WhatsApp Not Sending**: Make sure your phone number is correctly enrolled in the **Twilio Sandbox** and that you have replied with the correct code.

### Additional Links

- [Twilio API Documentation](https://www.twilio.com/docs)
- [Twilio WhatsApp Sandbox Setup](https://www.twilio.com/docs/whatsapp/sandbox)
- [Gmail IMAP Settings](https://support.google.com/mail/answer/7126229?hl=en)
- [Google App Passwords](https://myaccount.google.com/apppasswords)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides step-by-step instructions for setting up the **Mail Notifier** with Twilio integration. After following the steps, you'll be able to run the app, send emails, and receive notifications via WhatsApp.