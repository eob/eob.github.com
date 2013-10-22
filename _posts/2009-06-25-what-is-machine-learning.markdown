---
layout: post
title: What is Machine Learning
permalink: /2009/06/what-is-machine-learning
thumbnail: svm.png
tags: 
- machine learning
---

I'm interested in Machine Learning, but still quite a newbie in the field, so I
thought I would start posting articles about it to force myself to read more
and begin synthesizing the information in my mind. Since this is the first,
I'll start with the basics: <em>what is Machine Learning, anyway?</em>

Machine Learning has its origins in the Artificial Intelligence community but
it is actually a different branch of Computer Science than what one often
thinks of as AI. When people say they are  doing "Artificial Intelligence," it
often refers to the quest to make computers more humanlike -- able to think,
reason, emote, etc. Machine Learning, on the other hand, uses a slightly
different set of tools to solve basic engineering problems that humans alone
can not solve. Machine Learning is specifically focused on problems that
are easier for a computer to <em>learn</em> how to solve than for a human to
figure out how to solve.

That characterization might sound a bit strange, so here is an example: You are
given 10,000 patient records involving heart disease patients over the past
five years and asked to find out if there are any drug combinations that appear
to be having adverse affects. With that quantity (and complexity) of data, it
is near impossible for a human to approach the task of answering the question.
Using Machine Learning, the human can instead teach the computer, <em>how to
learn</em> how to find the answer, and then let it loose. <strong>It is sort of
like meta-math: you teach the computer how to solve the problem of solving a
problem.</strong>

Here is a breakdown of the categories of problems that you can solve via this
method:

*  **Supervised Learning** involves taking an existing set of data for which
   you have example inputs and "answers", and then learn how to guess a new
   answer from a new input that hasn't been seen before. This can be divided
   into two further cases based on whether your answer-space is continuous or
   discrete:
*  **Regression** is performing supervised learning on a continuous data set. You might be trying to predict weight based on a person's age, for example. In this case, you would train your algorithm on an example set of weights and ages, and then you would predict future weights using just an age by itself.
*  **Classification is performing supervised learning on a discrete data set. You might be trying to predict a person's favorite ice cream flavor based upon a number of other attributes about them. Your training set consists of multiple people with those predictive attributes, along with their choice of ice cream flavor.
*  **Unsupervised Leaning** is the act of solving a problem for which there is no existing set of solutions to provide the computer as examples. In unsupervised learning, the question you are asking the computer is, "is there any interesting structure in this data?" The typical example of this type of learning is <em>clustering</em>, the act of grouping items into different buckets, without knowing in advance what those buckets are. You might be trying to explain the habitat of Canada Geese, for example, and have a large data set that consists of their location at randomly selected time instants. Using unsupervised learning, the computer might cluster these locations into two general categories: Canada and Florida. While this example could easily be performed by the human eye, remember that computers can deal with multiple, sometimes infinite-dimensional data that no human could ever process.
*  **Reinforcement Learning** can be thought of as learning that takes place gradually, with feedback after each step. Whereas supervised and unsupervised learning uses a data set presented in its entirety at the beginning of the problem,  with reinforcement learning the computer is presented instead with a <em>goal </em>(described mathematically, of course). The computer then takes actions (also described mathematically) which generate either positive or negative feedback. This feedback is incorporated into the computer's strategy which evolves over time as it learns to meet its goal. An example of feedback learning is the autopilot on an airplane. The goal is to keep the airplane flying to its destination in a steady manner. The actions the computer can take consist of altering air speed, pitch, yaw, and rudder controls, and the feedback the computer receives is a combination of how the plane is actually performing versus how the autopilot settings are asking it to perform.

So that is my quick and dirty run-down of Machine Learning. I'm no expert, so
if there are problems with this post please leave a comment and I'll correct
  them. Either way, I hope this is the start of a series of useful articles
  explaining some of the basic principles and techniques of the field.

