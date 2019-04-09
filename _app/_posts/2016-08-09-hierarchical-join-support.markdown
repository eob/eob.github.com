---
layout: post
title: Hacking hierarchical joins into Spreadsheets, Rails Style
permalink: /2016/08/hacking-joins-into-spreadsheets-rails-style
published: true
tags:
  - Hacks
  - Cloudstitch
---

Sometimes frustration drives you toward a quick, simple solution that should
have been obvious from the start.

My company [Cloudstitch](https://www.cloudstitch.com/) synchronizes web sites
with spreadsheets. You can build impressively complex sites with zero back-end
infrastructure: just a simple spreadsheet.

*…But sometimes that spreadsheet isn’t so simple*.

Yesterday I was helping a customer debug a message board that runs on
Cloudstitch. The website looks like an ordinary message forum, but it
synchronizes with a spreadsheet containing two worksheets: **Posts **and
**Comments**.

The **Posts **sheet includes a column that aggregates the comments for each post
with this formula:

*This is crazy!* I found myself thinking. *Simple joins like this are everywhere
on web sites. Surely coercing the spreadsheet to support them can’t be this
hard.*

But no matter what clever solution I tried, they all ended up leaving me
wincing.

### Rails-style Joins

Then I remembered watching [the original Ruby on Rails
tutorial](https://www.youtube.com/watch?v=Gzj723LkRJY), thinking how magical the
data joins were. DHH’s key insight was that most data joins in web apps conform
to a few simple templates— so why not build in syntactic sugar to automate them?
Thus a simple annotation like the one below would expand, at the ORM-level, into
a one-to-many equi-join:

This idea, along with the syntactic sugar for using it, seemed like a perfect
solution. It solves the 80% use case, and it can be expressed easily in
spreadsheet form. That second part is super important: we’re committed to
building an amazing web development platform that syncs with **the software
you’re already using**. That’s a great win for users, but it places heavy design
constraints on us to find solutions that work well with your existing
spreadsheets.

### Rails-style Joins for Spreadsheets

By the end of the day, Cloudstitch had production-support for two kinds of
joins, Rails-style **belongs_to** and **has_one**. Here’s how it works:

* Request a join by adding a special “join column” in your spreadsheet
* Cloudstitch materializes the join and caches the results [1]
* The web templates that synchronize with this spreadsheet can now refer to
joined, nested, JSON objects — exactly what the template author wants — instead
of flat JSON tables.

It’s easier to show than tell— here’s an example of each type.

#### Belongs To

Adding a **Belongs To **column creates a 1-to-many join. It places the results
on the foreign table referenced in the column name.

Let’s say you have a Football spreadsheet with a **Teams** column and a
**Players** column. To join the roster of each team into the Teams sheet, do the
following:

Cloudstitch materializes this spreadsheet into the following JSON:

Your template can now be written against this nested hierarchy. No need for
crazy spreadsheet formulas or Javascript rigamarole. Here’s a simple Handlebars
example.

#### Has One

Adding a **Has One** column creates a 1-to-1 join. Items from the foreign table
(specified in the column name) will be embedded on the local object. The
contents of the Has One column specify the value to join against.

Let’s flip up that Football example. Say we want to embed the team data inside
each player item. Use a **Has One** column like the one below:

Cloudstitch will materialize this spreadsheet into a different JSON object than
the one before:

Similarly, you can now write a Handlebars template that takes advantage of this
embedding, like this one.

### Simple Concepts should have Simple Executions

So that’s it. 24 hours later, that unwieldy spreadsheet formula that started all
this can be expressed with a simple column called **Belongs to Posts!ID**.

It’s such a simple solution that addresses an enormous space of use cases, and
it does it in a way that feels “spreadsheety” in all the good ways and none of
the bad.

### We’re Hiring

I can’t end without a plug: [Cloudstitch is
hiring](https://www.cloudstitch.com/hiring). If you’re a web developer or
designer that wants to simplify and democratize web development, we want to talk
to you.

—

[1] Note: We use [Tarjan’s
Algorithm](https://en.wikipedia.org/wiki/Tarjan's_strongly_connected_components_algorithm)
as a cheap O(|V|+|E|) way to detect cycles, and if we find one, we skip the join
processing all together.
