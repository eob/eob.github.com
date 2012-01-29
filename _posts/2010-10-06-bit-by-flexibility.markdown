---
layout: post
title: Bit by Flexibility&#58; Implicit Conversions to Java with Scala 2.8
permalink: /2010/10/bit-by-flexibility/
---

Scala 2.8 includes a library that helps implicitly convert Scala objects to
Java objects so you can keep your data in Scala-land while still using Java API
calls. Just import this package in your code:jj

{% highlight scala %}
import scala.collection.JavaConversions._ 
{% endhighlight %}

The problem is sometimes the conversion library fails at compile time because
there are just *too many possible conversions* it can make. It can't decide
between all the possibilities. Talk about being a victim of your own success!

Here's an example: I have a scala.Iterable of items, and I want to implicitly
convert it to a java.lang.Iterable

{% highlight scala %}
val trainingData:Iterable[ILabeledSeqDatum] = processTrainingFile(trainingFile) 
_crf.train(trainingData)
{% endhighlight %}

But the implicit conversion dies here with the following message:

{% highlight scala %}
[error]found   : scala.Iterable[edu.umass.nlp.ml.sequence.ILabeledSeqDatum]
[error]required: java.lang.Iterable[edu.umass.nlp.ml.sequence.ILabeledSeqDatum]
[error]Note that implicit conversions are not applicable because they are ambiguous:
[error]both method asCollection in object JavaConversions of type [A](i: Iterable[A])java.util.Collection[A]
[error]and method asIterable in object JavaConversions of type [A](i: Iterable[A])java.lang.Iterable[A] [error]are possible conversion functions from Iterable[edu.umass.nlp.ml.sequence.ILabeledSeqDatum] to java.lang.Iterable[edu.umass.nlp.ml.sequence.ILabeledSeqDatum]
[error]   _crf.train(trainingData) 
{% endhighlight %}

So here's the fix: you can wrap your data to indicate the particular conversion
you would like to occur. A list of wrappers is
[here](http://www.scala-lang.org/api/current/scala/collection/JavaConversions$.html).
In my case, I want a java.lang.Iterable, so I'll wrap it as so:

{% highlight scala %}
val trainingData:Iterable[ILabeledSeqDatum] = processTrainingFile(trainingFile) 
val iw = new IterableWrapper[ILabeledSeqDatum](trainingData) 
_crf.train(iw) 
{% endhighlight %}

This removes the ambiguity, allowing the compiler to proceed without baffling
itself by its own cleverness.
