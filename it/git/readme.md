# GIT

[[toc]]

## Configurer le proxy sur GIT

```bash
git config –global http.proxy http[s]:userName:password@proxyaddress:port
```

## Configurer redirection d'url sur GIT

```bash
git config –global url.https://github.com/.insteadOf git:github.com/
```

**Exemple d'un fichier** `~/.gitconfig` : 

```bash
[url "https://github.com/"]
    insteadOf = git://github.com/
[url "https://github.com/"]
    insteadOf = ssh://git@github.com/
[http]
    sslVerify = false
    proxy = http://login:pwd@proxys:80
[user]
    name = Clement BERARD
    email = mail@monmail.com
[https]
    sslVerify = false
    proxy = http://login:pwd@proxy.com:80
```

## Retrouver l'état précedent des fichiers

Ce sujet est une source constante d’incompréhension pour beaucoup d’utilisateurs de git, simplement parce qu’il y a plusieurs manières d’accomplir cette tache. Voici quelques commandes simples pour revenir en arière. Ainsi, pour revenir à l’état original d’un fichier :

```bash
git checkout <file>
```
Un problème possible est qu’un fichier et une branche portent le même nom. Comme la commande ‘checkout’ est utilisée à la fois pour changer l’état d’un fichier et changer de branche, il vous faudra utliser la syntaxe suivante (Merci , Norbauer)

```bash
git checkout – <file>
```

Si vous voulez supprimer tous les changements effectués, il y a une deux manières de faire.

```bash
git checkout -f ou git reset –HARD
```

Une fois ces commandes effectuées, vous perdrez tout le travail que vous n’avez pas ajouté à votre répertoire courant, assurez vous de les utiliser avec soin.

De plus, garder à l’esprit que ‘git revert’ n’est pas équivalent à ‘svn revert’! git-revert est utilisé pour inverser les ajouts (commit), une prochaine astuce traitera de ce sujet.

## Rebase

### Rebase clasique

```bash
git checkout feature_branch
git rebase master
```

Et la il peut y avoir des conflits. Il faut les corriger puis : 

```bash
git rebase --continue
```

Si vous voulez stopper le `rebase` en cours de route : 

```bash
git rebase --abort
```
#### Sur une autre branche que Master

*Use Case* : 

- Je créé une branche `feat-1` à partir de `master` et j'y apporte des modifications

- Je créé une autre branche `feat-2` à partir de `feat-1`

- Pour mettre à jour `feat-1`, je dois la rebase sur `master`

- Pour mettre à jour `feat-2`, je dois la rebase sur `feat-1`

::: warning
Bien garder toutes vos branches en local
:::

```bash
git checkout feat-1
git rebase origin/master

git checkout feat-2
git rebase --onto origin/master feat-1
```

### Rebase interractif

```bash
git rebase -i master
```



## Merge

```bash
git checkout master
git merge --squash feature_branch
```

Et un commit/push sur la master et c'est fini :tada:

## Push en supprimant l'historique

_et donc preserver de l'espace disque_

```bash
git checkout --orphan newBranch
git add -A
git commit
git branch -D master
git branch -m master
git push -f origin master
git gc --aggressive --prune=all
```

## Keep your feature branch up to date (Rebase automatique)

Function (alias) pour rebase une branche sur la dernière version de master

Put this function in your .bashrc or .zshrc. It automates it for you.

```bash
function rebaseMaster(){
  git fetch && git checkout master && git pull && git checkout - && git rebase master
}
```

## Git Config

### Alias

ℹ️ [Doc Git](https://git-scm.com/book/fr/v2/Les-bases-de-Git-Les-alias-Git)

```bash
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

### My config

Content of `~/Users/myname/.gitconfig`

```bash
[user]
        name = Clément BERARD
        email = myname@clementberard.com
[core]
        excludesfile = /Users/myname/.gitignore_global
        autocrlf = input
[alias]
        co = checkout
        cob = checkout -b
        st = status
        pof = "push origin --force"
        po = "push origin"
        br = branch
        ci = "commit --message"
        last = "log -n 1 --pretty=format:\"%H\""
```

## Useful commands

__Hash du dernier commit__

*Exemple sur la branche `origin/master`*

```bash
git log -n 1 --pretty=format:"%H" master
```
__Squash de tous les commits d'une branche__

ℹ️ Utilisation de `git-extra`

*Avoir toutes ses branches à jour en local*

```bash
# recuperation du dernier commit de master

git log -n 1 --pretty=format:"%H" master

# le dernier commit est b3357c607c3a49b532bffec7a6b5fb62841262c5

git squash b3357c607c3a49b532bffec7a6b5fb62841262c5 "nouveau nom de commit"
```


## Useful tools

> `git-extra`

- [https://github.com/tj/git-extras](https://github.com/tj/git-extras) | [Commands](https://github.com/tj/git-extras/blob/master/Commands.md)
- installation MacOS `brew install git-extras`

