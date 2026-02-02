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
