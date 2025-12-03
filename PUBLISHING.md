# Publishing pseudo-l10n to npm

This guide explains how to publish the `pseudo-l10n` package to npm.

## Prerequisites

1. **npm account**: Create one at [npmjs.com](https://www.npmjs.com/signup) if you don't have one
2. **npm CLI**: Should already be installed with Node.js
3. **Git repository**: Package should be in a Git repository (recommended)

## Pre-Publishing Checklist

Before publishing, verify:

### 1. Test the Package Locally

```bash
# Run the demo
npm test

# Test CLI
node bin/cli.js examples/input.json examples/test-output.json

# Test programmatic API
node examples/demo.js
```

### 2. Check package.json

Verify these fields in `package.json`:
- ✅ `name`: "pseudo-l10n" (must be unique on npm)
- ✅ `version`: Start with "1.0.0"
- ✅ `description`: Clear description
- ✅ `main`: "index.js"
- ✅ `bin`: Points to "./bin/cli.js"
- ✅ `repository`: Your GitHub URL
- ✅ `keywords`: For discoverability
- ✅ `license`: "MIT"
- ✅ `files`: Lists what to include in package

### 3. Test Package Installation Locally

Test what will be published:

```bash
# Create a package tarball
npm pack

# This creates pseudo-l10n-1.0.0.tgz
# You can extract and inspect it to see what will be published
```

Test in another directory:

```bash
# In a different directory
mkdir test-install
cd test-install
npm init -y
npm install ../pseudo-l10n/pseudo-l10n-1.0.0.tgz

# Test the installed package
npx pseudo-l10n --help
```

### 4. Verify Files to be Published

Check what files will be included:

```bash
npm pack --dry-run
```

This should include:
- `index.js`
- `bin/cli.js`
- `README.md`
- `LICENSE`
- `package.json`

Should NOT include:
- `node_modules/`
- `.git/`
- `examples/` (excluded via .npmignore)
- `*.webp` (excluded via .npmignore)

## Publishing Steps

### Step 1: Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

Verify you're logged in:

```bash
npm whoami
```

### Step 2: Check Package Name Availability

Before publishing, verify the name is available:

```bash
npm search pseudo-l10n
```

If nothing returns, the name is available.

Or visit: https://www.npmjs.com/package/pseudo-l10n

### Step 3: Publish to npm

For first release:

```bash
npm publish
```

If the package name is scoped (e.g., `@yourusername/pseudo-l10n`), use:

```bash
npm publish --access public
```

### Step 4: Verify Publication

Check your package on npm:

```bash
npm view pseudo-l10n
```

Or visit: https://www.npmjs.com/package/pseudo-l10n

### Step 5: Test Installation from npm

```bash
# In a new directory
npm install -g pseudo-l10n

# Test it
pseudo-l10n --help
```

## After Publishing

### 1. Create a Git Tag

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Create GitHub Release

Go to GitHub repository → Releases → Create new release:
- Tag: v1.0.0
- Title: "v1.0.0 - Initial Release"
- Description: Summarize features and changes

### 3. Update README Badges

Ensure README.md has working badges:
- npm version badge
- License badge

### 4. Share Your Package

Share on:
- Twitter/X
- Dev.to
- Reddit (r/javascript, r/webdev)
- Your Medium article comment section

## Updating the Package

### For Bug Fixes (Patch Version)

```bash
# Make your changes
# Update version: 1.0.0 → 1.0.1
npm version patch

# Publish
npm publish

# Push changes and tag
git push origin features/generator --tags
```

### For New Features (Minor Version)

```bash
# Make your changes
# Update version: 1.0.1 → 1.1.0
npm version minor
npm publish
git push origin features/generator --tags
```

### For Breaking Changes (Major Version)

```bash
# Make your changes
# Update version: 1.1.0 → 2.0.0
npm version major
npm publish
git push origin features/generator --tags
```

## Unpublishing (If Needed)

⚠️ **Warning**: Only unpublish within 72 hours of publishing, and only if critical issues exist.

```bash
# Unpublish a specific version
npm unpublish pseudo-l10n@1.0.0

# Unpublish entire package (use with extreme caution)
npm unpublish pseudo-l10n --force
```

## Deprecating a Version

Better than unpublishing:

```bash
npm deprecate pseudo-l10n@1.0.0 "This version has a critical bug. Please upgrade to 1.0.1"
```

## Best Practices

1. **Semantic Versioning**: Follow semver (MAJOR.MINOR.PATCH)
2. **Changelog**: Maintain a CHANGELOG.md file
3. **Test Before Publish**: Always test locally first
4. **Don't Publish Secrets**: Check no API keys or credentials are in the code
5. **Use .npmignore**: Control what gets published
6. **Enable 2FA**: Secure your npm account with two-factor authentication

## Troubleshooting

### "Package name already exists"

Choose a different name or add a scope (@yourusername/pseudo-l10n)

### "You must be logged in to publish packages"

Run `npm login` and verify with `npm whoami`

### "You do not have permission to publish"

Check:
- You own the package name
- You're logged in as the correct user
- Your npm account is verified

### "ENEEDAUTH" Error

Your auth token expired. Run `npm login` again.

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [npm CLI Commands](https://docs.npmjs.com/cli/v9/commands)
- [Semantic Versioning](https://semver.org/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## Quick Reference

```bash
# One-time setup
npm login
npm whoami

# Publish workflow
npm test                    # Test your package
npm pack --dry-run         # Preview what will be published
npm publish                # Publish to npm
git tag v1.0.0            # Tag the release
git push --tags           # Push tags to GitHub

# Updates
npm version patch          # 1.0.0 → 1.0.1
npm version minor          # 1.0.1 → 1.1.0
npm version major          # 1.1.0 → 2.0.0
npm publish
git push --tags
```

---

Good luck with your npm package! 🚀
