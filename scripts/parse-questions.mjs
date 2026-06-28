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
 * Each key point includes: title + descriptive text
 * Limits to first 3 main numbered points with meaningful content.
 */
function extractKeyPoints(answerText) {
  const allPoints = [];
  const lines = answerText.split('\n');
  let currentPoint = null;
  let inCodeBlock = false;
  let inTable = false;
  let stopCollecting = false;

  function isDescriptiveText(text) {
    const t = text.trim();
    if (!t) return false;
    if (t.startsWith('```')) return false;
    if (t.startsWith('<!--')) return false;
    if (/^[-*+•]\s*$/.test(t)) return false;
    if (t.length < 8) return false;
    if (/^[.#\[\]@&>~+*:%][a-zA-Z0-9_.:#\[\]\-+~>* ()]+\{/.test(t)) return false;
    if (/^\{?[a-z-]+\s*:\s*[^}]*;?\s*\}?\s*$/.test(t) && t.length < 120) return false;
    if (/^\}\s*$/.test(t)) return false;
    if (/^<[a-z/!?][a-z0-9\s"'=-]*\/?>?\s*$/i.test(t)) return false;
    if (/^[a-z_][a-z0-9_-]*\s*\(.*\)\s*\{?\s*$/.test(t)) return false;
    if (/^(\/\/|\/\*|\*\/)/.test(t)) return false;
    if (/^(const|let|var|function|class|return|import|export|if|for|while|switch)\b/.test(t)) return false;
    if (/^[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*[^=].*;\s*$/.test(t)) return false;
    const chineseChars = (t.match(/[\u4e00-\u9fa5]/g) || []).length;
    if (chineseChars < 3) return false;
    if (t.startsWith('|') && t.endsWith('|')) return false;
    if (/^[-:| ]+$/.test(t)) return false;
    return true;
  }

  function cleanLine(text) {
    let t = text.trim();
    t = t.replace(/^[-*+•]\s+/, '');
    t = t.replace(/^[1-9]\d*[.)、]\s*/, '');
    t = t.replace(/^✅/g, '').trim();
    t = t.replace(/^❌/g, '').trim();
    t = t.replace(/^\s*\/\*+\s*/, '').replace(/\s*\*+\/\s*$/g, '').trim();
    t = t.replace(/^\*+\s*/, '').trim();
    t = t.replace(/^=+\s*/, '').replace(/\s*=+$/, '').trim();
    t = t.replace(/^⏱️\s*/, '').trim();
    t = t.replace(/^→\s*方向：\s*/, '').trim();
    t = t.replace(/^\|(.+)\|\s*$/, '$1').trim();
    return stripMarkdown(t);
  }

  function isPointTitle(line) {
    const trimmed = line.trim();
    let match;

    match = trimmed.match(/^(?:#{1,4}\s+)?(\d+)\.\s+\*\*(.+?)\*\*/);
    if (match) return { num: parseInt(match[1], 10), title: match[2] };

    match = trimmed.match(/^#{2,4}\s+方式[一二三四五六七八九十]+[：:]\s*(.+)/);
    if (match) return { num: 99, title: match[1] };

    match = trimmed.match(/^#{2,4}\s+(\d+)[.、]\s*(.+)/);
    if (match) return { num: parseInt(match[1], 10), title: match[2] };

    match = trimmed.match(/^(\d+)\.\s+(.+)/);
    if (match) {
      let title = match[2].replace(/^\*\*/, '').replace(/\*\*$/, '');
      return { num: parseInt(match[1], 10), title };
    }

    return null;
  }

  function isSectionHeader(line) {
    const trimmed = line.trim();
    if (/^###?\s+/.test(trimmed)) return true;
    if (/^🔍/.test(trimmed)) return true;
    if (/追问链/.test(trimmed)) return true;
    if (/^---+$/.test(trimmed)) return true;
    return false;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (/^[-:| ]+$/.test(trimmed)) continue;
      if (!trimmed.startsWith('|')) {
        inTable = false;
      } else {
        continue;
      }
    }

    if (isSectionHeader(trimmed)) {
      stopCollecting = true;
      break;
    }

    const pointInfo = isPointTitle(line);
    if (pointInfo) {
      if (currentPoint) {
        allPoints.push(currentPoint);
      }
      currentPoint = { title: stripMarkdown(pointInfo.title.trim()), fragments: [] };
      continue;
    }

    if (currentPoint && !stopCollecting && isDescriptiveText(trimmed)) {
      const cleaned = cleanLine(trimmed);
      if (cleaned && cleaned.length > 6 && !/^[:：]/.test(cleaned)) {
        currentPoint.fragments.push(cleaned);
      }
    }
  }

  if (currentPoint) {
    allPoints.push(currentPoint);
  }

  const scoredPoints = allPoints.map((p, idx) => ({
    ...p,
    score: p.fragments.length * 10 + (idx < 3 ? 5 : 0)
  }));

  scoredPoints.sort((a, b) => b.score - a.score);

  const topPoints = scoredPoints.slice(0, 3);

  topPoints.sort((a, b) => {
    const idxA = allPoints.findIndex(p => p.title === a.title);
    const idxB = allPoints.findIndex(p => p.title === b.title);
    return idxA - idxB;
  });

  return topPoints.map(p => {
    const desc = p.fragments.slice(0, 3).join(' ').trim();
    return {
      title: p.title,
      content: desc
    };
  });
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
