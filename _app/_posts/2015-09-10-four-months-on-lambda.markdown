---
layout: post
title: "Four Months On Lambda: The Good, the Bad, and the Intriguing"
permalink: /2015/09/four-months-on-lambda-good-bad-intriguing
published: true
tags:
  - Thoughts
  - Microservices
  - Cloudstitch
---

[Cloudstitch](http://www.cloudstitch.com/) has been running everything but its
core web-loop on AWS Lambda for a few months now, so the time felt right to look
back and reflect on the experience of relying so heavily on a microservice
architecture.

Like anything, it’s been a mix of tradeoffs, but the net results has been
positive and I can tell microservices are going to become a big part of my
toolchain going forward. So here are the goods, bads, and eyebrow raises that
come to mind when I kick back and think about how it’s changed the way I write
and deploy software

*[Aside: An important piece of context that might color my reactions below is
that I’m writing from the perspective of a one-man development team.]*

### **The Good**

#### 1) *You can throw away your worker cluster.*

One of the big promises of Lambda from my perspective is that I would get to
kick all my worker machines and queues to the curb. And that turned out to be
true, but only after quite a bit of heavy rewriting.

Microservices relieve you of a lot of administrative burden once you get into
the swing of things. That might not matter to a large team, but when you’re
running lean, a primary goal is to reduce the number of things you have to
remember. For me, worker clusters always required a lot of overhead work and
context switching in return for what I got out of them. Lambda lets you just
write your core business logic and push that up to the cloud — no more machines
or task queues.

#### 2) F*unction-level isolation let’s you sleep easy at night.*

I’m not the most ardent unit tester. And that makes me worry when I push
modifications up to a giant, fully-connected, Rails-style codebase. Will that
change to a model class have inadvertent effects somewhere else? This worry only
gets worse as the codebase grows.

**Microservices force you to write code so that technical risk grows linearly,
rather than exponentially, as you add new features.** In fact it might even be
be sublinear: once a service is up and running correctly, you can essentially
ignore it completely. This actually has a big emotional impact: it defrags your
working memory, which lets you create and update code with greater confidence,
and that makes for happier coding.

#### 3) Testing becomes easy by design

As a lazy unit tester, Lambda has seriously powered-up my testing game. Because
your code is organized into discrete deployable units that take JSON as input
and produce JSON as output, **it’s eminently testable.** Just have a folder of
paired inputs / expected-output JSON files. There is no environmental setup or
tear down and no burden of mock classes everywhere. (I use an environment
variable to direct all side effects to our test cluster of machines, which
mirrors the prod cluster).

Look — I get that “Good Code” is also testable. But that kind of Good Code, for
most of us, is an ideal, not reality. So this observation really isn’t about
something new becoming possible, but rather a positive externality of the way in
which microservices constrain your software design.

### **The Bad**

#### 1) Less control over execution environment

Lambda gives you a pretty rigid execution model+environment, and if your needs
include something outside that environment, tough luck. This might not be a big
deal if you’re planning on casually using Lambda every once in a while, but
you’ll almost certainly have to make some architectural/design changes if you
want to port everything to it.

Case in point: Lambda doesn’t let you predict where in the AWS cloud your
function will execute. This means it doesn’t play well with Amazon’s Virtual
Private Cloud policies. To grant Lambda access to Postgres, for instance,
requires opening network access to Amazon’s entire IP block. If this makes you
uneasy, you’ll need to migrate your data into services into something that does
play well with Lambda, like DynamoDB, but that isn’t the right reason to be
choosing a data storage solution.

#### 2) Server administration is replaced with workflow coordination

For reasons including timing, scaling, and semantically coherent encapsulation,
you’ll want to divide some large jobs into an army of lambda functions. For
example, [RSVP Hero](http://www.cloudstitch.com/rsvp-hero), one of the template
projects at Cloudstitch, has a background task that requires heavy API traffic
with Facebook, Eventbrite, Meetup, Google Spreadsheets, and S3.

A task of that size could be handled by a single binary on an EC2 instance, but
it’s too much to pack into the timing requirements that Lambda imposes. As you
might imagine, this required me to build a workflow engine overtop of lambda,
and that’s work I wouldn’t have to do if I just had a big server farm. (I’ve
[written about a piece of this workflow engine
here](https://medium.com/@edwardbenson/managing-state-across-an-ant-swarm-of-aws-lambda-tasks-f225ff8564ae).
Let me know if you’d like to hear more).

So while microservice architectures relieve you from the need to maintain large
background-worker farms, they introduce the need to coordinate complex
long-running tasks. The end-result is more scalable, but it also contains more
startup cost than simply writing long-running procedural code.

### **The Intriguing**

True, practical service-oriented programming has been a holy-grail for decades.
(Remember web services, WSDL, and UDDI? CORBA? Hell, even RPC.) We’re definitely
still not there, but I think we’re also a large step closer.

**If the microservices prove worthwhile within a codebase, it’s only a matter of
time before they start being used between codebases. **Maybe I need to do facial
recognition, or video encoding, or convert a database table into a CSV file. If
you have a lambda function for me to call to save myself time, you won’t have to
do much convincing for me to consider using it and paying you a small toll.

Ironically, this prospect is both democratizing and monopolizing. It opens up
the playing field for anyone to gain market share over certain vertical slices
of computation. But it also furthers the reach of the “winner-take-all” economic
model often seen in software ecosystems.

### Conclusion

Give Lambda, and other microservice platforms, a look! And leave a note in the
comments below with your reactions. This is a topic I suspect deserves a lot of
debate and discussion.
