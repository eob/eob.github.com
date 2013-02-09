---
layout: post
title: Eval in Template Languages
permalink: /2013/02/eval-in-template-languages
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

Careful planning of architectural constraints is a bit like UI design. Like
UIs, the development frameworks offer affordances (the commands they support),
require learning (tiptoeing around the framework's particular constraints), and 

