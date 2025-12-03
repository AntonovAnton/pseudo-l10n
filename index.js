/**
 * pseudo-l10n: Pseudo-localization generator for i18n testing
 * 
 * This package helps QA engineers and developers test internationalization (i18n)
 * implementations by generating pseudo-localized versions of translation files.
 * 
 * Features:
 *  - Text expansion (configurable percentage)
 *  - Accented character replacement
 *  - Visual markers for untranslated strings
 *  - Configurable placeholder formats
 *  - Optional RTL (Right-to-Left) simulation
 * 
 * Learn more about pseudo-localization testing:
 * https://medium.com/@AntonAntonov88/i18n-testing-a-practical-guide-for-qa-engineers-a92f7f4fc8b2
 */

const fs = require("fs");
const path = require("path");

/**
 * Default accented character map for pseudo-localization
 * Maps standard ASCII characters to accented equivalents
 */
const DEFAULT_ACCENT_MAP = {
  a: "à", b: "ƀ", c: "ç", d: "đ", e: "ë", f: "ƒ", g: "ğ", h: "ĥ", i: "ï",
  j: "ĵ", k: "ķ", l: "ļ", m: "ɱ", n: "ñ", o: "õ", p: "ƥ", q: "ɋ", r: "ř",
  s: "š", t: "ţ", u: "ü", v: "ṽ", w: "ŵ", x: "ẋ", y: "ý", z: "ž",
  A: "À", B: "ß", C: "Ç", D: "Đ", E: "Ë", F: "Ƒ", G: "Ğ", H: "Ħ", I: "Ï",
  J: "Ĵ", K: "Ķ", L: "Ļ", M: "Ṁ", N: "Ñ", O: "Õ", P: "Ƥ", Q: "Ɋ", R: "Ř",
  S: "Š", T: "Ť", U: "Ü", V: "Ṽ", W: "Ŵ", X: "Ẍ", Y: "Ŷ", Z: "Ž"
};

/**
 * Default configuration options
 */
const DEFAULT_OPTIONS = {
  expansion: 40,
  placeholderFormat: "{{key}}",
  replacePlaceholders: false,
  startMarker: "⟦",
  endMarker: "⟧",
  rtl: false,
  reversePlaceholders: true,
  accentMap: DEFAULT_ACCENT_MAP,
  expansionChar: "ē"
};

/**
 * Pseudo-localizes a single string
 * 
 * @param {string} str - The string to pseudo-localize
 * @param {Object} options - Configuration options
 * @param {number} options.expansion - Text expansion percentage (default: 40)
 * @param {string} options.placeholderFormat - Placeholder format: "{{key}}", "{key}", "%key%", etc.
 * @param {boolean} options.replacePlaceholders - Replace placeholders with uppercase format
 * @param {string} options.startMarker - Start marker for pseudo-localized strings
 * @param {string} options.endMarker - End marker for pseudo-localized strings
 * @param {boolean} options.rtl - Enable RTL (Right-to-Left) simulation
 * @param {boolean} options.reversePlaceholders - Reverse placeholder content in RTL mode
 * @param {Object} options.accentMap - Custom character mapping
 * @param {string} options.expansionChar - Character to use for text expansion
 * @returns {string} Pseudo-localized string
 */
