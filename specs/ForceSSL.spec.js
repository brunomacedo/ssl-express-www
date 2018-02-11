import { expect } from 'chai';
import ForceSSL from '../source/ForceSSL';

describe('Package Express Force HTTPS', () => {
  it('Should force schema to HTTPS when HTTP is require', () => {
    const req = {
      url: '/',
      headers: {
        'x-forwarded-proto': '',
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

  it('Should remove www and force HTTPS', () => {
    const req = {
      url: '/',
      headers: {
        'x-forwarded-proto': '',
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

  it('Should remove slash-end when path is require', () => {
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
