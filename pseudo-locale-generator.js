#!/usr/bin/env node
/**
 * Pseudo-locale generator for i18next JSON files
 *
 * Features:
 *  - Text expansion (~40% by default, configurable)
 *  - Accented character replacement
 *  - Wraps with markers ⟦…⟧ for easy spotting
 *  - Optional placeholder replacement ({{placeholder}} → <PLACEHOLDER>)
 *  - Optional RTL simulation (U+202E / U+202C)
 *
 * Usage:
 *   node pseudo-locale-generator.js input.json output.json --expansion=40 --replacePlaceholders --rtl
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(
    "Usage: node pseudo-locale-generator.js input.json output.json [--expansion=40] [--replacePlaceholders] [--rtl]"
  );
  process.exit(1);
}

const inputFile = path.resolve(args[0]);
const outputFile = path.resolve(args[1]);

// Options
let expansionPercent = 40;
let replacePlaceholders = false;
let rtlMode = false;

args.slice(2).forEach((arg) => {
  if (arg.startsWith("--expansion=")) {
    expansionPercent = parseInt(arg.split("=")[1], 10) || 40;
  }
  if (arg === "--replacePlaceholders") replacePlaceholders = true;
  if (arg === "--rtl") rtlMode = true;
});

// Accented character map
const accentMap = {
  a: "à", b: "ƀ", c: "ç", d: "đ", e: "ë", f: "ƒ", g: "ğ", h: "ĥ", i: "ï",
  j: "ĵ", k: "ķ", l: "ļ", m: "ɱ", n: "ñ", o: "õ", p: "ƥ", q: "ɋ", r: "ř",
  s: "š", t: "ţ", u: "ü", v: "ṽ", w: "ŵ", x: "ẋ", y: "ý", z: "ž",
  A: "À", B: "ß", C: "Ç", D: "Đ", E: "Ë", F: "Ƒ", G: "Ğ", H: "Ħ", I: "Ï",
  J: "Ĵ", K: "Ķ", L: "Ļ", M: "Ṁ", N: "Ñ", O: "Õ", P: "Ƥ", Q: "Ɋ", R: "Ř",
  S: "Š", T: "Ť", U: "Ü", V: "Ṽ", W: "Ŵ", X: "Ẍ", Y: "Ŷ", Z: "Ž"
};

function pseudoLocalize(str) {
  let result = str;

  // Preserve placeholders {{...}} by splitting text
  result = result
    .split(/(\{\{.*?\}\})/g)
    .map((part) => {
      if (part.startsWith("{{") && part.endsWith("}}")) {
        let placeholderName = part.slice(2, -2).trim();

        // RTL simulation if enabled, 
        // remove it if you verify HTML not sceenshots
        if (rtlMode) {
          placeholderName = placeholderName.split("").reverse().join("");
        }

        if (replacePlaceholders) {
          return `<${placeholderName.toUpperCase()}>`;
        }

        return part;
      }

      // Replace with accented chars
      part = part.replace(/./g, (char) => accentMap[char] || char);

      // Add expansion
      const padLength = Math.ceil((part.length * expansionPercent) / 100);
      const pad = "ē".repeat(padLength);

      // Check if the last character is a punctuation/space
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
  result = `⟦${result}⟧`;

  // RTL simulation if enabled
  if (rtlMode) {
    result = `\u202E${result}\u202C`;
  }

  return result;
}

function processObject(obj) {
  if (typeof obj === "string") {
    return pseudoLocalize(obj);
  } else if (Array.isArray(obj)) {
    return obj.map((item) => processObject(item));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = processObject(obj[key]);
    }
    return newObj;
  }
  return obj;
}

// Read input file
let inputData;
try {
  const inputContent = fs.readFileSync(inputFile, "utf8");
  inputData = JSON.parse(inputContent);
} catch (error) {
  console.error(`Error reading input file: ${error.message}`);
  process.exit(1);
}

// Process the content
const outputData = processObject(inputData);

// Write output file
try {
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the file
  fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2), "utf8");
  console.log(`✅ Pseudo-locale file generated: ${outputFile}`);
} catch (error) {
  console.error(`Error writing output file: ${error.message}`);
  process.exit(1);
}
