
export const getHome = (req, res) => {
  res.render('index', { title: 'Home' });
};

export const postFormData = (req, res) => {
  const formData = req.body;
  console.log(req.body);
  // Handle form data, e.g., save to database or process it
  res.send(`Form data received: ${JSON.stringify(formData)}`);
};
