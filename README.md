# Mock Production App

A deliberately buggy Node.js API that serves as the triage target for the Auto-Triage Agent.

## Endpoints

| Method | Path            | Behavior |
|--------|-----------------|----------|
| GET    | `/health`       | Returns 200 `{"status":"ok"}` |
| GET    | `/null-pointer` | TypeError — null dereference |
| POST   | `/bad-json`     | SyntaxError — unguarded JSON.parse |

## Run

```bash
npm install
npm start    # listens on PORT (default 4000)
```

## Error log format

Errors are written to stderr as:
```
[ERROR] <message>
    at <frame> (<file>:<line>:<col>)
    ...
```

CloudWatch groups these using multiline pattern `^\[ERROR\]`.

## Branches

- `main` (prod) — the production branch, target for hotfix PRs
- `dev` — development/playground branch
- `qa` — QA/staging branch
