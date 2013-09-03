module.exports = function(app) {
  app.get('/', app.auth, require('../lib/controllers/static').index);
  app.post('/signup', require('../lib/controllers/signup').signup);
  app.get('/ping', require('../lib/controllers/static').ping);
  // app.get('/model', require('../lib/controllers/model').index);
  // app.get('/model/new', require('../lib/controllers/model').new);
  // app.post('/model/new', require('../lib/controllers/model').create);
  // app.get('/model/:id', require('../lib/controllers/model').show);
  // app.get('/model/:id/edit', require('../lib/controllers/model').edit);
  // app.post('/model/:id', require('../lib/controllers/model').update);
};
