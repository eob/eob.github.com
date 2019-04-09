---
layout: post
title: iWork and SVN don't play well together
permalink: /2011/08/iwork-and-svn-dont-play-well-together
---

My publisher requires that I write in MS Word, but it's so clunky on a Mac (and
iWork so smooth) that I write each chapter in a mixture of text files and iWork
documents and convert it to MS Word at the last minute. But there's
one big problem with the way iWork saves files. 

I have a subversion repository for all my writing projects. Every time I step
away from the computer after having made a change to one I check everything in
so next time I have an idea I can pick up where I left off no matter where I
am. I started noticing a funny pattern with iWork documents that has since
caused me to put `svn:ignore` status on all of them: iWork keeps overwriting my
`.svn` directory.

The problem is that iWork apps save their files as directories.
In Finder, they look like ordinary files, but try opening up the console to see
their true nature for yourself: 

    $ ls -l
    total 688
    -rw-r--r-- 1 ted ted 349696 Aug 27 06:52 189481_ch04.doc
    drwxr-xr-x 8 ted ted 272 Aug 27 06:36 189481_ch04.pages
    
When you do an `svn add` on the pages files, it does what SVN normally does
when it encounters a directory: it traverses recursively through it, adding
`.svn` directories along the way, and adds every file within it.

For the initial checkin, everything works fine, but once you open up iWork and
edit your file the problems start.

    $ svn update
    svn: Working copy '.' locked
    svn: run 'svn cleanup' to remove locks
    (type 'svn help cleanup' for details)

Uh-oh.. 
 
    $ svn status
    L .
    M 189481_ch04.doc 
    ~ 189481_ch04.pages
    
Apparently iWork doesn't like other programs adding content to their files..
er..  directories.. er..  file-directories. The `.svn` folder is overwritten,
completely messing the whole version controll tree (if you're the kind of
person that likes to commit and update in batch). It seems that Apple is moving
toward the "managed directory" style of information management. Instead of one
large file to store a particular document or presentation, you get a whole
directly that masquerades as a file (I think NeXT did this a lot..).

That is a cool choice, I suppose -- as a developer I would certainly rather
manage a directory of files than one ginormous monolithic on. But at some point
Apple is going to have to address the fact that many command line utilities
will either get confused at this style of file storage or, like SVN and CVS,
will try to add their own data into the mix. Pages is a wonderful word
processor, and as of iWork 08 I don't really see a need to ever fire up Office
X unless I have to (Office for Windows is great...the OS X version is just a
piece..).  But this is a huge problem for anyone who uses version control
regularly, and I hope either a fix or a work around is devised soon.

