---
layout: post
title: A Formal Model for Travers & Milgram's Letter Experiments
permalink: /2009/09/formal-model-for-milgrams-letter-experiments
---

Back to school next week, so in my never ending quest to learn how to do Real
Research, I'm going to try to begin reading papers regularly. To keep momentum
(and to be a better blogger), I'll write summaries here. 

First up is Identity and Search in Social Networks by Watts, D.J.; Dodds, P.S.;
Newman, M.E.J. from Science Vol 296, 2002. They create a formal model to
describe social networks which predicts similar path-lengths as Travers and
Milgram's famous letter-writing experiments in the 1960s. 

For those have haven't heard, these experiments are where the term "six degrees
of separation" come from. The two scientists randomly chose residents in
Nebraska and Massachusetts to send a letter to a target person in Boston, and,
if they didn't know the person directly they were to mail it to the person they
  thought might know them with the same instructions. 

They found that the average length of the chain from random sender to target
was about 6 (and, as an aside, that the probability of termination at any point
in the path was 0.25). Watts, Dodds, and Newman creates a tunable social
network model that is able to predict the results of Travers and Milgram, but
also resembles many real-world computer science problems. 


The essence (read: oversimplification) of their model is that individuals are
described by (1) connections to friends, and (2) a feature vector of traits,
and (3) a tendency to interact with and make social decisions based on
hierarchy, where hierarchy is expressed within the feature vector.  Setting up
the model as such, it stands to reason that an individual with only local
information -- that is, knowledge of their own feature vector and the feature
vectors of their friends -- would route a message to a target T to the friend
whose feature vector best matches that of the target. Approaching the world
hierarchically, such a friend is most likely to be in an overlapping social
group to the target. They then test their model with a variety of different
parameters, with a few interesting findings:

*  If H, the feature vector, is of too high a dimensionality, the path becomes a random walk. This matches real-world intuition: if we were unable to bucket our social network into groups, we would have trouble deciding which friend to turn to for a particular need.
*  Searchable networks (those for which senders can locate their targets with relatively short paths) tend to have a positive homophily parameter. Homophily, apparently, is the tendency of individuals to associate with like individuals, as opposed to dissimilar people. This also makes intuitive sense: if you can reliably predict what types of associations a friend has by that friend's feature-vector, then you can make good guesses as to whether your friend is a good routing choice for a particular target.

And, perhaps most interestingly, when tuned to simulate the conditions of the
Travers and Milgram experiments, the model predicts that the average path
length between a randomly chosen source and target is 6.7 -- right in line with
the "six degrees of separation" we all recite. Takeaways: An interesting model
both for its assumptions of how social networks can be formally characterized
and how localized routing decisions work. Its routing algorithm produces paths
of equal average length to observed human behavior.
