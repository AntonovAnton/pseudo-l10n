# Quick Reference Card

## Installation
```bash
npm install -g pseudo-l10n
# or
npm install --save-dev pseudo-l10n
```

## CLI Usage
```bash
# Basic
pseudo-l10n input.json output.json

# With options
pseudo-l10n en.json pseudo-en.json --expansion=30 --rtl

# Help
pseudo-l10n --help
```

## Programmatic Usage
```javascript
const { generatePseudoLocaleSync, pseudoLocalize } = require('pseudo-l10n');

// Generate file
generatePseudoLocaleSync('en.json', 'pseudo-en.json', {
  expansion: 40,
  rtl: false
});

// Single string
const result = pseudoLocalize('Hello {{name}}!');
```

## Common Options
| Option | CLI | Code | Default |
|--------|-----|------|---------|
| Expansion | `--expansion=40` | `expansion: 40` | 40 |
| Placeholder format | `--placeholder-format="{{key}}"` | `placeholderFormat: "{{key}}"` | `"{{key}}"` |
| Replace placeholders | `--replace-placeholders` | `replacePlaceholders: true` | false |
| Start marker | `--start-marker="⟦"` | `startMarker: "⟦"` | `"⟦"` |
| End marker | `--end-marker="⟧"` | `endMarker: "⟧"` | `"⟧"` |
| RTL mode | `--rtl` | `rtl: true` | false |
| Reverse placeholders | `--no-reverse-placeholders` | `reversePlaceholders: false` | true |

## Placeholder Formats
| Framework | Format | Example CLI |
|-----------|--------|-------------|
| i18next | `{{key}}` | `--placeholder-format="{{key}}"` |
| Angular | `{key}` | `--placeholder-format="{key}"` |
| sprintf | `%key%` | `--placeholder-format="%key%"` |
| ES6 | `${key}` | `--placeholder-format="\${key}"` |

## Example Transformations
```
Input:  "Welcome to our app"
Output: "⟦Ŵëļçõɱë ţõ õür àƥƥēēēēēēēēēē⟧"

Input:  "Hello {{name}}!"
Output: "⟦Ħëļļõēēē {{name}}!ē⟧"
```

## npm Scripts Integration
```json
{
  "scripts": {
    "pseudo": "pseudo-l10n src/locales/en.json src/locales/pseudo-en.json",
    "pseudo:rtl": "pseudo-l10n src/locales/en.json src/locales/pseudo-ar.json --rtl"
  }
}
```

## Publishing to npm
```bash
npm login
npm publish
git tag v1.0.0
git push --tags
```

## Resources
- 📖 README.md - Full documentation
- 📦 PUBLISHING.md - Publishing guide
- 🌐 RTL-PLACEHOLDERS.md - RTL technical guide
- 📝 CHANGELOG.md - Version history
- 📰 https://medium.com/@AntonAntonov88/i18n-testing-a-practical-guide-for-qa-engineers-a92f7f4fc8b2
