# Fonts Directory

This directory needs to contain the following font files for 3D text rendering:

## Required Font Files
- `inter_bold.json` - JSON format font for Text3D component

## How to Generate Font JSON Files

1. Visit [Gero3's Facetype.js](https://gero3.github.io/facetype.js/)
2. Upload your Inter-Bold.ttf or Inter-Bold.woff file
3. Click "Convert" to generate the JSON font file
4. Download and save it as `inter_bold.json` in this directory

Alternatively, you can use the following command with Three.js tools if you have Node.js installed:

```bash
npx threejs-font-converter -f ttf -o ./public/fonts/inter_bold.json ./path/to/Inter-Bold.ttf
```

## Font Source
You can download Inter fonts from: https://fonts.google.com/specimen/Inter
