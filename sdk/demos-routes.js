var widget_script_url = require('./widget_script_url');
var nconf = require('nconf');

var WIDGET_FALLBACK_CLIENTID = nconf.get('WIDGET_FALLBACK_CLIENTID');
var DOMAIN_URL_DOCS = nconf.get('DOMAIN_URL_DOCS');

module.exports = function (app) {
  ['custom', 'embedded', 'link', 'login', 'logincss'].forEach(function (demo) {
    app.get('/widget-demos/' + demo, function (req, res, next) {
      widget_script_url.get(req.query.a || WIDGET_FALLBACK_CLIENTID, function (err, url, tenant_domain) {
        if (err) return res.send(err);

        res.locals.auth0_sdk_route = url;
        res.locals.tenant_domain   = tenant_domain;
        res.locals.clientID        = req.query.a;
        res.locals.docs_route      = DOMAIN_URL_DOCS;
        
        next();
      });
    }, function (req, res) {
      res.render(__dirname + '/demos/' + demo);
    });
  });
};