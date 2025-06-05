import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ttfLoader = new TTFLoader();
const fontLoader = new FontLoader();

// Load Inter Bold font
ttfLoader.load(
  path.join(__dirname, "../public/fonts/Inter-Bold.ttf"),
  (ttfFont) => {
    const font = fontLoader.parse(ttfFont);

    // Save the font as JSON
    const fontJson = JSON.stringify(font.toJSON());
    fs.writeFile(
      path.join(__dirname, "../public/fonts/inter_bold.json"),
      fontJson
    );

    console.log("Font converted successfully!");
  },
  (progress) => {
    console.log((progress.loaded / progress.total) * 100 + "% loaded");
  },
  (error) => {
    console.error("Error loading font:", error);
  }
);
