## introduction

used in pre-commit hook when you want to limit code changes of this git commit.

### ✨✨✨

- helps to keep small commit
- clean and precise pull request
- better for code reviewers

## install

```bash
npm i git-change-staged
```

## usage

### config

##### package.json

```json
{
  "git-change-staged": {
    "files": 10,
    "lines": 200
  }
}
```

### cli

```bash
git-change-staged
```
