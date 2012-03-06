---
layout: post
title: NICAR, from a Programmer's Eyes
permalink: /2012/03/thoughts-on-nicar/
---

Last week I attended NICAR 2012, a conference for computer assisted
investigative reporting. I was there to help David teach reporters how to use
tools such as Datapress and Exhibit and to learn about the needs and
state-of-the-art of computers in reporting. It is always a privilege to get to
visit and observe someone’s world as an outsider; and even more so to see how
they are using tools from your world to do their work. So here are some parting
thoughts I took away from the conference: NICAR from the eyes of a computer
scientist.

**Visualization is just the "last mile" of data in reporting.** And an optional one
at that. We spend a lot of time talking about data publication and
visualization tools in Haystack, but this is just one small slice of the needs
of computer-assisted reporting. A story might take months of investigative
work- gathering data, cleaning data, interviewing people, assembling scraps of
paper — and a presentation of that data is only prepared in the final run-up to
publication. That presentation isn’t always a wiz-bang interactive graphic,
either. Many times a data-intensive story might be presented entirely as
narrative, if the medium fits better.

**Scraping tools seriously needed.** Web scraping wins the award for highest ratio
of need over capability. Scraping the web is absolutely essential to do good
investigative work when it comes to municipalities, many of which publish web
pages with daily administrative information (such as arrests) while removing
the previous days’. Without a scraper, reporters would have to spend a large
portion of each day copying and pasting this information down into a
spreadsheet by hand.

**Big Opportunities for Automation.** Ben Welsh of the LA Times gave a great talk
about how he automates his reporting through  a combination of web and email
scrapers, databases, and automated copy generators. The goal being to
auto-generate 100% of reactive stories (deaths, arrests, etc) and then go back
and rewrite the most important ones by hand. Reminiscent of AtomsMasher for the
newsroom.

**And machine learning, too.** Tools that enable reporters to perform topic
modeling and hierarchical clustering are making a big splash. They can go a
long way toward helping a reporter understand a big data dump so they know what
documents to focus on. I think the coming years are going to big for the
dissemination of machine learning components into a lot of consumer software.
Tools that enable reporters to say “give me more documents like these ones”
will be a bit hit.

**The CMS is Broken.** One refrain I heard over and over is how much the reporters
have to fight with their CMS. For reasons both technical and administrative. A
common solution seems to be for custom news apps to be hosted out of a
subdomain on third party sites (AWS, Heroku, etc) with window dressing to
provide the illusion of being a part of the main news site. However as a
totally separate entity, these news apps don’t get integrated into the standard
RSS feed, advertising system, top stories feature, and other critical elements
of the CMS-managed web of data, casing traffic and revenue challenges for their
authors.

**What happens when your paper is the business of causing protests?** I went one
session where the creators of curbwise.com, two employees from The Omaha
World-Herald, discussed the hopeful (revenue-wise) but new territory of
transforming the news into apps. Here’s the gist: print ad revenues are
falling, but online ad revenues are a pittance in comparison. To make up for
lost revenue, newspapers can exploit their intimate knowledge of a locale by
creating community-specific information sites and charging for them somehow.
But what happens when that site is, like Curbwise, a way to protest your home’s
valuation? Now the newspaper has a financial interest in causing people to
protest their home valuations. Is that territory we should be comfortable with
newspapers occupying? Do they occupy it already (to the extent that extreme
news is news that sells well, so there’s always an incentive to fan a fire)?
Food for thought.

**Appification of news, in general.** Continuing on the previous thought, there was
enormous interest in the idea of transforming news into for-fee “apps” that
deliver a targeted news experience. Such as paying a small fee to get your
kid’s high school football scores in a format that looks like ESPN.com.

**The need for computer science as a liberal arts requirement.** If ever I haveeen
a good argument for computer science as a liberal arts requirement, going to
NICAR was it. It was amazing and energizing to see the extent to which
computers are enabling better reporting and storytelling. In some cases,
surprising to see how programming has become an essential tool for some areas
of reporting. In today’s world, knowing how to program better equips you to
make sense of the information around you and communicate your findings to
others.

**The need for computer scientists to grok liberal arts.** On the other hand,
we as computer scientists need to be delivering tools — serious data crunching
tools, visualization tools, curation tools, scraping tools — that are built for
use by people who spend their days thinking about things other than computers.
Because I want my local reporters to spend their days fact checking the good
stories, not brushing up on Python.
