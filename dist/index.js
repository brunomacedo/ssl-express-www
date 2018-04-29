/*!
 * ssl-express-www v1.3.0
 * git+https://github.com/brunomacedo/ssl-express-www.git
 * License MIT © Bruno Macedo
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.sslExpress = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  var local = req.url;
  var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  var www = req.headers.host.replace(/www\./gi, '');
  var fullUrl = 'https://' + www + local;
  var removeSlash = function removeSlash(site) {
    return site.replace(/\/$/, '');
  };

  var notLocalHost = function notLocalHost() {
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
