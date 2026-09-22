const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory()
        ? walkSync(dirFile, filelist)
        : filelist.concat(dirFile);
    } catch (err) {
      if (err.code === 'ENOENT' || err.code === 'EACCES') {
        console.warn(`Skipping ${dirFile} due to ${err.code}`);
      } else {
        throw err;
      }
    }
  });
  return filelist;
};

const files = walkSync('.').filter(f => 
    (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.html')) && !f.includes('node_modules') && !f.includes('dist')
);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Colors mapping
  content = content.replace(/bg-\[#24292A\]/g, 'bg-[#0A0A0A]');
  content = content.replace(/bg-\[#313435\]/g, 'bg-[#111111]');
  content = content.replace(/bg-\[#3135\]/g, 'bg-[#111111]');
  content = content.replace(/bg-\[#404344\]/g, 'bg-zinc-800');
  
  content = content.replace(/text-\[#24292A\]/g, 'text-black');
  content = content.replace(/text-\[#A1A1AA\]/g, 'text-zinc-400');
  
  // Borders
  content = content.replace(/border-\[#d0d03d\]\/(10|20|30|40|50|70)/g, 'border-white/10');
  content = content.replace(/border-\[#d0d03d\]/g, 'border-white');

  // Shadows
  content = content.replace(/shadow-\[#d0d03d\]\/(10|20|30|40|50|70)/g, 'shadow-white/5');
  content = content.replace(/shadow-\[#d0d03d\]/g, 'shadow-white/10');
  
  // Focus rings
  content = content.replace(/focus:ring-\[#d0d03d\]/g, 'focus:ring-white/20');
  content = content.replace(/ring-\[#d0d03d\]/g, 'ring-white/20');
  
  // Backgrounds with yellow
  content = content.replace(/bg-\[#d0d03d\]\/(10|20|30|40|50|70)/g, 'bg-white/10');
  content = content.replace(/bg-\[#d0d03d\]/g, 'bg-white');
  
  // Hover states
  content = content.replace(/hover:bg-\[#eaea5f\]/g, 'hover:bg-zinc-200');
  content = content.replace(/hover:text-\[#eaea5f\]/g, 'hover:text-white');
  content = content.replace(/hover:border-\[#eaea5f\]/g, 'hover:border-white');
  
  // Text color replacement (complex because of logo)
  // Let's replace text-[#d0d03d] globally, then fix the logo
  content = content.replace(/text-\[#d0d03d\]/g, 'text-white');
  content = content.replace(/Case<span className="text-white">Flow<\/span>/g, 'Case<span className="text-[#d0d03d]">Flow</span>');
  
  // In index.html
  content = content.replace(/#24292A/g, '#0A0A0A');
  content = content.replace(/#d0d03d/g, '#333333');
  content = content.replace(/#eaea5f/g, '#555555');

  fs.writeFileSync(file, content);
});

console.log('Replaced colors successfully!');
