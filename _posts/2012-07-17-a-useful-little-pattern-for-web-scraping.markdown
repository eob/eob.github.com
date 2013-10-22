---
layout: post
title: A Useful Little Pattern for Web Scraping
permalink: /2012/07/a-useful-little-pattern-for-web-scraping
thumbnail: fixer.png
tags:
- "data analysis"
- "scala"

---

I've been doing a lot of web and Google Spreadsheet scraping recently, and one
situation I've run into a lot is that the schema of the data source doesn't
*quite* fit into the schema I'm trying to dump the data into. The data source
might expose someone's full name, for instance, whereas I want to store the
first and last name separately. I've developed a useful little coding pattern
to help with that situation that I thought I'd share here.

Let's say that the scrape of any data source produces a result `result :
Map[A,B]`, where `A` and `B` are almost always strings in real life. For
example:

{% highlight scala %}
val result = Map(
  "name" -> "Ted Benson",
)
{% endhighlight %}

Let's define a "fixer" as a function that takes your result and outputs the
missing key-value pairs that you would have liked to have seen.

{% highlight scala %}
type Fixer[A,B] = (Map[A,B]) => Map[A,B]
{% endhighlight %}

And then we define a function `fix` which simply applies a fixer to the result
and folds its output back into the original map (possibly overwriting some
keys).

{% highlight scala %}
def fix[A,B](m : Map[A,B], f : Fixer[A,B]) : Map[A,B] = m ++ f(m)
{% endhighlight %}

Now we've got an incredibly useful little function that can help us tidy up any
schema-misaligned data that we're pulling in. To split the full name into first
and last components, we might do the following (pardon the lack of error
checking):

{% highlight scala %}
val FixName = (m : Map[String,String]) => {
  val fl = m("name").split(" ")
  Map("first" -> fl(0), "last" -> fl(1))
}
{% endhighlight %}

and then, given our `result` object from above, we can fix it by simply saying

{% highlight scala %}
val fixed = fix(result, FixName)
{% endhighlight %}

which will result in the map

{% highlight scala %}
val fixed = Map(
  "name" -> "Ted Benson",
  "first" -> "Ted",
  "last" -> "Benson"
)
{% endhighlight %}

Why go through all this trouble to wrap a simple modification to a data object?
Because if you're scraping many different sites, you're going to need a
pipeline to automate the work for you.  And by folding a "fix-it" step into
this pipeline, and formalizing it like this, you can write your scraper bot in
a domain-independent manner and then simply provide it with a chain of `Fixer`
functions for each URL pattern you request of it.
