import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/figma_file_full.json', 'utf8'));

console.log('Document Name:', data.name);

const colors = new Set();
const fontFamilies = new Set();
const fontSizes = new Set();
const framesInfo = [];

function rgbaToHex(r, g, b, a) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a !== undefined && a !== 1 ? toHex(a) : ''}`;
}

function extractNodeStyles(node, frameName = '') {
  // Check fills
  if (node.fills && Array.isArray(node.fills)) {
    node.fills.forEach(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        const hex = rgbaToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a);
        colors.add(hex);
      }
    });
  }

  // Check typography
  if (node.style) {
    if (node.style.fontFamily) fontFamilies.add(node.style.fontFamily);
    if (node.style.fontSize) fontSizes.add(`${node.style.fontSize}px (weight: ${node.style.fontWeight || 400})`);
  }

  // Detailed frame analysis for home page, login page, register page
  if (['home page', 'login page', 'register page'].includes(node.name?.toLowerCase())) {
    const info = {
      id: node.id,
      name: node.name,
      type: node.type,
      width: node.absoluteBoundingBox?.width,
      height: node.absoluteBoundingBox?.height,
      backgroundColor: node.backgroundColor ? rgbaToHex(node.backgroundColor.r, node.backgroundColor.g, node.backgroundColor.b, node.backgroundColor.a) : null,
      children: []
    };

    function collectChildren(childNode) {
      const childDetail = {
        id: childNode.id,
        name: childNode.name,
        type: childNode.type,
        characters: childNode.characters || undefined,
        fills: childNode.fills?.map(f => f.type === 'SOLID' ? rgbaToHex(f.color.r, f.color.g, f.color.b, f.color.a) : f.type),
        style: childNode.style ? {
          fontFamily: childNode.style.fontFamily,
          fontSize: childNode.style.fontSize,
          fontWeight: childNode.style.fontWeight,
          textAlignHorizontal: childNode.style.textAlignHorizontal
        } : undefined,
        cornerRadius: childNode.cornerRadius
      };
      if (childNode.children) {
        childDetail.children = childNode.children.map(collectChildren);
      }
      return childDetail;
    }

    if (node.children) {
      info.children = node.children.map(collectChildren);
    }
    framesInfo.push(info);
  }

  if (node.children) {
    node.children.forEach(child => extractNodeStyles(child, frameName));
  }
}

extractNodeStyles(data.document);

console.log('\n================ EXPORTED DESIGN TOKENS ================');
console.log('\n🎨 Extracted Colors:', Array.from(colors));
console.log('🔤 Font Families:', Array.from(fontFamilies));
console.log('📏 Font Sizes:', Array.from(fontSizes));

fs.writeFileSync('scratch/extracted_tokens.json', JSON.stringify({
  colors: Array.from(colors),
  fontFamilies: Array.from(fontFamilies),
  fontSizes: Array.from(fontSizes),
  frames: framesInfo
}, null, 2));

console.log('\n================ FRAMES SUMMARY ================');
framesInfo.forEach(f => {
  console.log(`\nFrame: "${f.name}" (ID: ${f.id}, Bounds: ${f.width}x${f.height}, BgColor: ${f.backgroundColor})`);
});
