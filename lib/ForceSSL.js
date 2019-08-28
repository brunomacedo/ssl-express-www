'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  const local = req.url;
  const schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  const www = req.headers.host.replace(/www\./gi, '');
  const fullUrl = 'https://' + www + local;
  const removeSlash = function removeSlash(site) {
    return site.replace(/\/$/, '');
  };

  const notLocalHost = function notLocalHost() {
    return www.indexOf('localhost') < 0;
  };

  if (notLocalHost() && schema !== 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (notLocalHost() && /^www\./i.test(req.headers.host) && schema === 'https') {
    res.redirect(removeSlash(fullUrl));
  } else if (notLocalHost() && /\/$/.test(fullUrl) && fullUrl !== 'https://' + www + '/') {
    res.redirect(removeSlash(fullUrl));
  }

  return next();
};

module.exports = exports['default'];