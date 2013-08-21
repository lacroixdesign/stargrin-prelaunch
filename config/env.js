var dotenv = require('dotenv')();

module.exports = function(app, express) {

  // development
  if ('development' === app.get('env')) {
    dotenv.load();
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  }

  // test
  if ('test' === app.get('env')) {
    dotenv.load();
  }

  // production
  // if ('production' === app.get('env')) {}

  if (process.env.USERNAME && process.env.PASSWORD) {
    app.auth = express.basicAuth(process.env.USERNAME, process.env.PASSWORD);
  }

};
