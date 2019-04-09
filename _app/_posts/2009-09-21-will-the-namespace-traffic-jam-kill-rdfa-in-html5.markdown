---
layout: post
title: Will the Namespace Traffic Jam Kill RDFa in HTML5?
permalink: /2009/09/will-namespace-traffic-jam-kill-rdfa
---

One of the most exciting aspects of the (in-progress) HTML5 specification is
the number of data-centric features it contains. It's almost as if the
committee is saying a big, "OK, OK! We heard you!" to all the data-heads out
there and is providing not one, not two, not three, but four different ways to
access and manage structured data from within the client browser:

1. **Data Attributes**, are key-value pairs that may be added to any DOM node
2. **Microdata** provides a way to interweave objects and object-properties amidst the DOM
3. **RDFa** provides a way to interweave RDF amidst the DOM
4. **Client-side Database Support** provides a full relational data access from JavaScript (the spec says this will be SQL compliant, but in reality it will likely just be the SQLite subset of SQL).

These are all great developments, and will no doubt bring about a lot of
creativity about how data can be used on the client-side, but what interests me
the most is why the HTML5 working group felt the need to include Microdata
alongside RDFa. The capabilities of HTML5 Microdata and RDFa are nearly
identical, albeit with slightly different terminology. Both provide a way to
embed data within HTML attributes and tag contents. Both allow for both named
entities and blank nodes. And both allow for a variety of more complex
constructions, such as lists and HREF property values. 

One of the only real differences, as I can tell from glancing over the specs,
is that RDFa requires URIs whereas Microdata simply uses ordinary strings to
reference entities and properties. And that is what worries me: one of the
biggest benefits of RDF is its use of URIs, yet URIs seem to be exactly what is
preventing the adoption of RDF. One problem is probably that URIs look funny as
data model elements, even to a programmer. 

"A person has name" is much more natural sounding than "A
`http://csail.mit.edu/Contact#Person` has a
`http://csail.mit.edu/Contact#name`".  We think of our code in natural language
terms, and URIs obfuscate our realp world metaphors. Far more serious a problem
is the namespace traffic jam that currently exists. If I want to publish an RDF
document that describes this blog, for example, best practice would have me
draw class types and property types from no less than six ontologies!

*  The RDF ontology to describe object properties
*  The RDFS ontology to describe object classes and labels
*  The Dublin Core (DC) ontology to describe the titles, authors, and the like
*  The Friend of a Friend (FOAF) ontology to describe my contact information
*  The XSD ontology to describe literal dates, strings, and numbers
*  And yet another, custom, ontology to describe everything else particular to the blog

That is already 6 ontologies, and we haven't even raised the possibility of
using OWL Time, Snap, Span, and GeoOWL for things like time and space
description! Even for a semantic web developer, the complexity of managing all
of these ontologies, and the namespaces that go with them, becomes pretty
burdensome pretty quickly. 

And that is why I worry about the future of RDFa in HTML5. It appears that the
Microdata specification in HTML5 is essentially the RDF graph data model with
the URIs neutered out. Given essentially the same data model, no doubt most
developers will pick the easier of two formats to implement. In order to get
more people on the RDF bandwagon, we need to make the RDF path just as easy to
follow as the Microdata one. 

How can this be done?  If you ask me, the best way is to get rid of this
namespace traffic jam and cultivate a set of community-oriented ontologies.
Rather than trying to create base ontologies that address abstract universal
concepts, why not try to have each community standardize a single ontology for
their particular domain. Have WordPress and Blogger sponsor the Blog Ontology.
Have Amazon.com and eBay sponsor the Marketplace Ontology. Have Facebook and
MySpace sponsor the Social Ontology. 

Then, instead of reusing bits from other ontologies, such as dc:creator or
foaf:name, have each of these community-focused ontologies be self-sufficient,
covering all the concepts necessary for their domain. We can always apply
mapping rules to distinguish between social:name and store:book-author-name
later. 

With only a single ontology per domain area to worry about, the namespace
traffic jam will disappear and it will be easier for people to get on board
with RDF and RDFa.  All in all, it seems the good news coming out of the HTML5
spec is that we can expect rich data annotation to soon be arriving to HTML
content everywhere. But what we need to work on as a community is a way to make
URIs, and the Ontologies that give them meaning, easier for programmers to use
so that the web won't just be full of data with Microdata, but full of linked
data with RDFa.
