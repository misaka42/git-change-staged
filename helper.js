import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const CONFIG_KEY = 'git-change-staged';

export function getConfig() {
  const pkgJSONString = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8');
  const pkgJSON = JSON.parse(pkgJSONString);
  return pkgJSON[CONFIG_KEY] || {};
}

export function getGitChangeStat() {
  const rs = execSync('git diff --cached --shortstat', { encoding: 'utf8' });
  return {
    files: getMatchedNum(rs, / (\d+) files changed/),
    insertions: getMatchedNum(rs, / (\d+) insertions/),
    deletions: getMatchedNum(rs, / (\d+) deletions/),
  };
}

export function validate() {
  const config = getConfig();
  const { files, insertions, deletions } = getGitChangeStat();
  const lines = insertions + deletions;

  if (config.lines && lines > config.lines) {
    errorMessage(`lines changed ${lines} > ${config.lines}`);
  }

  if (config.files && files > config.files) {
    errorMessage(`files changed ${files} > ${config.files}`);
  }
}

function getMatchedNum(str, regexp) {
  const matches = str.match(regexp);
  if (matches && matches.length) {
    return Number(matches[1] || 0);
  }
  return 0;
}

function errorMessage(msg) {
  throw new Error(`[git-change-staged] ${msg}`);
}
