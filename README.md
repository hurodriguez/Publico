# Librarian

>The Librarian daemon looks like a pleasant, fiftyish, silverhaired,
>bearded man with bright blue eyes, wearing a V-neck sweater over a
>work shirt, with a coarsely woven, tweedy-looking wool tie. The tie
>is loosened, the sleeves pushed up. Even though he's just a piece of
>software, he has reason to be cheerful; he can move through the
>nearly infinite stacks of information in the Library with the agility
>of a spider dancing across a vast web of cross-references. The
>Librarian is the only piece of CIC software that costs even more than
>Earth; the only thing he can't do is think.
>
>"Yes, sir," the Librarian says. He is eager without being obnoxiously
>chipper, he clasps his hands behind his back, rocks forward slightly
>on the balls of his feet, raises his eyebrows expectantly over his
>half-glasses.
>
>-- from [the pages of *Snow Crash* by Neal Stephenson](http://gaiancorps.com/library/800-literature/item/488-snow-crash-excerpts)

Wikis as a knowledge base.

There are three parts:

1. scraper/indexer of wiki
1. parser of search queries
1. bot glue code

## Installation

1. Install NVM: https://github.com/creationix/nvm
1. Install node: `nvm install && nvm use`
1. Install packages: `npm install`

## Indexing a Github wiki locally

Git clone your github repo into `wiki/` directory:

    git clone --depth 1 ssh://git@github.com/${USER}/${REPO}.wiki.git wiki

Run the indexer:

    node indexer.js 'https://wiki-url-prefix.com/' > 'whatever.json'

To test some queries (it uses the 'whatever.json' file as database):

    node search.js 'keyword'
