---
layout: post
title: "A text alignment algorithm inspired by ..soap operas?"
permalink: /2018/02/text-alignment-inspired-by-soap-operas
published: true
tags:
  - Machine Learning
  - Data Science
  - Natural Language Processing
--- 

Most problems in computer science can be reduced in some part to one of a few
hundred or so classic problems. There are the [Dining
Philosophers](https://en.wikipedia.org/wiki/Dining_philosophers_problem), the
[Chinese Restaurant](https://en.wikipedia.org/wiki/Chinese_restaurant_process),
the [Traveling
Salesman](https://en.wikipedia.org/wiki/Travelling_salesman_problem), the
[Byzantine
Generals](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance#Byzantine_Generals'_Problem),
and so on. Last week I ran into a fun one I hadn’t seen in a while — the [Stable
Marriage Problem](https://en.wikipedia.org/wiki/Stable_marriage_problem) — so I
thought I’d write a bit about it.

The problem that needed solving was re-ordering the pages of out-of-order legal
contracts so that we can compare their content to the original. The solution
turns out to be very simple and based on the rough metaphor of a cast of singles
trying to find love.

![](https://cdn-images-1.medium.com/max/1600/1*ilOHCfo-3dLpqWOrS84J2A.png)
<span class="figcaption_hack">Before you can analyze the “before” and “after” version of a document, you have
to make sure you have the pages aligned correctly. But in the real world of fax
machines and photocopiers pages often go missing or get mis-ordered.</span>

### Problem setup: Imagine you’re a busy lawyer..

You send people 40-page contracts all day. Usually they send these contracts
back signed and unchanged, but sometimes somebody crosses out a line or adds a
margin note before signing. The contract they signed is now different than the
one you sent them! To detect this, you’re stuck re-reading 100% of incoming
contracts to see which have changes and which don’t.

You like your billing rate, but this is not how you want to spend your time. So
you write a computer program to automatically analyze pairs of pages,
`<outgoing_page, incoming_page>`, to detect any signatures and pen marks that
have been made on the incoming page.

You run the program. It works wonderfully! But it also fails catastrophically
sometimes, producing bizarre results. Inspecting these errors, you realize that
some of these contracts haven’t just been marked up with a pen, they’ve also
been shuffled around and had pages lost. The errors result from your algorithm
trying to compare `outgoing_page 2` with some badly matched `incoming_page 4`.

### Ways a document can be “out of order”

Let’s frame our problem as being about two documents we’d like to compare:

* `A`, the outgoing contract, and
* `B`, the incoming contract

Document `A` has pages `a_1, a_2, ... a_n` and document `B` has pages `b_1, b_2,
... b_m`. We know `A` and `B` are the same documents, but `b_1 .. b_m` deviates
from `A` in a few inconvenient ways:

* Pages have been removed
* Pages have been added
* Pages have been reordered

What we’d like to find is a **match** between `A` and `B`. A match is a set of
pairings between the elements of `A` and `B`, like this: `[ <a_1,b_1>, <a_2,b_2>
… <a_n,b_n> ]` . Specifically, we want the match which results in `<a_i, b_j>`
pairs that are most similar to each other.

That’s simple to say but complex to do: what constitutes the set of most similar
matches? Should we optimize for the average match strength (which skews for
passion)? Median match strength (which skews for settling)? Should we always
make perfect matches when possible (might leave some elements woefully
undermatched)?

### Stable Marriage Matching

A [stable marriage match](https://en.wikipedia.org/wiki/Stable_marriage_problem)
is a great matching framework for finding matches between populations of
different size. (Note: If you follow that hyperlink, Wikipedia will tell you
stable marriage matching is for populations of equal size. Just ignore that.)

It optimizes for the following global property, which we call a “stable match”:

    No element in a match will have a better viable option.

Here’s that sentence expressed in terms of a test you can apply to some match
**(a, b)** to see if it’s stable:

    for all mates (a,b):
      if a would rather be with c than b:
        if c would rather be with a than c's current match:
          (a,b) is unstable! (a,c) deserve each other!
      same rule for b

The counterintuitive observation here is that match **(a, b)** is considered
stable *even if ***a*** and ***b*** both prefer other mates…as long as those
secret crushes don’t crush back*. Elements **a **and **b **are each other’s best
viable compromise when factoring in everyone else’s preferences. This strategy
also results in the guarantee that if there does exist some mutually in-love
Romeo and Juliet, they will be matched together.

<span class="figcaption_hack">**(a, b)** form a stable match even if **a **prefers **c** as long as **c
**doesn’t also prefer **a** over his current match **d**.</span>

The other great part of Stable Marriage Matching is that the solution is simple
and well understood — just look up the Gale–Shapley algorithm. You can implement
it in an hour and be on your way.

OK. So let’s assume that we now have some function **match **that produces the
following output:

    match(A, B) -> { matches: [<a,b>], additions: [b], deletions: [a] }

The match function takes an outgoing document `A` and an incoming document `B`
and produces a set of page-to-page matches, along with a list of added and
deleted pages. If `|B| > |A|` we’ll call any unmatched `b` added, and if `|A| >
|B|` we’ll call any unmatched `a` deleted. This isn’t addition/deletion strategy
isn’t perfect — there are better strategies involving match strength — but it
will do fine for many cases.

The only thing left is to define some measure of attraction that helps us decide
which pages `a` get married to which pages `b` .

### “Chunky Jaccard” as a measure of document attraction

Attraction really means similarity here. And just like matching, document
similarity is simple in concept but more nuanced to actually define. Are two
things similar if they have the same letters? The same words? The same words in
the same order? The same words in the same order and font styling?

In general, you can define a spectrum of text similarity measures that go from
coarse (Jaccard) to strict (labeled “Extremist” below). In the below figure, `A`
and `B` are the sets of tokens in two pages, and `a_i` and `b_i` are the i^th
tokens of those pages.

<span class="figcaption_hack">A spectrum of coarse to strict similarity measures for documents. We’re using
different notation than the rest of the post here: capital letters are pages and
lowercase letters are tokens.</span>

* [Jaccard Similarity](https://en.wikipedia.org/wiki/Jaccard_index) is a coarse
measure of document similarity. It looks at two documents as bags of words and
returns the measure of how many words were the same divided by how many existed
in total. If the documents are perfectly equal, `J(A,B) = 1.0`, and if they are
perfectly disjoint, `J(A,B) = 0.0`
* What I labeled as **Extremist **would be to take the opposite approach from “bag
of words” and compare the i^th word of each document to each other. On the one
hand, I understand the extremism — after all, documents aren’t bags of words.
Word order matters! But on the other hand, this is extremely brittle in the
presence of errors. What if the OCR of a document inserted an extra word? That
single, off-by-one index shift would cause the similarity score to plummet by
0.5 on average.
* **“Chunky” Jaccard Similarity** represents a balance between the bag-of-words
model and the extremist variant. We take some `chunk_size`, which is expressed
as a percentage, and then carve up the document into N segments, each one
`chunk_size` percent of the document. When `chunk_size` approaches zero, Chunky
Jaccard is the same as the extremist measure. When `chunk_size = 1`, Chunky
Jaccard is the same as the bag of words version.

So that’s really it. Pick one of the two Jaccard variants, implement it, and use
that as your measure of attraction in the Gale-Shapley algorithm.

### Matching made simple

Once we implemented the above, our document analysis errors disappeared
completely. On top of that, we had a more complete analysis to show our users,
including pages added and removed in addition to page-level modifications.

It turns out that in our dataset, the document shuffling was almost entirely
caused by Page 1 of the initial document going missing. The cover letter that
accompanied the initial contract had been omitted in the signed response.

### Strong visuals make things easy to remember

This is one of those problems where if you had to come up with a solution
yourself, it would take a while to devise an approach that was straightforward
to implement and also lacked any nasty edge cases.

I think the colorful metaphors for classic algorithms are so useful because they
make it easy to remember when you can pull a standard solution out of your bag
of tricks. In general, humans are terrible at remembering numbers but fantastic
at remembering stories.

So don’t dismiss the stories behind these algorithms as metaphor abuse. Ham them
up! Visualize ridiculous re-enactments of them in your mind so that they’ll be
easier to recall when you need them most.

#### PS: Come solve interesting problems at Instabase

If solving high-impact problems with real world data sounds like a good way to
spend your day, [reach out and say hello](mailto:jobs@instabase.com).
[Instabase](http://www.instabase.com/) is hiring strong CS generalists, as well
as specialists in systems, machine learning, NLP, and web front-end.
