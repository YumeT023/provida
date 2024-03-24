
# 🧪 TS monorepo starter (pnpm)

> /!\ Skip the **env configuration step**

JS folks wanna **npm install** your lib/framework **right now**

## 🛠  Usage

Prerequisite: [Proplate cli](https://github.com/YumeT023/proplate) `^0.3.0`

### Bootstrap project

```shell
proplate create --template https://github.com/YumeT023/ts-monorepo-starter --dest destination
cd destination
```

### Install deps

```shell
pnpm install
```

### Build

build all or pass the package to build

```shell
pnpm build <targets?>
```

## 🧨 Features

- [ ] Bundler: [rollup](https://rollupjs.org)
- [x] Code quality:
  - [x] formatter: [prettier](https://prettier.io/)
  - [x] linter: [eslint](https://eslint.org)
  - [x] testing: [vitest](https://cypress.io)