function pseudoLocalize(str, options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };

  // Build regex pattern from placeholder format
  const placeholderRegex = buildPlaceholderRegex(config.placeholderFormat);

  let result = str;

  // Split by placeholders and process each part
  const parts = result.split(placeholderRegex);
  
  result = parts
    .map((part, index) => {
      // Check if this part is a placeholder (odd indices are captures in split)
      const isPlaceholder = index % 2 === 1;
      
      if (isPlaceholder) {
        let placeholderContent = part;

        // Apply RTL reversal to placeholder if enabled
        if (config.rtl && config.reversePlaceholders) {
          placeholderContent = placeholderContent.split("").reverse().join("");
        }

        // Replace placeholder format if enabled
        if (config.replacePlaceholders) {
          return `<${placeholderContent.toUpperCase()}>`;
        }

        // Reconstruct original placeholder format
        return reconstructPlaceholder(placeholderContent, config.placeholderFormat);
      }

      // Process regular text (not placeholder)
      // Replace with accented characters
      part = part.replace(/./g, (char) => config.accentMap[char] || char);

      // Add text expansion
      const padLength = Math.ceil((part.length * config.expansion) / 100);
      const pad = config.expansionChar.repeat(padLength);

      // Check if the last character is punctuation/whitespace
      if (part.length > 0 && /[A-Za-z0-9]$/.test(part) === false) {
        // Insert padding before trailing punctuation/space
        const match = part.match(/^(.*?)([\s.,;:!?'"()\[\]{}<>-]*)$/);
        if (match) {
          return `${match[1]}${pad}${match[2]}`;
        }
      }

      return `${part}${pad}`;
    })
    .join("");

  // Wrap with markers
  result = `${config.startMarker}${result}${config.endMarker}`;

  // Add RTL control characters if enabled
  if (config.rtl) {
    result = `\u202E${result}\u202C`;
  }

  return result;
}

/**
 * Builds a regex pattern to match placeholders based on format
 * 
 * @param {string} format - Placeholder format (e.g., "{{key}}", "{key}", "%key%")
 * @returns {RegExp} Regular expression to match and capture placeholders
 */
function buildPlaceholderRegex(format) {
  // Escape special regex characters
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  
  // Split format into prefix and suffix
  const keyPlaceholder = "key";
  const keyIndex = format.indexOf(keyPlaceholder);
  
  if (keyIndex === -1) {
    throw new Error(`Placeholder format must contain "${keyPlaceholder}"`);
  }
  
  const prefix = format.substring(0, keyIndex);
  const suffix = format.substring(keyIndex + keyPlaceholder.length);
  
  // Build regex pattern: prefix (capture content) suffix
  const pattern = `${escapeRegex(prefix)}(.*?)${escapeRegex(suffix)}`;
  
  return new RegExp(pattern, "g");
}

/**
 * Reconstructs a placeholder with its original format
 * 
 * @param {string} content - Placeholder content
 * @param {string} format - Placeholder format
 * @returns {string} Reconstructed placeholder
 */
function reconstructPlaceholder(content, format) {
  return format.replace("key", content);
}

/**
 * Recursively processes an object/array structure
 * 
 * @param {*} obj - Object, array, or primitive to process
 * @param {Object} options - Configuration options
 * @returns {*} Processed structure with pseudo-localized strings
 */
function processObject(obj, options = {}) {
  if (typeof obj === "string") {
    return pseudoLocalize(obj, options);
  } else if (Array.isArray(obj)) {
    return obj.map((item) => processObject(item, options));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = processObject(obj[key], options);
    }
    return newObj;
  }
  return obj;
}

/**
 * Synchronous version - Generates a pseudo-localized JSON file from an input file
 * 
 * @param {string} inputPath - Path to input JSON file
 * @param {string} outputPath - Path to output JSON file
 * @param {Object} options - Configuration options (see pseudoLocalize function)
 */
function generatePseudoLocaleSync(inputPath, outputPath, options = {}) {
  // Read input file
  const inputContent = fs.readFileSync(inputPath, "utf8");
  const inputData = JSON.parse(inputContent);

  // Process the content
  const outputData = processObject(inputData, options);

  // Create output directory if needed
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write output file
  fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), "utf8");
}

/**
 * Async version - Generates a pseudo-localized JSON file from an input file
 * 
 * @param {string} inputPath - Path to input JSON file
 * @param {string} outputPath - Path to output JSON file
 * @param {Object} options - Configuration options (see pseudoLocalize function)
 * @returns {Promise<void>}
 */
async function generatePseudoLocale(inputPath, outputPath, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      generatePseudoLocaleSync(inputPath, outputPath, options);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  pseudoLocalize,
  processObject,
  generatePseudoLocale,
  generatePseudoLocaleSync,
  DEFAULT_ACCENT_MAP,
  DEFAULT_OPTIONS
};
