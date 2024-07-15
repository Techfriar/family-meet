import transporter from '../config/mail.js';
import Family from '../models/family.js';

export const getHome = (req, res) => {
  res.render('index', { title: 'Home' });
};

export const postFormData = async (req, res) => {
  try {
    const formData = {
      picture: req.file ? req.file.filename : '',
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      education: req.body.education,
      grandFather: req.body.grandFather === 'other' ? req.body.grandFatherName : req.body.grandFather || '',
      grandMother: req.body.grandMother === 'other' ? req.body.grandMotherName : req.body.grandMother || '',
      family: req.body.family === 'other' ? req.body.familyName : req.body.family || '',
      address: req.body.address
    };
    const newFamily = new Family(formData);
    const savedFamily = await newFamily.save();
    /**
    * Send response through email
    */

    // Prepare the email options
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: process.env.RECEIVER_MAIL, // Send the email to the admin
      subject: 'Anappadikkal Family Meet 2024',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
              }
              .header {
                background-color: #2C4A78;
                color: #fff;
                text-align: center;
                padding: 20px;
              }
              .content {
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Anappadikkal Family Meet 2024</h1>
              </div>
              <div class="content">
                <p>Dear Admin,</p>
                <p>A registration has been received. Here are the details:</p>
                <p><b>Name:</b> ${savedFamily.name}</p>
                <p><b>Age:</b> ${savedFamily.age}</p>
                <p><b>Gender:</b> ${savedFamily.gender}</p>
                <p><b>Education:</b> ${savedFamily.education}</p>
                <p><b>Grand Father's Name:</b> ${savedFamily.grandFather}</p>
                <p><b>Grand Mother's Name:</b> ${savedFamily.grandMother}</p>
                <p><b>Family Name:</b> ${savedFamily.family}</p>
                <p><b>Address:</b> ${savedFamily.address}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    const response = { success: true, message: 'Form data received and saved successfully' };
    res.json(response);
  } catch (error) {
    console.log(error);
    const errorResponse = { success: false, message: 'Internal Server Error' };
    res.status(500).json(errorResponse);
  }
};
