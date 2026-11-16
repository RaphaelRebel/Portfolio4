export type TextPart = { kind: 'text'; text: string } | { kind: 'link'; text: string; href: string }

export type PostBlock =
  | { kind: 'paragraph'; parts: TextPart[] }
  | { kind: 'heading'; text: string }
  | { kind: 'ordered-list'; items: TextPart[][] }
  | { kind: 'list'; items: TextPart[][] }
  | { kind: 'table'; head: string[]; rows: string[][] }

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g
const ORDERED_ITEM = /^\d+[.)]\s+/
const LIST_ITEM = /^[-•*]\s+/
const TABLE_DIVIDER = /^\|?[\s:-]+(\|[\s:-]+)+\|?$/

export const toTextParts = (text: string): TextPart[] => {
  const parts: TextPart[] = []
  let lastIndex = 0
  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0
    if (index > lastIndex) parts.push({ kind: 'text', text: text.slice(lastIndex, index) })
    parts.push({ kind: 'link', text: match[1], href: match[2] })
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) parts.push({ kind: 'text', text: text.slice(lastIndex) })
  return parts
}

export const stripLinks = (text: string) => text.replace(LINK_PATTERN, '$1')

const toCells = (line: string) =>
  line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())

const toBlock = (chunk: string): PostBlock => {
  const lines = chunk.split('\n').map((line) => line.trim())

  if (lines.length === 1 && lines[0].startsWith('## ')) return { kind: 'heading', text: lines[0].slice(3).trim() }

  if (lines.every((line) => ORDERED_ITEM.test(line))) {
    return { kind: 'ordered-list', items: lines.map((line) => toTextParts(line.replace(ORDERED_ITEM, ''))) }
  }

  if (lines.every((line) => LIST_ITEM.test(line))) {
    return { kind: 'list', items: lines.map((line) => toTextParts(line.replace(LIST_ITEM, ''))) }
  }

  if (lines.length > 1 && lines.every((line) => line.startsWith('|'))) {
    const [head, ...rows] = lines.filter((line) => !TABLE_DIVIDER.test(line)).map(toCells)
    return { kind: 'table', head, rows }
  }

  return { kind: 'paragraph', parts: toTextParts(lines.join(' ')) }
}

/**
 * Turns the plain text from /admin into blocks. A blank line starts a new block.
 * "## " makes a heading, "1. " a numbered list, "- " a list, "| a | b |" a table and [text](url) a link.
 */
export const parsePostBody = (body: string): PostBlock[] =>
  body
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map(toBlock)
