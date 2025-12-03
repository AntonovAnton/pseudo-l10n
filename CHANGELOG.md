# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-04

### Added
- Initial release of pseudo-l10n package
- Pseudo-localization for JSON translation files
- Configurable text expansion (default 40%)
- Accented character replacement with full character map
- Visual markers for identifying translation issues
- Configurable placeholder formats ({{key}}, {key}, %key%, ${key})
- Optional placeholder replacement with uppercase format
- RTL (Right-to-Left) simulation support
- Configurable placeholder reversal in RTL mode
- Configurable start/end markers
- Configurable expansion character
- Custom accent map support
- CLI tool with comprehensive options
- Programmatic API with sync and async methods
- Support for nested JSON structures
- Comprehensive documentation and examples
- Example files and demo script

### Features
- ✅ Text expansion to simulate translated text length
- ✅ Accented characters to test UTF-8 encoding
- ✅ Visual markers `⟦...⟧` to identify untranslated strings
- ✅ Placeholder preservation (i18next, React Intl, Angular, sprintf, etc.)
- ✅ RTL simulation with Unicode control characters
- ✅ Both CLI and programmatic usage
- ✅ Zero dependencies (uses only Node.js built-in modules)

[1.0.0]: https://github.com/AntonovAnton/pseudo-l10n/releases/tag/v1.0.0
