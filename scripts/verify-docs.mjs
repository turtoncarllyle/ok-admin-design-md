import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const version = '2.0_dev';
const commit = '247f0f2ee3dce10adcece6261bdc3ef060cbb567';
const args = process.argv.slice(2);
assert(args.length === 0 || (args.length === 2 && args[0] === '--source'),
  'Usage: node scripts/verify-docs.mjs [--source path]');
const source = args.length === 2 ? resolve(args[1]) : null;
const files = ['README.md', 'README.en-US.md', `versions/${version}/DESIGN.md`,
  `versions/${version}/DESIGN.zh-CN.md`, `versions/${version}/AUDIT.md`];
const decoder = new TextDecoder('utf-8', { fatal: true });
const read = (file) => decoder.decode(readFileSync(resolve(root, file))).replace(/\r\n/g, '\n');
const docs = files.map(read);
let assertions = 0;
const check = (value, message) => { assert(value, message); assertions += 1; };

function metadata(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  check(match, 'Missing front matter');
  const values = {};
  const stack = [];
  const lines = match[1].split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line) continue;
    const entry = line.match(/^( *)([A-Za-z0-9-]+):(?: (.+))?$/);
    check(entry && entry[1].length % 2 === 0, `Unsupported metadata: ${line}`);
    const depth = entry[1].length / 2;
    check(depth <= stack.length, `Invalid metadata indentation: ${line}`);
    stack.length = depth;
    stack.push(entry[2]);
    const key = stack.join('.');
    check(!(key in values), `Duplicate metadata: ${key}`);
    if (entry[3] && entry[3].startsWith('>')) {
      values[key] = '';
      while (index + 1 < lines.length && /^  (?![A-Za-z0-9-]+:)/.test(lines[index + 1])) index += 1;
    } else {
      values[key] = entry[3] === undefined ? null : JSON.parse(entry[3]);
    }
  }
  check(values.version === version, 'Version drift');
  check(values.name === 'ok-admin-design-system', 'Name drift');
  check(values.colors === null && values.typography === null, 'Required maps missing');
  check(values['typography.body.fontSize'] === '14px', 'Body font size drift');
  check(values['typography.body.lineHeight'] === 1.6, 'Body line-height drift');
  return values;
}

const englishMeta = metadata(docs[2]);
assert.deepEqual(englishMeta, metadata(docs[3]), 'Bilingual metadata differs');

function unfenced(text) {
  let fence = null;
  return text.split('\n').filter((line) => {
    const marker = line.match(/^(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
      return false;
    }
    return !fence;
  }).join('\n');
}

function sectionSignature(text) {
  const body = unfenced(text).replace(/^---\n[\s\S]*?\n---\n/, '');
  return body.split(/(?=^#{2,3} )/m).slice(1).map((part) => ({
    level: part.match(/^#+/)[0].length,
    literals: [...part.matchAll(/`([^`\n]+)`/g)].map((match) => match[1]).sort(),
    sources: [...part.matchAll(/\[(S\d{2})\](?!:)/g)].map((match) => match[1]).sort()
  }));
}

assert.deepEqual(sectionSignature(docs[2]), sectionSignature(docs[3]),
  'Corresponding bilingual sections differ in hierarchy, technical literals, or source references');

let localLinks = 0;
for (let index = 0; index < docs.length; index += 1) {
  const text = docs[index];
  check(!text.includes('\uFFFD'), `Replacement character in ${files[index]}`);
  check(!text.includes('\0'), `NUL in ${files[index]}`);
  check((text.match(/^```/gm) || []).length % 2 === 0, `Unbalanced fences in ${files[index]}`);
  const body = unfenced(text);
  const definitions = new Map([...body.matchAll(/^\[(S\d{2})\]:\s+(\S+)$/gm)]
    .map((match) => [match[1], match[2]]));
  for (const match of body.matchAll(/\[(S\d{2})\](?!:)/g)) {
    check(definitions.has(match[1]), `Missing source reference ${match[1]} in ${files[index]}`);
  }
  const links = [...body.matchAll(/\]\(([^\s)]+)\)/g)].map((match) => match[1]);
  links.push(...definitions.values());
  for (const link of links) {
    if (/^(?:https?:|mailto:|#)/.test(link)) continue;
    const target = resolve(dirname(resolve(root, files[index])), decodeURIComponent(link.split('#')[0]));
    const rel = relative(root, target);
    check(!rel.startsWith('..') && !isAbsolute(rel), `Out-of-repository link: ${link}`);
    check(existsSync(target), `Broken relative link in ${files[index]}: ${link}`);
    localLinks += 1;
  }
}

check(docs[0].includes('[English](README.en-US.md)'), 'Chinese language switch missing');
check(docs[1].includes('[简体中文](README.md)'), 'English language switch missing');
check(readdirSync(resolve(root, 'versions')).includes(version), 'Version directory missing');
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0');
check(!tracked.some((file) => file.startsWith('ok-admin-v2.0_dev/')), 'Reference source is tracked');
check(execFileSync('git', ['check-ignore', '--no-index', 'ok-admin-v2.0_dev/index.html'],
  { cwd: root, encoding: 'utf8' }).trim().length > 0, 'Reference source is not ignored');

if (source) {
  const css = (file) => readFileSync(resolve(source, file), 'utf8');
  const layui = css('lib/layui-v2.6.8/layui/layui.js');
  const okCss = css('css/okadmin.css');
  const common = css('css/common.css');
  const sub = css('css/oksub.css');
  const theme = css('css/okadmin.theme.css');
  const config = css('js/okconfig.js');
  const tab = css('js/okmodules/okTab.js');
  const index = css('index.html');
  const navs = JSON.parse(css('data/navs.json'));
  const sourceChecks = [
    [layui, /this\.v="2\.6\.8"/, 'Layui version'],
    [okCss, /width: 220px !important/, 'Sidebar width'],
    [okCss, /height: 49px/, 'Header height'],
    [okCss, /left: 220px/, 'Content offset'],
    [okCss, /max-width: 768px/, 'Mobile breakpoint'],
    [okCss, /#20222A/i, 'Brand color'],
    [okCss, /#001529/i, 'Navigation color'],
    [okCss, /#4E5465/i, 'Hover color'],
    [common, /#F1F2F7/i, 'Content surface'],
    [okCss + common, /#F5F7F9/i, 'Tab surface'],
    [sub + theme, /#2D8CF0|#FF4806/i, 'Theme colors'],
    [theme, /#FF4806/i , 'Orange theme'],
    [theme, /#2D8CF0/i, 'Blue theme'],
    [config, /openTabNum|isTabMenu|isTabRefresh/, 'Tab configuration'],
    [tab, /openTabNum: 30/, 'Tab limit'],
    [index, /placeholder="默认密码123456"/, 'Demo password marker']
  ];
  for (const [text, pattern, name] of sourceChecks) check(pattern.test(text), `Source evidence changed: ${name}`);
  check(navs.length === 11, 'Navigation group count changed');
  check(englishMeta['colors.primary-blue'] === '#2D8CF0', 'Primary blue metadata drift');
  check(englishMeta['colors.primary-orange'] === '#FF4806', 'Primary orange metadata drift');
}

console.log(JSON.stringify({ result: 'PASS', version, commit, documents: files.length,
  assertions, localLinks, sourceChecks: Boolean(source),
  limits: 'Static checks only; no browser UI, API, assistive-technology, or production-authentication test.' }, null, 2));
