/*
 * GET /
 */

exports.index = function(req, res) {
  res.render('static/index', {
    title: 'Home'
  });
};

/*
 * GET /ping
 */

exports.ping = function(req, res) {
  res.send(200);
};
