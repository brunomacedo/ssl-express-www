# ssl-express-www

Express middleware that redirects HTTP → HTTPS, strips a `www.` prefix, and removes trailing slashes. Published to npm as `ssl-express-www`.

## Build

```bash
npm run build   # tsc -p tsconfig.json: compiles src/ -> lib/
```

There is no test suite and no lint script configured in `package.json`. There is no `npm start`/dev server — this is a library, not an app.

## Architecture

- `src/index.ts` is the entire implementation: a single default-exported Express middleware function `(req, res, next)`. Everything else is generated or a thin wrapper:
  - `tsc` compiles `src/index.ts` → `lib/index.js` (CommonJS, per `tsconfig.json`'s `rootDir`/`outDir`). **Never edit `lib/index.js` by hand** — it is build output and will be overwritten by `npm run build`.
  - `index.js` (repo root) is the npm package's `main` entry and just does `module.exports = require('./lib/index.js')`.
  - `package.json` `files` only ships `lib` and `index.js` to npm — `src` is not published.
- Redirect logic in `src/index.ts` combines several checks into one computed `fullUrl` and issues at most one redirect per request, in order:
  1. Not on `https` (via `x-forwarded-proto` header) → redirect.
  2. Host starts with `www.` while already on `https` → redirect to the `www.`-stripped host.
  3. URL has a trailing slash (and isn't just `/`) → redirect with it removed.
  4. Otherwise call `next()`.
  - All three redirect checks target the *same* `fullUrl` (built once at the top from the `www`-stripped host + `req.url`), so a single request can only ever be redirected once even if multiple conditions would apply.
  - Requests where the (www-stripped) host contains `localhost` skip all redirect logic entirely (`notLocalHost` guard) — always preserve this when touching the logic, since it's what makes local development work without HTTPS.

## Conventions

- Formatting is enforced by Prettier config in `.prettierrc`: single quotes, no trailing commas, 2-space indent, `arrowParens: "avoid"`.
- `tsconfig.json` has `strict: true` — keep new code strictly typed.
- After changing `src/index.ts`, run `npm run build` so `lib/index.js` stays in sync before committing (the compiled output is checked in).
