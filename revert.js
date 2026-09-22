import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replaceMap = {
  'brand-bg': '[#24292A]',
  'brand-surface-hover': '[#404344]',
  'brand-surface': '[#313435]',
  'brand-muted': '[#A1A1AA]',
  'brand-accent-hover': '[#eaea5f]',
  'brand-accent': '[#d0d03d]',
  'brand-text': 'white',
  'brand-border': '[#d0d03d]/30',
  'border-white/10': 'border-[#d0d03d]/20',
  'border-white/20': 'border-[#d0d03d]/30',
  'border-white/40': 'border-[#d0d03d]/50',
  'bg-white/5': 'bg-[#d0d03d]/10',
  'bg-white/10': 'bg-[#d0d03d]/20',
  'hover:bg-white/5': 'hover:bg-[#d0d03d]/10',
  'bg-black/20': 'bg-black/20',
  'bg-black/40': 'bg-[#24292A]',
  'bg-black/60': 'bg-[#24292A]/80',
  'glass-panel': '',
  'animate-stagger-fade': '',
  'animate-slide-in-right': ''
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./components', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [key, val] of Object.entries(replaceMap)) {
      const regex = new RegExp(key, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, val);
        changed = true;
      }
    }
    if (changed) {
      // additional fix for style={{ animationDelay: ... }}
      content = content.replace(/style={{ animationDelay: '[^']+' }}/g, '');
      content = content.replace(/style={{ animationDelay: [^}]+ }}/g, '');
      fs.writeFileSync(filePath, content);
      console.log(`Reverted ${filePath}`);
    }
  }
});
