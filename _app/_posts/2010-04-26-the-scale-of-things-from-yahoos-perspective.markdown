---
layout: post
title: The Scale of Things, from Yahoo&#33;&#39;s Perspective
permalink: /2010/04/the-scale-of-things/
---

Sometimes it is fun to get a picture of the scale that different organizations
deal with in their daily tasks. I just saw a talk from Yahoo! about their use
of Hadoop which was rich with such numbers. Here are a few of the cooler ones:

**Compute Power**

*   Yahoo has roughly 30,000 nodes running in tens of clusters. 
*   Each node has roughly four 1TB disks, 8 cores, and 16 GB RAM

This means that they've got 240,000 cores running.. That's a lot of silicon.
Their largest cluster is 4000 machines, which they believe to be an upper limit
with the current version of Hadoop. This cluster handles in excess of 100,000
hadoop jobs per day.

**The Web is Big**

The data that their Hadoop clusters have access to sums to over 3 Petabytes,
compressed and un-replicated.

The web itself has over 2 trillion links.

**Hadoop makes things Fast** [1]

Using Hadoop has improved Yahoo!'s ability to process web-scale data. Pre &
Post-Hadoop statics are pretty stunning:

For clustering and ranking: 100s of features -> 1000s of features, weeks of
processing -> hours of processing.

Dictionary building across web logs: 4 weeks to run -> 30 minutes to run, 2-3
weeks to develop, 2-3 days to develop

Link analysis: capable of handling 100s of billions of URLs -> capable of
trillions of URLs, took months -> takes days

[1] Footnote: Of course, MapReduce systems only work well for certain types of
computation. They don't make everything fast. 
