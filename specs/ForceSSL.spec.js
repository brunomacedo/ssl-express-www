import { expect } from 'chai';
import ForceSSL from '../source/ForceSSL';

describe('Package Express Force HTTPS', () => {
  it('Should do nothing when localhost is required', () => {
    const req = {
      url: '/app',
      headers: {
        'x-forwarded-proto': 'http',
        host: 'localhost:3000',
      },
    };
    let next = () => `${req.headers['x-forwarded-proto']}://${req.headers.host}${req.url}`;
    const res = {
      redirect(callback) {
        next = callback;
        return next;
      },
    };
    ForceSSL(req, res, next);
    expect(res.redirect(next())).to.be.equal('http://localhost:3000/app');
  });

  it('Should force schema to HTTPS when HTTP is require', () => {
    const req = {
      url: '/',
      headers: {
        'x-forwarded-proto': 'http',
        host: 'example.com.br',
      },
    };
    let next = () => `${req.headers['x-forwarded-proto']}://${req.headers.host}${req.url}`;
    const res = {
      redirect(callback) {
        next = callback;
        return next;
      },
    };
    ForceSSL(req, res, next);
    expect(res.redirect(next)).to.be.equal('https://example.com.br');
  });

  it('Should remove www and forces HTTPS', () => {
    const req = {
      url: '/',
      headers: {
        'x-forwarded-proto': 'http',
        host: 'www.example.com.br',
      },
    };
    let next = () => `${req.headers['x-forwarded-proto']}://${req.headers.host}${req.url}`;
    const res = {
      redirect(callback) {
        next = callback;
        return next;
      },
    };
    ForceSSL(req, res, next);
    expect(res.redirect(next)).to.be.equal('https://example.com.br');
  });

  it('Should remove trailing slash when path is require', () => {
    const req = {
      url: '/app/',
      headers: {
        'x-forwarded-proto': 'https',
        host: 'example.com.br',
      },
    };

    let next = () => `${req.headers['x-forwarded-proto']}://${req.headers.host}${req.url}`;
    const res = {
      redirect(callback) {
        next = callback;
        return next;
      },
    };
    ForceSSL(req, res, next);
    expect(res.redirect(next)).to.be.equal('https://example.com.br/app');
  });
});
