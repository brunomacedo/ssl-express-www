'use strict';
module.exports = function(req, res, next) {
  var local = req.url;
  var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  var www = req.headers.host.replace(/www\./gi, '');
  var fullUrl = 'https://' + www + local;

  var removeSlash = function(site) {
    return site.replace(/\/$/, '');
  };

  if (schema !== 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (/^www\./i.test(req.headers.host) && schema === 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (/\/$/.test(fullUrl) && fullUrl !== 'https://' + www + '/') {
    res.redirect(removeSlash(fullUrl));
  } else {
    next();
  }
};
