---
layout: post
title: Scala can be Scary
permalink: /2010/12/scala-can-be-scary/
tags:
- "programming"
- "scala"

---

With syntax like this, who needs enemies?

{% highlight scala %}
object ListCase {
	def matcher(l:List[Int]) {
		l match {
			case List(1,3,5,7) => println("Primes")
			case List(_,_,_,3,_) => println("3 on 3")
			case 1::rest => println("List starting with 1")
			case List(_*) => println("Other list")
		}
	}
}
{% endhighlight %}


