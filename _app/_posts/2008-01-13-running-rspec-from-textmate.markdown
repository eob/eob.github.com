---
layout: post
title: Running rSpec from TextMate
permalink: /2008/01/running-rspec-from-textmate
---

Just a quick tip for installing the rSpec bundle for TextMate: it is important
that the bundle that you install is synced with the version of rSpec that you
are actually running on your machine / in your project. Otherwise you will get
a bunch of Ruby errors.

Close TextMate, open up a shell, and go to the bundles directory for your
installation, which is probably something like this:

    /Users/USER/Library/Application Support/TextMate/Pristine Copy/Bundles/
    
And then run the following code to pull down the latest (you may want to use a
particular tag) from their repo:

    svn export http://rspec.rubyforge.org/svn/trunk/RSpec.tmbundle/
    
Then you can enjoy nice testing by pressing Command-R from within one of your
spec files: (IMAGE REMOVED - My blog was hacked and I lost data)
