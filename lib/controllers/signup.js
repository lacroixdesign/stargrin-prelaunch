var mcapi = require('mailchimp-api')
  , mc    = new mcapi.Mailchimp(process.env.MAILCHIMP_KEY);

/*
 * POST /signup
 */
exports.signup = function(req, res) {
  if (req.body.list && req.body.email) {
    mc.lists.subscribe({
      id: req.body.list,
      email: { email: req.body.email }
    }, function() {
      // success
      res.send(200);
    }, function(error) {
      // error
      var msg;
      if ('List_AlreadySubscribed' === error.name) {
        msg = "Oops! It appears that you're already signed up.";
      } else {
        msg = error.name;
      }
      res.json(400, { msg: msg });
    });
  } else {
    res.send(400);
  }
};
