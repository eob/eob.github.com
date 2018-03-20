---
layout: post
title: How Safari and Firefox handle HTML 5 Manifest files
permalink: /2009/09/how-safari-and-firefox-handle-html5-manifest-files
---

I was doing some experiments with Adam in the lab on Friday, and we discovered
some interesting variations in the way that Firefox and Safari implement the
HTML 5 Cache Manifest specification. I think this is a particularly important
feature to have implemented consistently across platforms because it is the
make-or-break feature of HTML5 that will permit web applications to function
offline.

## First, what is the manifest?

For people who haven't heard about this feature before, the manifest is
essentially a special file that lists portions of a web site that should be
cached locally for offline access. This is the feature of HTML 5 that will
standardize the type of "airplane mode" access that GMail users have with
Google's custom Gears plugin. The manifest is served as a regular old file,
with MIME type `text/cache-manifest`, and is linked from the `html` tag itself,
as follows:

    <html manifest="site.manifest">

     ..

    </html>

Once a web site is marked as being cached, then the browser will use the local
cached copy of all the files specified in the manifest instead of attempting to
load them from the internet. Say you're on an airplane and type in the URL for
`http://my_cached_site.com`. The browser will recognize it as a cached one,
load it from its local storage instead, and then use a new JavaScript API to
inform the web site that it is running in offline mode. So now for the
important part, how do these two browsers (Firefox and Safari) handle this
file?

## Firefox

Upon loading an HTML5 document with a manifest attached, Firefox firsts asks
permission to cache the site offline before requesting the manifest file from
the server. Here is how the toolbar looks on my browser:

![Firefox 1](http://www.edwardbenson.com/images/posts/manifest-firefox1.png)

And here is the server log (I'm using a Rails project to test this) to show
that the manifest was not yet loaded:

![Log 1](http://www.edwardbenson.com/images/posts/manifest-log1.png)

If you choose to allow offline caching, the web browser then requests the cache
file, as can be seen from this screen shot.

![Log 2](http://www.edwardbenson.com/images/posts/manifest-log2.png)

Now here's the cool thing, I set the headers on the manifest file such that the
manifest file itself should also be cached on the client side:

     headers["Expires"] = "Fri, 30 Oct 2010 14:19:41 GMT"
     headers["Cache-Control"] = "max-age=3600, must-revalidate"

And the result of this is that the subsequent load, no files at all are loaded
from Firefox -- it operates entirely offline. Notice the completely empty
server log as I reload the site 2..n times.

![Log 3](http://www.edwardbenson.com/images/posts/manifest-log3.png)

## Safari

Now let's look at how Safari does it. Upon loading the web page, Safari also
does not load the manifest file, as can be seen from this screen shot:

![Log 4](http://www.edwardbenson.com/images/posts/manifest-log4.png)

However, it also does not ask any questions about offline access. The next time
I load the web page, something strange happens. Safari checks the manifest file
twice and then doesn't load the actual HTML page (because it doesn't have to).
The double-loading of the manifest file appears to be on the second page load,
not split 1/1 between the page departure and subsequent reload. A little
strange, if you ask me.

![Log 5](http://www.edwardbenson.com/images/posts/manifest-log5.png)

Furthermore, when I reload the page, despite the HTTP headers specifying that
the manifest should be cached, Safari reloads the manifest file. Though, at
least it only loads it once for every subsequent time:

![Log 6](http://www.edwardbenson.com/images/posts/manifest-log6.png)

## Conclusion

I'm no spec-master, but it seems like Firefox's implementation of this feature
is what I would want to happen as a web architect, while Safari's behavior
seems a bit strange. 

Firefox:

1.  Only loads the web page once
2.  Asks the user for permission to enter offline mode
3.  Only downloads the manifest file once if given permission
4.  Then obeys HTTP Cache Control headers to suppress reloading the manifest file on future loads

If Safari were to also behave like this, there are a few fixes that need to be
implemented. Namely:

1.  Ask the user if offline access should be allowed
2.  Load the manifest when the user loads the page the first time (and approves offline mode), not the second time, when the user might be on an airplane
3.  Stop loading the manifest file multiple times in a single page load
4.  Start obeying the HTTP cache headers so that zero web connections are necessary if the cache says so

Safari's Manifest handling quirks aside, both browser teams should be applauded
for so aggressively implementing the HTML5 spec. It is a real treat as someone
  researching web platforms to get to test the in-progress spec on real
  browsers instead of just talking about what might eventually happen down the
  road. 
  
This article is
[cross-posted](http://groups.csail.mit.edu/haystack/blog/2009/09/26/how-safari-and-firefox-handle-html-5-manifest-files/)
on the [Haystack Blog](http://groups.csail.mit.edu/haystack/blog/).
