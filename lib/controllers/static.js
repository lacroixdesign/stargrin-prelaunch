/*
 * GET /
 */

exports.index = function(req, res) {
  res.render('static/index', {
    title: 'Celebrity & Fan Experiences'
  });
};

/*
 * GET /ping
 */

exports.ping = function(req, res) {
  res.send(200);
};
