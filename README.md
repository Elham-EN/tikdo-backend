## API Documentation

Interactive API docs powered by Swagger UI.

**Access:** http://localhost:3000/docs

**Add new endpoints:** Edit `src/docs/openapi.ts`

```ts
'/api/v1/users': {
  get: {
    summary: 'Get all users',
    tags: ['Users'],
    responses: {
      '200': { description: 'Success' }
    }
  }
}
```

---

## Code Quality

### ESLint & Prettier

| Tool         | Purpose                                                      |
| ------------ | ------------------------------------------------------------ |
| **ESLint**   | Catches bugs, enforces best practices, prevents bad patterns |
| **Prettier** | Auto-formats code for consistent style                       |

### Commands

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix

# Format code
npm run format

# Check formatting without changes
npm run format:check
```

### When to Use

- **Before committing**: Run `npm run lint:fix && npm run format`
- **During development**: IDE extensions auto-fix on save
- **In CI/CD**: Run `npm run lint && npm run format:check` to block bad code

### IDE Setup (VSCode)

Install extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

---

## Testing

### Overview

Testing is powered by **Jest** with **TypeScript** support via `ts-jest`.

| Test Type       | Location             | Purpose                                        |
| --------------- | -------------------- | ---------------------------------------------- |
| **Unit**        | `tests/unit/`        | Test individual functions/modules in isolation |
| **Integration** | `tests/integration/` | Test multiple components working together      |

### Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

### Writing Tests

Create test files with `.test.ts` extension:

```ts
import { describe, it, expect } from '@jest/globals';

describe('MyFunction', () => {
  it('should return expected result', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });

  it('should handle async operations', async () => {
    const result = await asyncFunction();
    expect(result).toBeDefined();
  });
});
```

### File Structure

```
tests/
├── unit/           # Unit tests
│   └── *.test.ts
└── integration/    # Integration tests
    └── *.test.ts
```

### Coverage

After running `npm run test:coverage`, view the report:

- **Terminal**: Summary displayed after tests
- **HTML**: Open `coverage/index.html` in browser
- **CI/CD**: Use `coverage/lcov.info` for coverage tools

---

## CI/CD (GitHub Actions)

### Overview

Automated checks run on every push and pull request to `main` and `develop` branches.

### What Gets Checked

| Step | What it does |
|------|--------------|
| **Lint** | Runs ESLint to catch code issues |
| **Format** | Checks Prettier formatting |
| **Type check** | Validates TypeScript types |
| **Test** | Runs all Jest tests |

### Setup Instructions

1. **File location**: `.github/workflows/ci.yml` (already created)

2. **Push to GitHub**:
   ```bash
   git add .github/workflows/ci.yml
   git commit -m "chore(ci): add GitHub Actions workflow"
   git push
   ```

3. **View results**: Go to your GitHub repo → **Actions** tab

4. **(Optional) Enable branch protection**:
   - Go to repo **Settings** → **Branches**
   - Click **Add rule** for `main`
   - Enable **Require status checks to pass before merging**
   - Select `build-and-test` from the list

### Status Badge

Add to the top of your README:

```md
![CI](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg)
```

---

## Conventional Commits

Format: `type(scope): description`

| Type       | When to Use                          |
| ---------- | ------------------------------------ |
| `feat`     | New feature                          |
| `fix`      | Bug fix                              |
| `docs`     | Documentation only                   |
| `style`    | Formatting, no code change           |
| `refactor` | Code restructure, no behavior change |
| `test`     | Adding/updating tests                |
| `chore`    | Build, config, dependencies          |

### Examples

```bash
feat(auth): add login endpoint
fix(api): handle null response
docs(readme): update setup instructions
refactor(users): extract validation logic
chore(deps): upgrade express to v5
```

### Rules

- Use lowercase
- No period at end
- Keep under 72 characters
- Use imperative mood ("add" not "added")

---

## Git Branches

### Branch Naming

Format: `type/short-description`

| Prefix     | Purpose                 |
| ---------- | ----------------------- |
| `main`     | Production-ready code   |
| `develop`  | Integration branch      |
| `feature/` | New features            |
| `fix/`     | Bug fixes               |
| `hotfix/`  | Urgent production fixes |
| `release/` | Release preparation     |

### Examples

```bash
feature/user-authentication
feature/add-payment-api
fix/login-validation-error
hotfix/security-patch
release/v1.2.0
```

### Workflow

```bash
# Create feature branch
git checkout -b feature/add-login develop

# Work on feature...
git add .
git commit -m "feat(auth): add login endpoint"

# Push and create PR
git push -u origin feature/add-login

# Go back to main branch
git checkout main

# Get update remote repo
git pull

# After PR merged, delete branch
git branch -d feature/add-login
```

### Rules

- Branch from `develop` for features/fixes
- Branch from `main` for hotfixes
- Keep branch names short and descriptive
- Delete branches after merging
