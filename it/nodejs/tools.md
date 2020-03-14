# Tools Nodejs

[[toc]]

## NPM

### Tips

Configurer le proxy sur NPM

```bash
npm config set proxy http://login:pwd@proxys:80
npm config set https-proxy http://login:pwd@proxys:80
```

### Outils pour Windows

```bash
npm install --global windows-build-tools
```

Installe les outils suivant :

* Visual C++ Compilers (targeting x86, X64 and ARM)
* Visual C++ headers & libraries (CRT & STL)
* Visual C++ build scripts (targeting Windows desktop)
* Microsoft Build Tools 2015 (MSBuild)
* Windows SDK 8.1 (optional, on by default)
* Windows SDK 10 (optional, off by default)
* ATL and MFC (optional, off by default)
* C++ Build tools specific command prompts

[https://www.npmjs.com/package/windows-build-tools](https://www.npmjs.com/package/windows-build-tools)

## NVM

### Tutos

#### NVM avec ShellFish

- Il faut dans un premier temps installer [https://github.com/edc/bass](https://github.com/edc/bass)
en global

- Ensuite il faut ajouter une fonction dans ShellFish : 

```bash
function nvm
      bass source ~/.nvm/nvm.sh ';' nvm $argv
end
```

[https://github.com/creationix/nvm/issues/303#issuecomment-121086278](https://github.com/creationix/nvm/issues/303#issuecomment-121086278)

## Installation

### Debian

Installer NodeJS

```bash
sudo apt-get install -y nodejs

node -v

sudo npm install npm --global

# u install

npm install -g n

n latest

curl -0 -L https://npmjs.com/install.sh | sudo sh
```

Links : 

- [https://nodesource.com/blog/installing-node-js-tutorial-debian-linux/](https://nodesource.com/blog/installing-node-js-tutorial-debian-linux/)

## Tooling

### Eslint

Disable rules

```js 
// eslint-disable-next-line consistent-return

/* eslint array-callback-return: "off" */

/* eslint no-console: "off", consistent-return: "off", prefer-promise-reject-errors: "off" */
```

- [https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-abusive-eslint-disable.md
](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-abusive-eslint-disable.md
)
