---
layout: post
title: Abusing Javascript for Multiline Strings 
permalink: /2007/05/abusing-javascript-for-multiline-strings/
---

You realize how funny the technology world is when you come upon a technology from 2005 and are immediately distrusting
and suspicious that it has already been replaced with something new. "Two years ago!? How antiquated! I'm sure by now
we've tackled the problem with an extra embedded API added on for ordering triple half-calf mocha skim ole 2% orange
juice lattes wearing a bathing suit! ... from Emacs!"

You understand my suspicions, I'm sure.

So I begin with my
distrust, but ultimately feel compelled to express my excitement about the ability to abuse the the E4X extension of
JavaScript to handle multi-line strings. For those who don't know (I sure didn't), E4X stands for ECMAScript for XML
(E4X) and was introduced in 2004 and subsequently updated in 2005. It appears that Mozilla-based browsers support it,
but I'm not so sure about IE (grumble).

The gist is this: JavaScript doesn't support multi-line strings, which is a
bummer. Ruby has it. So does Python. Even C# does, with the @" quote. You'd think peer pressure alone would have forced
JavaScript to adopt it, not to mention the common need to assemble long chunks of HTML from within JavaScript, but it
still ain't so. E4X provides a sneaky way to accomplish it, however, by embedding the string within HTML tags. E4X is
essentially a way to use DOM fragments as native JavaScript objects, so you can have a variable defined like this:
   
   var address = "" + (<r><![CDATA[
   127 Prime Ln.
   55005
   ]]></r>);

The developer gets all sorts of nifty ways to interact with this data, but the toString function is the sneak-route for
abuse. Let's say we want to construct a multi-line string for some poetry:

   var htmlFragment = "" + (<r><![CDATA[
   l(a

   le
   af
   fa

   ll

   s)
   one
   l

   iness

   - e.e. cummings
   ;
   ]]></r>);

Or perhaps we want to construct a fragment of HTML from with JavaScript but don't want to use a builder:

   var htmlFragment = "" + (<r><![CDATA[
   <div id="somethingorother">
     <ol>
       <li>Item 1</li>
       <li>Item 2</li>
     </ol>
   </div>
   ]]></r>);

Why in the world would you put your HTML inside a CDATA block, you say? For a top secret
project, I tell you! The variable htmlFragment now contains this multiline string, since
the the ""+ at the beginning caused the subsequent E4X DOM fragment to be cast as a string
for concatenation. Test it out for yourself by setting the innerHTML of your page body to
the variable above.

   $('the_body').innerHTML = htmlFragment;

Pretty clever...
