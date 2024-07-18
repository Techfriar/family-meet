import transporter from '../config/mail.js';
import Family from '../models/family.js';

export const getHome = (req, res) => {
  res.render('index', { title: 'Home' });
};

// Add translations for Malayalam
const translations = {
  en: {
    age: {
      '0': '0-18',
      '1': '18-50',
      '2': '50+'
    },
    gender: {
      '0': 'Male',
      '1': 'Female'
    },
    education: {
      '0': 'LKG/UKG',
      '1': 'SSLC',
      '2': '+2',
      '3': 'Degree',
      '4': 'PG',
      '5': 'PHD'
    },
    relatedTo: {
      '0': 'Mohideenkutty (Peechi Master)',
    },
    relatedTo2: {
      '0': 'Fathimakutty'
    },
    family: {
      '0': 'Anapaddikal Family'
    }
  },
  ml: {
    age: {
      '0': '0-18',
      '1': '18-50',
      '2': '50+'
    },
    gender: {
      '0': 'പുരുഷൻ',
      '1': 'സ്ത്രീ'
    },
    education: {
      '0': 'എൽകെജി/യുകെജി',
      '1': 'എസ്എസ്എൽസി',
      '2': '+2',
      '3': 'ഡിഗ്രി',
      '4': 'പിജി',
      '5': 'പിഎച്ച്ഡി'
    },
    relatedTo: {
      '0': 'മൊഹിദീൻകുട്ടി (പീച്ചി മാഷ്)',
    },
    relatedTo2: {
      '0': 'ഫാത്തിമക്കുട്ടി'
    },
    family: {
      '0': 'ആനപ്പടിക്കൽ കുടുംബം'
    }
  }
};

export const postFormData = async (req, res) => {
  try {
    const language = req.body.currentLanguage || 'en';
    const formData = {
      picture: req.file ? req.file.filename : '',
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      education: req.body.education,
      relatedTo: req.body.relatedTo === '1' ? req.body.relatedToName : req.body.relatedTo,
      relatedTo2: req.body.relatedTo2 === '1' ? req.body.relatedTo2Name : req.body.relatedTo2,
      family: req.body.family === '1' ? req.body.familyName : req.body.family,
      phone: req.body.phone,
      employment: req.body.employment,
      address: req.body.address,
      language: language
    };

    const newFamily = new Family(formData);
    const savedFamily = await newFamily.save();

    // Prepare the email options
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: process.env.RECEIVER_MAIL,
      subject: 'Anappadikkal Family Meet 2024',
      html: `
          <html>
          <head>
              <style>
                  body { font-family: Arial, sans-serif; }
                  .container { max-width: 600px; margin: 0 auto; }
                  .header { background-color: #2C4A78; color: #fff; text-align: center; padding: 20px; }
                  .content { padding: 20px; }
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
                      <p><b>Age:</b> ${convertFormValue('age', savedFamily.age, language)}</p>
                      <p><b>Gender:</b> ${convertFormValue('gender', savedFamily.gender, language)}</p>
                      <p><b>Education:</b> ${convertFormValue('education', savedFamily.education, language)}</p>
                      <p><b>Related to:</b> ${convertFormValue('relatedTo', savedFamily.relatedTo, language)}</p>
                      <p><b>Related to:</b> ${convertFormValue('relatedTo2', savedFamily.relatedTo2, language)}</p>
                      <p><b>Family Name:</b> ${convertFormValue('family', savedFamily.family, language)}</p>
                      <p><b>Phone:</b> ${savedFamily.phone}</p>
                      <p><b>Employment:</b> ${savedFamily.employment}</p>
                      <p><b>Address:</b> ${savedFamily.address}</p>
                  </div>
              </div>
          </body>
          </html>
          `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    const response = { success: true, message: 'Form data received and saved successfully' };
    res.json(response);
  } catch (error) {
    const errorResponse = { success: false, message: 'Internal Server Error' };
    res.status(500).json(errorResponse);
  }
};

// Updated helper function to convert form values based on language
function convertFormValue(field, value, language) {
  if (translations[language] && translations[language][field] && translations[language][field][value]) {
    return translations[language][field][value];
  }

  // For custom inputs (when the value is not in the translations)
  return value;
}