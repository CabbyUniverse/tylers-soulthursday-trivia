# Question Management

## Export Questions to CSV

```bash
node << 'EOF'
const fs = require('fs');
const questions = require('./data/questions.json').questions;
let csv = 'ID,Question,Answer,Option1,Option2,Option3,Option4,Difficulty,Category,Version\n';
questions.forEach((q, i) => {
  const id = i + 1;
  const question = `"${q.q.replace(/"/g, '""')}"`;
  const answer = `"${q.a.replace(/"/g, '""')}"`;
  const opt1 = q.options ? `"${q.options[0].replace(/"/g, '""')}"` : '';
  const opt2 = q.options ? `"${q.options[1].replace(/"/g, '""')}"` : '';
  const opt3 = q.options ? `"${q.options[2].replace(/"/g, '""')}"` : '';
  const opt4 = q.options ? `"${q.options[3].replace(/"/g, '""')}"` : '';
  csv += `${id},${question},${answer},${opt1},${opt2},${opt3},${opt4},${q.difficulty},${q.category},1.0\n`;
});
fs.writeFileSync('questions-export-v1.0.csv', csv);
console.log('✅ Exported to questions-export-v1.0.csv');
EOF
```

## Edit Questions

1. Open `questions-export-v1.0.csv` in Excel/Google Sheets
2. Edit questions, answers, difficulty, or category
3. Update version number (e.g., 1.0 → 1.1)
4. Save as CSV

## Import Edited Questions

```bash
node scripts/import-questions.js questions-export-v1.1.csv
```

## Version History

- v1.0 - Initial 82 questions
