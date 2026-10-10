import fs from 'fs';

// Parse .env manually
const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split(/\r?\n/).forEach(line => {
  const [key, ...vals] = line.split('=');
  if (key && vals.length) {
    env[key.trim()] = vals.join('=').trim();
  }
});

const token = env.FIGMA_ACCESS_TOKEN;
const fileKey = env.FIGMA_FILE_KEY;

console.log('Fetching Figma File:', fileKey);

async function getFigmaFile() {
  try {
    const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        'X-Figma-Token': token
      }
    });

    if (!res.ok) {
      console.error('Figma API Error:', res.status, res.statusText);
      const text = await res.text();
      console.error('Body:', text);
      return;
    }

    const data = await res.json();
    console.log('File Name:', data.name);
    console.log('Last Modified:', data.lastModified);

    // Save full JSON for analysis
    fs.writeFileSync('scratch/figma_file_full.json', JSON.stringify(data, null, 2));

    function printNodes(node, depth = 0) {
      if (depth > 3) return; // Limit print depth
      const indent = '  '.repeat(depth);
      console.log(`${indent}- [${node.type}] ${node.name} (id: ${node.id})`);
      if (node.children) {
        node.children.forEach(child => printNodes(child, depth + 1));
      }
    }

    console.log('\n--- Document Hierarchy ---');
    printNodes(data.document);

  } catch (err) {
    console.error('Error fetching Figma data:', err);
  }
}

getFigmaFile();
