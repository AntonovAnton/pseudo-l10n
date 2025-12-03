# RTL Placeholder Reversal - Technical Decision

## Question
Should placeholders be reversed in RTL mode?

## Answer
**It depends on your testing approach.**

## Implementation
The package supports BOTH approaches via the `reversePlaceholders` option:

- **Default:** `reversePlaceholders: true` (placeholders are reversed)
- **Alternative:** `reversePlaceholders: false` (placeholders stay normal)

## When to Use Each Approach

### 1. Testing Screenshots (reversePlaceholders: true) - DEFAULT
**Use this when:** You're testing static screenshots or visual designs

**Why reverse:**
- When you capture a screenshot of RTL text, the placeholder names themselves appear reversed
- Example: `{{name}}` appears as `{{eman}}` in the screenshot
- This helps detect:
  - Screenshot capture issues
  - Visual design problems
  - Documentation errors
  - Mock-up inconsistencies

**Command:**
```bash
pseudo-l10n en.json pseudo-ar.json --rtl
```

**Code:**
```javascript
generatePseudoLocaleSync('en.json', 'pseudo-ar.json', {
  rtl: true,
  reversePlaceholders: true  // default
});
```

### 2. Testing Live HTML (reversePlaceholders: false)
**Use this when:** You're testing a running application in a browser

**Why NOT reverse:**
- Browsers handle RTL text direction automatically
- The HTML rendering engine displays placeholders correctly
- Placeholder functionality works as expected
- Example: `{{name}}` stays `{{name}}` and works correctly

**Command:**
```bash
pseudo-l10n en.json pseudo-ar.json --rtl --no-reverse-placeholders
```

**Code:**
```javascript
generatePseudoLocaleSync('en.json', 'pseudo-ar.json', {
  rtl: true,
  reversePlaceholders: false
});
```

## Technical Details

### How RTL is Implemented
The package uses Unicode bidirectional control characters:
- `U+202E` (RIGHT-TO-LEFT OVERRIDE) - starts RTL
- `U+202C` (POP DIRECTIONAL FORMATTING) - ends RTL

These characters tell text rendering engines to display text right-to-left.

### What Gets Reversed
When `reversePlaceholders: true`:
- The placeholder **content** is reversed: `name` → `eman`
- The placeholder **format** is preserved: `{{name}}` → `{{eman}}`
- Regular text is already handled by accent mapping

## Example Comparison

### Input
```json
{
  "greeting": "Hello {{name}}, welcome!"
}
```

### Output with reversePlaceholders: true (default)
```json
{
  "greeting": "‮⟦Ħëļļõēēē {{eman}}, ŵëļçõɱëēēē!⟧‬"
}
```

### Output with reversePlaceholders: false
```json
{
  "greeting": "‮⟦Ħëļļõēēē {{name}}, ŵëļçõɱëēēē!⟧‬"
}
```

## Recommendation

**Start with the default (reversed placeholders)** because:
1. It catches more potential issues
2. It simulates the actual visual appearance in screenshots
3. It's better for comprehensive QA testing
4. You can always switch to `--no-reverse-placeholders` if needed

**Switch to non-reversed** only if:
- You're exclusively testing live HTML in browsers
- Reversed placeholders break your i18n library
- You're testing dynamic placeholder substitution

## Testing Strategy

**Comprehensive approach:**

1. **Use reversed placeholders (default)** for:
   - Initial QA review
   - Screenshot testing
   - Visual design validation
   - Documentation review

2. **Use non-reversed placeholders** for:
   - Functional testing in browser
   - Dynamic content testing
   - API integration testing
   - Automated UI tests

## Conclusion

The `reversePlaceholders` option gives you flexibility based on your testing needs. The default setting (reversed) provides more thorough testing coverage, especially for visual and screenshot-based QA workflows.
