module.exports = (app) => {
  const path = require('../controllers/controller.js');

  // Create a new user
  app.post('/jobapp', path.create);

  // Retrieve all user
  app.get('/users', path.findAll);

// Retrieve one user
  app.post('/retriveuser',path.findOne)

  // Update a user with userid
  app.put('/user/:id', path.update);

  // Delete a user with userid
  app.delete('/user/:id', path.delete);

  // Create a new job
  app.post('/newjobs', path.create_job);

  app.get('/getjobs', path.company_jobs);

  // Retrieve all job
  app.get('/jobs', path.findAll_jobs);
  app.get('/loginjobs', path.findAll_loginjobs);

  // Update a job 
  app.put('/updatedjob', path.update);

  // Delete a job with userid
  app.delete('/jobs/:id', path.delete_jobs);

  // Create a new apply
   app.post('/apply', path.applyjobs);
   app.get('/apply/find_applies/:user_id', path.find_applies);
   app.get('/applied/:companyname', path.findAll)




}