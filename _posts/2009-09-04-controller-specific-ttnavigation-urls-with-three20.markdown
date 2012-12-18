---
layout: post
title: Controller Specific TTNavigation URLs with Three20
permalink: /2009/09/controller-specific-ttnavigation-urls
---

One of the more unique parts of the programming style that comes with the
Three20 framework its its URL navigation style via the TTNavigator class. This
class is intimately tied in with table cell-based navigation. But what about
when you have a URL that is context sensitive. That is, it doesn't route to a
general function, but rather a specific instance. Here is a scenario like the
one I have in my code: I have a "profile" view that allows people to publish
various social links about themselves, and one of these is email. When you
click the email table cell, I would like it to trigger a message to that
controller which opens up the email client: **[self sendEmail];**

The problem is that TTTableItem objects want URLs, not delegates and selectors.
How do I wire up a URL to this particular controller instance instead of just a
general one?  The answer is to stop thinking of TTNavigator routes as something
that has to be setup at application start time. 

I don't know if you think like this, but I realized I had subconsciously been
thinking about routes the Ruby on Rails way -- parameters that are only mutable
during initialization. But TTNavigator routes can be changed any time. So here
is how I implemented the email link.  Each time the PersonController
initializes, I have the following code:

     TTNavigator* navigator = [TTNavigator navigator];
     TTURLMap* map = navigator.URLMap;
     
     [map removeURL:@"app://person/email"]
     [map from:@"app://person/email"
          toViewController:self
          selector:@selector(sendEmail)];

Notice how I first remove any existing routes, and then I re-wire that route to
the particular controller that has just been initialized. Then when I create my
table cell, I can just use a URL as always:

     [cells addObject:
            [TTTableImageItem itemWithText:@"Send Email"
                              imageURL:@"bundle://email.png"
                              URL:@"app://person/email"]];

And that is it! Let me know how you have solved the same problem. As Three20
doesn't have much in the way of documentation, I would love to hear how other
Objective-C hackers are handling situations like this.
