## introduction

Used in pre commit hook when you want to limit the changes of a commit.

> for example: you can set the rule that all commits should have less than 200 lines diff change, to keep this project's pull request better to code review.

## install

```bash
tnpm i git-change-staged
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
