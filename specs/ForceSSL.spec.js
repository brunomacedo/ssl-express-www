import { expect } from 'chai';
import { spy } from 'sinon';
import ForceSSL from '../source/ForceSSL';

describe('Package Express Force HTTPS', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      url: '/app',
      headers: {
        'x-forwarded-proto': 'http',
        host: 'localhost:3000'
      }
    };
    res = {
      redirect: spy()
    };

    next = spy();
  });

  it('Should do nothing when localhost is required', () => {
    ForceSSL(req, res, next);
    expect(next.called).to.equal(true);
  });

  it('Should force schema to HTTPS when HTTP is require', () => {
    req = {
      url: '/',
      headers: {
        'x-forwarded-proto': 'http',
        host: 'example.com.br'
      }
    };
    ForceSSL(req, res, next);
    expect(res.redirect.calledWith('https://example.com.br')).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('Should remove www and forces HTTPS', () => {
    req = {
      url: '/',
      headers: {
        'x-forwarded-proto': 'http',
        host: 'www.example.com.br'
      }
    };

    ForceSSL(req, res, next);
    expect(res.redirect.calledWith('https://example.com.br')).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('Should remove trailing slash when path is require', () => {
    req = {
      url: '/app/',
      headers: {
        'x-forwarded-proto': 'https',
        host: 'example.com.br'
      }
    };
    ForceSSL(req, res, next);
    expect(res.redirect.calledWith('https://example.com.br/app')).to.equal(
      true
    );
    expect(next.called).to.equal(false);
  });
});
