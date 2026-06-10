import { Request, Response, NextFunction } from "express";

const removeSlash = (site: string): string => site.replace(/\/$/, '');

export default (req: Request, res: Response, next: NextFunction): void => {
  const local: string = req.url;
  const schema: string = (req.headers['x-forwarded-proto'] || '').toString().toLowerCase();
  const hostHeader: string = req.headers.host || '';
  const www: string = hostHeader.replace(/www\./gi, '');
  const fullUrl: string = `https://${www}${local}`;
  const notLocalHost: boolean = !www.includes('localhost');

  if (notLocalHost) {
    if (schema !== 'https') {
      return res.redirect(removeSlash(fullUrl));
    }

    if (/^www\./i.test(hostHeader) && schema === 'https') {
      return res.redirect(removeSlash(fullUrl));
    }

    if (/\/$/.test(fullUrl) && fullUrl !== `https://${www}/`) {
      return res.redirect(removeSlash(fullUrl));
    }
  }

  return next();
};
