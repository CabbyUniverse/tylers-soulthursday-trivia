const fs = require('fs');

const csvContent = fs.readFileSync(process.argv[2] || 'questions-export-v1.0.csv', 'utf-8');
const lines = csvContent.split('\n').slice(1);

const questions = lines.filter(line => line.trim()).map(line => {
  const match = line.match(/^(\d+),"([^"]+)","([^"]+)","([^"]*)","([^"]*)","([^"]*)","([^"]*)",(\w+),([^,]+),(.+)$/);
  if (!match) return null;
  
  const q = {
    q: match[2],
    a: match[3],
    difficulty: match[8],
    category: match[9]
  };
  
  const options = [match[4], match[5], match[6], match[7]].filter(o => o);
  if (options.length > 0) q.options = options;
  
  return q;
}).filter(Boolean);

const version = lines[0]?.split(',').pop()?.trim() || '1.0';
const output = { questions, version, lastUpdated: new Date().toISOString() };

fs.writeFileSync('data/questions.json', JSON.stringify(output, null, 2));
console.log(`✅ Imported ${questions.length} questions (version ${version})`);
