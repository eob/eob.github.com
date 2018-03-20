---
layout: post
title: HTML's Three Competing Data Formats
permalink: /2009/08/htmls-three-competing-data-formats
---

I just read an interesting [blog
post](http://www.barklund.org/blog/2009/08/28/html-5-datasets/) about the HTML5
DataSet specification which really got me thinking about the state of data on
the web. In short, it seems the battle for bringing well-structured data to
HTML has been won. Not that there was ever really an opposition, but it is
clear now that the future of the web really does hold potential for structured
re-use of the data within.

## Custom Data Attributes

The [custom data
attribute](http://dev.w3.org/html5/spec/Overview.html#embedding-custom-non-visible-data)
section of the HTML5 spec provides a standard way to embed key-valued metadata
inside any HTML element. Essentially, any attribute beginning with data- will
be treated as a special data item that you can access from the DOM API. For the
jQuery crowd, it appears to natively provide the same functionality that
[jQuery.data](http://docs.jquery.com/Internals/jQuery.data) does. While this is
a very rudimentary form of data storage, it will go a long way toward making
the DOM useful to developers.  From the standpoint of Model-View-Controller
separation, the DOM is currently a view-only part of the puzzle. This enables
it to serve as the model as well, possibly resulting in reduced complexity in
your code. Look at the example the W3C provides, below:

     <div class="spaceship" data-id="92432"
          data-weapons="laser 2" data-shields="50%"
          data-x="30" data-y="10" data-z="90">
      <button class="fire"
              onclick="spaceships[this.parentNode.dataset.id].fire()">
       Fire
      </button>
     </div>

Here we see a DIV node which, in addition to representing a spaceship visually
on the page, now also can contain the data attributes about that spaceship
necessary for the web application to keep its state. Can it be scraped? Sure,
but this probably isn't where you want to stash data intended for external
re-use. Data attributes don't support URIs, for one thing, nor do they support
anything more complex than simple key-value attributes attached do DOM nodes.
For these features you'll need RDFa or Microformats.

### Microdata

Going one step further, HTML5 provides a definition for something it terms
[Microdata](http://dev.w3.org/html5/spec/Overview.html#microdata). Microdata,
like data attributes, are a way to define key-value paris within your HTML
text, but they have a few important differences:

*  Items can be named:

     <div item id="amanda">
     </div>

*  Properties can be added outside of the node that represents the item:

     <div item id="amanda">
     Name: <span itemprop="name"&gtAmanda</span>
     </div>

*  Property subjects can be specified explicitly to avoid ambiguous parsing:

    <div item id="amanda">
    Name: <span itemfor="amanda" itemprop="name"&gtAmanda</span>
    </div>

*  Items can have other items as values, not just literal types:

   <div item id="amanda">
   Band: <span itemfor="amanda" itemprop="band" item id="someBand"&gtThe Scripting Javas</span>
   </div>

