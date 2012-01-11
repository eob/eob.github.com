---
layout: post
title: The Semantic Web needs a MySQL
permalink: /2010/11/the-semantic-web-needs-a-mysql/
---

One thing was clear in the comments of many industry-facing participants of
ISWC 2010: a big impediment to adoption of semantic web technologies is the
lack of an off-the-shelf triplestore that "just works." 

There are many other problems, of course: RDF an awkward format when it comes
to real world programming because the graph model doesn't align to the
object-dictionary model of OO programming; JavaScript favors JSON instead of
RDF; URIs and namespaces can be a burden to craft the first time around. But
these problems can be lessened, or eradicated, with good development
frameworks.

Underlying these surface problems is a deployment one: even if a company wanted
to, there's no clear hassle-free solution to getting a triplestore up and
running with the same ease, access, and reliability that relational solutions
such as MySQL and Postgres provide. And as long as this is the case, otherwise
semantic-web savvy individuals are going to continue to live in the relational
world. When people are spread thin, and want to focus on user experience
instead of database administration, they'll pick the database product that
allows them to focus on other things.

So what gives? Do we wait for a Mike Stonebraker of the triplestore world to
come around? Or do we try to bolt our technologies onto non-relational
databases with gaining momentum such as MongoDB or CouchDB? 
