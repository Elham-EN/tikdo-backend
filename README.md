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

| Tool | Purpose |
|------|---------|
| **ESLint** | Catches bugs, enforces best practices, prevents bad patterns |
| **Prettier** | Auto-formats code for consistent style |

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

## Conventional Commits

Format: `type(scope): description`

| Type | When to Use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code restructure, no behavior change |
| `test` | Adding/updating tests |
| `chore` | Build, config, dependencies |

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
