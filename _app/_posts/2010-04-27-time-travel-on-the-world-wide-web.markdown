---
layout: post
title: Time Travel on the World Wide Web
permalink: /2010/04/time-travel-on-the-world-wide-web/
---

What if you could flip a switch in your browser and browse the web like it’s
1999? If the [Memento](http://www.mementoweb.org/) project succeeds, you’ll
soon be able to.

A joint project between the Los Alamos National Laboratory and Old Dominion
University, Memento seeks to add time travel as a standard capability to the
world wide web. “Time travel” refers to the ability to perform a computer
operation as if were a different time than “now”: query a database as if it
were yesterday, for example. On the web, this would mean a standardized way to
access historical web resources.

“We have a web that doesn’t have a time dimension, and it is really important
that we add one,” says Herbert Van de Sompel, one of the researchers who
presented Memento at the Linked Open Data workshop at WWW 2010.

Their proposal would have time become one of the negotiable attributes of a web
request, joining other negotiable parameters such as content type and language.
In this system, the cnn.com home page could publish a bit of metadata pointing
to a “Time Gate” responsible for handling time travel requests for that page. A
web user would be able to request cnn.com along with a time parameter
specifying “December 31, 1999″. The Time Gate would help negotiate a connection
to an archival server that would provide the cnn.com page as of that point in
time.

If this proposal was adopted, researchers would have a standardized way to
download a web page’s contents as they existed at several points in the past, a
task that is difficult (sometimes impossible) and time intensive today. Casual
web users would also be able to travel back in time to see how a page looked on
important days in history. The team is currently developing browser plugins
that would take a user’s entire web session back in time, literally allowing
you to browse the web as it was on the eve of the millennium, for example.

The proposal still has some challenges to work through. First is the “Time
Gate” design that it uses to negotiate time. While this design allows
third-party archival services and plays well with existing web caches, it poses
scalability questions from the standpoint of the HTTP negotiation process. What
if some future negotiable HTTP parameter also utilized third-party server to
  handle negotiation? In such a case, it would be unclear which third-party
  server needs to be consulted, in what order, for which set of negotiable
  parameters.

Another question relates to the abstract nature of resources on the web, as
Jeni Tennison and John Sheradon pointed out. When a user asks for the
population of London in 2000, are they asking about the population of London as
published in 2000 (which may be data from 1998) or are they asking about the
actual population of London in 2000 (which may not be published until 2001)?
From the standpoint of the web, the former is time travel on the document (the
data) and the latter is time travel on the abstract resource (the City of
London). If we are to increasingly link our data sets, this scenario will arise
often, and some guidelines for interpreting the precise meaning of a time
travel request will have to be addressed.

Now, or later, or later simulating now, check out the project home page:
[http://www.mementoweb.org/](http://www.mementoweb.org/)


