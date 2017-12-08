---
layout: post
title: Migrating my blog to Jekyll from Blogger
date: '2017-12-07T21:40:00.005-04:00'
author: ethomasjoseph
published: false
categories: [developerhub, blog]
modified_time: '2017-12-07T21:40:00.005-04:00'
---
I started blogging starting 2007 more as an experiment. Although I have not been good at blogging. Having a blog was important for me since I would often write draft ready for publishing, even though those would never be published. It just worked, but not good enough for technologist - to put a code snippet it just takes a lot of time. I always felt constrained by the web based editor, and the limitations of Blogger in how much can be customized. Finally, I have decided to say Bye to Blogger and say Hi to Jekyll for powering my blog, and my personal website.

## Starting the migration
The effort for this move began approximately a year back, when I was trying to learn some frontend technology stack (even though that not my day job) - Bootstrap, Gulp, Bower, SASS, LESS etc. I also got to know about Jekyll and GitHub's support for it from a few reads online. So I started putting some effort to learn Jekyll and used it along with NodeJS etc to form the foundation for this website. My previous experience with Liquid script (which is the templating language for Jekyll), when I was working on _Shopify_, has made me feel at home with the templating script. My significant experience with Content Management Systems has also given me the advantage of thinking about content in terms of templates and components, thereby making the content management part of it easy - eg, I can think of a component if I have to copy paste the same HTML snippet over and over again.

## Added Bounties
Although it took some significant time to set this up (I was almost done by January early this year), it was all it good. While setting up a more flexible website was the core reason for this move, there were a few extra goodies with this move.
* **Simple text files** - Publishing a post or article is simply editing a text file, with optional markdown and HTML syntax.
* **Versioning** - Now I can easily write a post or an article, while all of them being versioned by Git.
* **Easier updates to content** -The concept of <a href="https://www.martinfowler.com/bliki/WhatIsaBliki.html" target='blank'>Bilki</a> has now come true for my own website - I can write posts and articles which can evolve over time. However for the sake of logical distinction, things that are time based - an incident or event can go as a post (although corrections can be done). However some other topics, which can evolve over time can be written as articles.
* **Not just blog** - Not this website is not just a blog, but much more. With ability to host pages, the possibility of using the website for hosting personal content are many. Apart from blog, this website would also serve as my online portfolio and a flexible content platform in general.


## The migration process
I started with taking a dump of the Blogger (Exported as XML) following the process described in the Jekyll website.
* created website wireframes
* HTML and SASS
* Jekyll, NodeJS and Gulp Scripts



## There is more to come
Apart from new and more frequent content, there are a few things to be adjusted here and there to get this to a better place:
* writing a NodeJS/Gulp routine to automate the post creation task
* adding the syntax highlighting for code snippets
* migrating the images from older domains to GitHub hosted content.
