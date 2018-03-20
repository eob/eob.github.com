---
layout: post
title: Eval in Template Languages Considered Harmful
permalink: /2013/02/eval-in-template-languages
published: true
thumbnail: eval.png
tags:
- "the web"

---

I'm of the opinion that supporting the `eval` statement in template languages
is a Bad Idea, precisely because it's such a useful outlet to have. How many of
us have been delighted to write a short script in PHP, only to later bemoan the
spaghetti code that ultimately results over the lifetime of the project.

A site called Egghead.io recently released a series of videos about Angular.JS,
a really cool Javascript framework. They haven't even gotten one minute into
the first video (55 seconds, actually!) before they issue this disclaimer about
Angular's templates:

> Many expressions can be evaluated in here. Now there's a lot of things you
> shouldn't do in here [inside the template's `eval` affordance]. You should
> keep this logic to a minimum. Because this is your view and presentation. But
> there's really quite a lot of things you can do in there.

Careful planning of architectural constraints is a bit like user interface
design. Like user interfaces, development frameworks offer affordances (the
commands they support), require learning (tiptoeing around the framework's
particular constraints), and benefit from homogenization.

But when you provide support for `eval`, it creates an easy escape hatch that
prevents homogenization. If something doesn't fit into your framework well,
rather than fix the problem (or decide it isn't important), one can just jump
through the `eval` escape hatch, skirting the framework's architectural choices
and inlining arbitrary Javascript code.  

This opinion might sound extreme, but I think it is called for when you
consider that good framework designers strive to provide *guarantees* about the
behavior and performance of code using their framework. This requires reasoning
about code, and reasoning about code requires a declarative view of computation
which `eval` destroys. It's the difference between a toolbelt, like
`backbone.js` and what you might call a Proper Architecture, like `MapReduce`.
