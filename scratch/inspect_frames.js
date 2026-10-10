import fs from 'fs';

const tokens = JSON.parse(fs.readFileSync('scratch/extracted_tokens.json', 'utf8'));

console.log('--- ALL FRAMES DETAILS ---\n');

function inspectNode(node, depth = 0) {
  const indent = '  '.repeat(depth);
  let text = '';
  if (node.characters) text = ` -> "${node.characters.replace(/\n/g, ' ')}"`;
  let fills = node.fills ? ` [fills: ${node.fills.join(', ')}]` : '';
  let style = node.style ? ` [font: ${node.style.fontFamily} ${node.style.fontSize}px w${node.style.fontWeight}]` : '';
  let radius = node.cornerRadius ? ` [radius: ${node.cornerRadius}px]` : '';
  
  console.log(`${indent}- ${node.type} "${node.name}" (id: ${node.id})${text}${fills}${style}${radius}`);
  
  if (node.children) {
    node.children.forEach(c => inspectNode(c, depth + 1));
  }
}

tokens.frames.forEach(f => {
  console.log(`\n================ ${f.name.toUpperCase()} (BgColor: ${f.backgroundColor}) ================`);
  inspectNode(f);
});
