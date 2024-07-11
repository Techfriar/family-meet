// src/controllers/controllers.js

export const getHome = (req, res) => {
    res.render('index', { title: 'Home' }); // Render the EJS template with a title
  };
  
  export const getAbout = (req, res) => {
    res.render('about', { title: 'About Us' }); // Render another EJS template
  };
  
  export const postFormData = (req, res) => {
    const formData = req.body;
    // Handle form data, e.g., save to database or process it
    res.send(`Form data received: ${JSON.stringify(formData)}`);
  };
  