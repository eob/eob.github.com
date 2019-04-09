---
layout: post
title: Code can be Funny
permalink: /2007/12/code-can-be-funny/
---

> Here's a tiny excerpt from the current chapter I'm writing: "Playing with
> Blocks". So far I've only posted the narratives that accompany each chapter.
> This piece of code made me chuckle, though, so I thought I'd share it. There's
> a lot of great discussion in the chapter about Methods, Procs, and blocks, and
> how to apply the differences to your coding style. So if this piques your
> interest, then look for the book next Spring:

While the adverb metaphor doesn't encapsulate nearly all of the uses of blocks,
it is a particularly good one to demonstrate how becoming familiar with
block-based programming will change the way you think about code. Languages
with blocks let you do things *sneakily*:

{% highlight ruby %}
def sneakily
   # There actually isn't such thing
   # as System.logger...so don't go
   # planning any bank hoists with this
   # example!
   System.logger.turn_off
   yield
   System.logger.turn_on
end

# Don't tell!
sneakily do
  1000.times {
     votes << Vote.new("Ted")
  }
end
{% endhighlight %}

Or, if you don't mind the consequences, even *incorrectly*

{% highlight ruby %}
def incorrectly
   # This one actually works, but can
   # really mess up the interpreter depending
   # on what you put inside the block!

   # Temporarily randomize the result of addition
   class Fixnum
      def genrand(other) ; rand(other) ; end
      self.class_eval {
         alias :oldplus :+ ; alias :+ :genrand
      }
   end
   yield
   class Fixnum
      self.class_eval { alias :+ :oldplus }
   end
end

incorrectly do
   votes.count
end
{% endhighlight %}

Let's call the general idea code wrapping: creating code that is meant to wrap
around other code. Code wrapping can be applied many ways. Block-based
iteration is just code wrapping. A block-based iterator implements the
iterating loop with an empty body waiting to be filled by the block provided by
the caller.

Many elements of aspect-oriented programming are just code-wrapping, and later
you will see how aspects such as logging and performance can be implemented in
this way. Finally code-wrapping provides an excellent way to construct
hierarchical documents such as HTML and XML by using block-based programming
make Ruby look like a domain-specific language.

> That's just the draft, of course. In the final copy, I'll make sure to vote 2000 times.
