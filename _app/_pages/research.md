---
layout: page
title: Research
permalink: /research/
desc: natural language processing, knowledge graph, and web architecture
---

<a name="toc"></a>
<div class="horizontal-list page-links">
  <span style="list-style-type:none"><a href="#papers">Papers</a></span>
  <span><a href="#books">Books</a></span>
  <span><a href="#teaching">Teaching</a></span>
  <span><a href="#other">Other</a></span>
</div>

<a name="papers"></a>
<h2 class="subheader">PAPERS &nbsp;<a href="#toc">&#8617;</a></h2>

<p>Click on the title to download PDF. If the title isn't a link, it means the
paper wasn't in an archival track -- email me and I'll send you a copy.</p>

<ol>
{% for publication in site.publications reversed %}

<li class="paper">
  <b>
    {% if publication.pdf %}
    <a href="{{publication.pdf}} ">{{publication.title}}</a>
    {% else %}
    {{publication.title}}
    {% endif %}
  </b>

  <div class="authors">
    {% for author in publication.authors %}<span>{% if author.link %}<a href="{{author.link}}">{{author.name}}</a>{% else %}{{author.name}}{% endif %}</span>{% endfor %}
  </div>

  <div class="conference">
    <strong>
      <a href="{{publication.conferenceLink}}">{{publication.conference}}</a></strong>
      {%if publication.subconference %}, {{publication.subconference}}{% endif %} 
      {% if publication.journal %}{% else %} / {{publication.city}}, {{publication.region}} {% endif %}, {{publication.year}}    
  </div>

  {% if publication.special %}
  <p><b>{{publication.special}}</b></p>
  {% endif %}

</li>
{% endfor %}
</ol>

<a name="books"></a>
<h2 class="subheader">BOOKS &nbsp;<a href="#toc">&#8617;</a></h2>
<ol style="clear:both;display:block;"> 
{% for book in site.books reversed %}
<li class="paper">
  <div style="margin-bottom: 10px; padding-bottom:0;"><b><a href="{{book.link}}">{{book.title}}</a></b> ({{book.year}})</div>
  <p><a href="{{book.link}}"><img src="{{book.image}}" style="max-width: 100px"/></a> {{book.description}}</p>
</li>
{% endfor %}
</ol>  

<a name="teaching" style="clear:both;display:block"></a>
<h2 class="subheader">TEACHING &nbsp;<a href="#toc">&#8617;</a> </h2>

<h3 class="subsubheader">As Primary Instructor</h3>

<ul>
  <li>
    <b>Open Source Software Project Lab</b><br />
    An experimental, co-op style course in Software Development practice. <a href="http://courses.csail.mit.edu/6.S194">MIT 6.S194</a>, Spring 2013.
  </li>
  <li>
    <b>iPhone Development</b><br />
    I created, planned, and taught MIT's <a href="http://iphonedev.csail.mit.edu/">Intro to iPhone Development</a> course that took place during IAP 2009 and 2010.
  </li>
</ul>

<h3 class="subsubheader">As Teaching Assistant</h3>

<ul>
  <li>
    <b>User Interface Design</b><br />
    <a href="http://stellar.mit.edu/S/course/6/sp12/6.813/">MIT 6.813/6.831</a>, Spring 2012.
  </li>
  <li>
    <b>Artificial Intelligence</b><br />
    <a href="http://courses.csail.mit.edu/6.034s/">MIT 6.034s</a>, Spring 2011.
  </li>
  <li>
    <b>Advanced Programming Methods</b><br />
    University of Virginia, CS 201.
  </li>
  <li>
    <b>Program Design and Representation</b><br />
    University of Virginia, CS 213.
  </li>
</ul>

<h3 class="subsubheader">As Guest Lecturer</h3>

<ul>
  <li>Computer Science Summer Institute, at Google (2012)</li>
  <li>6.MITx, at MIT (2013)</li>
</ul>

<a name="other"></a>
<h2 class="subheader">OTHER &nbsp;<a href="#toc">&#8617;</a> </h2>
 
<ul class="">
  <li>
  <b><a href="https://store.2600.com/collections/2010-2015/products/spring-2018">The Case of the Murderous AI</a></b><br />
  in <a href="https://www.2600.com/">2600 Magazine</a>. Spring 2018 Issue.
  <b><a href="http://chronicle.com/blogs/conversation/2013/06/04/unintentional-hipster-faculty/">Unintentional Hipster Faculty</a></b><br />
  in <a href="http://chronicle.com/blogs/conversation/">The Conversation</a> at the <a href="http://chronicle.com">The Chronicle of Higher Education</a>. The Conversation. 4 June 2013.
  </li>
</ul>
  

