---
layout: post
title: "Magical Source Code Highlighting"
permalink: /2014/08/magical-source-code-highlighting
published: true
tags:
- "programming"
- "html"
---

This is perhaps the coolest command line trick I have learned in recent memory. 

Any time I need to syntax highlight a snippet of HTML to insert on a presentation slide, I simply copy it to the clipboard, run `highlight-html` on the command line, and voila! The clipboard now contains properly syntax highlighted code ready for pasting.

Here's how to set your computer up so you can do it too.

First, install the `highlight` package for brew

    brew install highlight

Then create executable shell scripts located in `$PATH` of the following form:

    pbpaste | highlight --syntax=html -O rtf | pbcopy

This one is named `highlight-html`. I've got others for other languages (CSS, Javascript, Python, etc).

That's it.

I suspect this is the beginning of a beautiful relationship between `pbpaste` and `pbcopy` and my shell scripting. 
