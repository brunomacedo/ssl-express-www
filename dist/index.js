/*!
 * ssl-express-www v3.0.2
 * git+https://github.com/brunomacedo/ssl-express-www.git
 * License MIT © Bruno Macedo
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sslExpress = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
