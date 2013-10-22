---
layout: post
title: The Toothpaste Problem and Choosing the Right Data to Publish
permalink: /2010/11/choosing-the-right-data-to-publish/
tags:
- "conference notes"
- "data visualization"

---

People who visit a toothpaste isle with only 4 products walk away much happier
than those who visit the typical supermarket isle crammed with 40 variants of
Colgate. Why? Because they don’t get overwhelmed by a tsunami of possibilities
that leaves them wondering if they made the wrong choice.

When it comes to a large organization publishing data, perhaps a similar
problem arises. Given all the information in the world that we *could* publish in
structured form, how are we to know which important bits to address first?

Hans-Jörg Happel proposed an interesting way to solve this problem in the
Social Semantic Web track at ISWC 2010 today. If we can quantify the need for a
particular morsel of information, we can prioritize our efforts to structure
and publish data. The question, then, becomes how to quantify information need.

Happel’s idea is to do this by examining missing values from query results.
When someone performs a query, they’re stating that they need a particular data
set. When one of the items in the query result is empty (such as missing 2010
GDP value for Mexico), that’s a known piece of information that someone needed
and didn’t get. If we count up the number of times each of these NULL values
occurs, we can begin to keep a priority queue of desired, but missing, data.

So if Mexico’s 2010 GDP is missing from WikiPedia, is that a problem? Well,
count up the number queries that returned a NULL for this item and judge
quantitatively. If the number is comparatively high, maybe we should prioritize
the addition of Mexican economic stats.

He’s created a plugin for Semantic MediaWiki, called [Semantic Need](http://www.mediawiki.org/wiki/Extension:Semantic_Need), which does
exactly this. The list of prioritized information is called the “Extended
Knowledge Base” — those things that we want to know, but don’t. As a
programmer, I find this project very clever. Developers usually think of NULL
values in query results as mere annoyances. But this work turns that around and
makes them useful.

One of the themes of the Haystack Group is that focusing on user needs can
direct research toward results that are immediately useful. On the semantic
web, picking an explicit user goal (helping users communicate effectively using
data) can be more effective than picking an abstract goal (building a web of
linked data). Our project [DataPress](http://projects.csail.mit.edu/datapress) attempts to follow this philosophy by
helping users add interesting visualizations to their blogs, and as a side
effect, showing those users the value of structuring their data. Semantic Need
follows this philosophy in another way: it attempts to quantify an existing,
realized need for pieces of data so that we know which data is actually useful
for structuring *right now*.

While the presentaiton didn’t address it, the idea behind this talk could be
incredibly useful for government data. What if governments provided not links
to data sets (as [data.gov](http://www.data.gov) does) but rather some ontology and a query interface.
Then it sits back and sees what users query for. Using an approach like this,
the “what data should we publish” problem solves itself: the queries people ask
will tell you what data to prioritize for publishing.

Here’s a link to the paper: [Semantic Need: Guiding metadata annotations by
questions people #ASK](http://iswc2010.semanticweb.org/pdf/169.pdf)
