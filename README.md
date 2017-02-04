# Github + Bootstrap Powered Website
This project is the code and configuration for my personal bliki website (blog + wiki), which gives me the power to write articles that evolve over time.

This uses an interesting mix of technology - aptly to power my technology bliki:
* [Jekyll](https://jekyllrb.com) (& its related technologies in [Ruby](https://www.ruby-lang.org))
* [Bootstrap](http://getbootstrap.com/) & [jQuery](https://jquery.com/)
* [NodeJS](https://nodejs.org) and friends ([Bower](https://bower.io/), [Gulp](http://gulpjs.com/) etc.)

## Driving Forces
The reason for me to start a Github powered website had multiple reasons:

1. [Flexibility](http://www.martinfowler.com/bliki/WhatIsaBliki.html) of a blog & wiki as described by Martin Fowler. I used Blogger since 2006 for my blog, but I always wanted more power - especially when dealing with technology topics.
2. Power and flexibility to control the look and feel of the content published.
3. Learning and apply some frontend technologies such as Bootstrap, Bower & Gulp.
4. Free - as in free speech as well as free as in free beer. Being in Github does not require me to have a web hosting provider. The even better part is that it is free for anyone to see and learn. 

## Setting up your local environment
##### 1. Install latest version of ruby and devkit - from http://rubyinstaller.org/downloads/.

##### 2. Install Jekyll and other dependencies

```bash
gem install jekyll
gem install bundler
gem install github-pages
gem install jemoji
gem install wdm
```
##### 3. Delete the ```Gemfile.lock``` and rebuild it:

```bash
bundle install
```
Psst! You may encounter issues while installing Ruby gems (especially on Windows), since some of them require native extensions. In that case please follow Ruby documentation.

##### 4. Make changes and run Jekyll locally to confirm that the command executes properly. Do not focus on the website output yet. More information on Jekyll on its official documentation at https://jekyllrb.com/docs/home/.
```bash
bundle exec jekyll serve
```

##### 5. No doubt - you will have to also setup NodeJS and its friends. Install the latest NodeJS from https://nodejs.org/.

##### 6. Now install Gulp as described in https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md.

##### 7. Now setup initial NodeJS and Bower dependencies for this project

```bash
npm install
bower install
```

## Building & Publishing
This is where NodeJS and friends come to play. Gulp has been used to automate most of the tasks needed for building and running the website locally.

The idea here is that Gulp would be used to perform most of the workflow including compilation of SASS, minification, uglification, linting etc. Jekyll will be used to assemble the pages to HTML output. 

### Updating web dependencies
If you need to update the web dependencies, update the versions on ```bower.json``` and run bower again. See the Bower documentation for more information.
```bash
bower install --force
```

### Editing website content and previewing
The normal website edit - whether it is changing the code or design, or whether it is adding new content, gulp tasks have been confugured for these as well, which will also run the Jekyll, so that you can exactly see how it will look when hosted on Github pages.

```bash
gulp serve
```

The above command will process the JavaScript files by concatinating, uglifying and linting them; start Jekyll server; and lint the generated HTML files as well!

### Publishing changes to Github powered website
Simply running ```gulp``` will do all the above tasks, but without running the Jekyll server itself, and instead preparing for committing the changes to Github.

Once the ```gulp``` command has successfully executed. The resulting state of the repository can be committed and pushed to Github for instant publishing.

## Contributions
Please use the issues tracker on Github to report any issues on this project. 

## References
* Github Pages documentation - https://pages.github.com/
* Inspiration on Jekyll with Bootstrap - http://jekyllbootstrap.com/
* Import your old & busted site or blog for use with Jekyll - http://import.jekyllrb.com/
* Learn about liquid syntax (templating language used in Jekyll) - https://shopify.github.io/liquid/
* Nice & elaborates tutorial on setting up Jekyll website on Github pages - http://digitaldrummerj.me//blogging-on-github-part-1-Getting-Started/
