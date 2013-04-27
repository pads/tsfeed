# tsfeed

RSS feed reader application for TiddlySpace

I'm hacking this together as another dog-food exercise for TiddlySpace.  For an example visit:
http://tsfeed.tiddlyspace.com/tsfeed

# Managing Feeds

The application saves a list of feed URLs as a single tiddler called tsfeeds.
It is a plain text tiddler with each URL on a new line.  It can be edited by hand e.g:

    http://site.com/feed.atom
    http://another.site.com/feed.atom

The application reads the list to initialise the page.
It appends a feed URL to the list after it is added.
It removes a feed URL from the list after it is removed.

# Contributing

## Requires

* Node
* Grunt
* Ruby
* Compass

## Setup

`npm install`
`gem install compass`

Run `grunt --help` to see available project tasks.

# To Do

* Better styling and layout tweaks.
* Error handling.
* Tests, refactoring and other nice things that remove the hackery.
* Browser support other than Chrome.
