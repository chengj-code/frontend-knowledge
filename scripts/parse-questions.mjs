import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');

const CATEGORY_MAP = {
  'html-css': { category: 'html-css', categoryLabel: 'HTML-CSS' },
  'javascript': { category: 'javascript', categoryLabel: 'JavaScript' },
  'typescript': { category: 'typescript', categoryLabel: 'TypeScript' },
  'vue': { category: 'vue', categoryLabel: 'Vue' },
  'react': { category: 'react', categoryLabel: 'React' },
  'nodejs': { category: 'nodejs', categoryLabel: 'Node.js' },
  'engineering': { category: 'engineering', categoryLabel: '工程化' },
  'performance': { category: 'performance', categoryLabel: '性能优化' },
  'browser': { category: 'browser', categoryLabel: '浏览器' },
  'network': { category: 'network', categoryLabel: '网络' },
  'source-code/vue2': { category: 'source-code-vue2', categoryLabel: 'Vue2 源码' },
  'source-code/vue3': { category: 'source-code-vue3', categoryLabel: 'Vue3 源码' },
  'source-code/react': { category: 'source-code-react', categoryLabel: 'React 源码' },
};

const MD_FILES = [
  'docs/html-css/interviews.md',
  'docs/javascript/interviews.md',
  'docs/typescript/interviews.md',
  'docs/vue/interviews.md',
  'docs/react/interviews.md',
  'docs/nodejs/interviews.md',
  'docs/engineering/interviews.md',
  'docs/performance/interviews.md',
  'docs/browser/interviews.md',
  'docs/network/interviews.md',
  'docs/source-code/vue2/interviews.md',
  'docs/source-code/vue3/interviews.md',
  'docs/source-code/react/interviews.md',
];

/**
 * Strip markdown formatting from text (backticks, bold markers, etc.)
 */
function stripMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
}

/**
 * Count stars in difficulty string like ★☆☆
 */
function parseDifficulty(starStr) {
  if (!starStr) return 1;
  const match = starStr.match(/★/g);
  return match ? match.length : 1;
}

/**
 * Extract key points from the answer section.
 * Looks for numbered items like:
 *   1. **Bold title** description...
 *   #### 1. **Bold title**
 *   #### 1. Title without bold
 * Takes the bold title + brief summary (first 80 chars max).
 */
function extractKeyPoints(answerText) {
  const keyPoints = [];
  const lines = answerText.split('\n');

  for (const line of lines) {
    if (keyPoints.length >= 3) break;

    // Match patterns like:
    //   1. **Bold title** rest of line
    //   #### 1. **Bold title**
    //   1. **Bold title**
    //   #### 1. Title without bold
    let match = line.match(/^(?:#{1,4}\s+)?(\d+)\.\s+\*\*(.+?)\*\*(.*)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 3) {
        const boldTitle = match[2].trim();
        const restText = stripMarkdown(match[3].trim());
        let point;
        if (restText) {
          point = `${boldTitle}：${restText}`;
        } else {
          point = boldTitle;
        }
        if (point.length > 80) {
          point = point.substring(0, 80) + '...';
        }
        keyPoints.push(point);
      }
      continue;
    }

    // Handle numbered items without bold: #### 1. Title without bold
    match = line.match(/^#{1,4}\s+(\d+)\.\s+(.+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 3) {
        let point = stripMarkdown(match[2].trim());
        if (point.length > 80) {
          point = point.substring(0, 80) + '...';
        }
        keyPoints.push(point);
      }
      continue;
    }

    // Handle plain numbered items without bold: 1. Title without bold
    match = line.match(/^(\d+)\.\s+(.+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 3) {
        let point = stripMarkdown(match[2].trim());
        if (point.length > 80) {
          point = point.substring(0, 80) + '...';
        }
        keyPoints.push(point);
      }
    }
  }

  return keyPoints;
}

/**
 * Parse a single markdown file and extract questions.
 */
function parseMarkdownFile(filePath, dirKey) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { category, categoryLabel } = CATEGORY_MAP[dirKey];

  // Split into question blocks by the question heading pattern
  const questionRegex = /^## (Q\d+): (.+)$/gm;
  const matches = [];
  let m;

  while ((m = questionRegex.exec(content)) !== null) {
    matches.push({
      questionIndex: m[1],
      question: m[2],
      startIndex: m.index,
    });
  }

  const questions = [];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const nextStart = i + 1 < matches.length ? matches[i + 1].startIndex : content.length;
    const block = content.substring(match.startIndex, nextStart);

    // Extract difficulty
    const diffMatch = block.match(/-\s+\*\*难度\*\*[：:]\s*(.+)/);
    const difficulty = diffMatch ? parseDifficulty(diffMatch[1].trim()) : 1;

    // Extract question type
    const typeMatch = block.match(/-\s+\*\*题型\*\*[：:]\s*(.+)/);
    const type = typeMatch ? typeMatch[1].trim() : '简答题';

    // Extract answer section
    const answerMatch = block.match(/###\s+参考答案要点[：:]*\n([\s\S]*)/);
    let keyPoints = [];
    if (answerMatch) {
      keyPoints = extractKeyPoints(answerMatch[1]);
    }

    questions.push({
      id: `${category}-${match.questionIndex.toLowerCase()}`,
      category,
      categoryLabel,
      questionIndex: match.questionIndex,
      question: stripMarkdown(match.question),
      difficulty,
      type,
      keyPoints,
    });
  }

  return {
    category,
    categoryLabel,
    totalQuestions: questions.length,
    questions,
  };
}

/**
 * Main function
 */
function main() {
  const outputDir = path.join(workspaceRoot, 'quiz', 'public', 'data');

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  const categoriesSummary = [];

  for (const relPath of MD_FILES) {
    const fullPath = path.join(workspaceRoot, relPath);
    // Derive the dirKey from the relative path: "docs/<dirKey>/interviews.md"
    const dirKey = relPath.replace('docs/', '').replace('/interviews.md', '');

    if (!CATEGORY_MAP[dirKey]) {
      console.warn(`⚠️  No category mapping for: ${dirKey}`);
      continue;
    }

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  File not found: ${fullPath}`);
      continue;
    }

    const result = parseMarkdownFile(fullPath, dirKey);

    // Write category JSON file
    const outFile = path.join(outputDir, `${result.category}.json`);
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`✅ ${result.category}.json — ${result.totalQuestions} questions`);

    categoriesSummary.push({
      category: result.category,
      categoryLabel: result.categoryLabel,
      totalQuestions: result.totalQuestions,
    });
  }

  // Write categories summary
  const summaryFile = path.join(outputDir, 'categories.json');
  fs.writeFileSync(summaryFile, JSON.stringify(categoriesSummary, null, 2), 'utf-8');
  console.log(`\n✅ categories.json — ${categoriesSummary.length} categories`);

  // Print total
  const total = categoriesSummary.reduce((sum, c) => sum + c.totalQuestions, 0);
  console.log(`📊 Total questions across all categories: ${total}`);
}

main();
