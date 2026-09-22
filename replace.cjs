const fs = require('fs');
const glob = require('glob');

const colorMap = {
  '\\[#24292A\\]': 'brand-bg',
  '\\[#313435\\]': 'brand-surface',
  '\\[#3135\\]': 'brand-surface',
  '\\[#404344\\]': 'brand-surface-hover',
  '\\[#A1A1AA\\]': 'brand-muted',
  '\\[#d0d03d\\]': 'brand-accent',
  '\\[#eaea5f\\]': 'brand-accent-hover'
};

const files = glob.sync('**/*.{tsx,ts,html}', { ignore: ['node_modules/**', 'dist/**'] });

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [hex, name] of Object.entries(colorMap)) {
    const regex = new RegExp(hex, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, name);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
