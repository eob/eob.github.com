---
layout: page
title: Talks
permalink: /talks/
desc: on machine learning, dark data, fintech, and the research-product transition
---

I'm a teacher at heart. If your gathering is looking for someone to speak about machine learning, [dark data](https://en.wikipedia.org/wiki/Dark_data), FinTech, or the research-to-product transition, feel free to [reach out](mailto:eob@csail.mit.edu).

<br />

*Some Prior Talks*

<ol>
{% for talk in site.talks reversed %}

<li class="paper">
  <b>{{talk.title}}</b>

  <div class="conference">
    {{talk.venue}}
    {% if talk.subvenue %}, {{talk.subvenue}}{% endif %} 
    {% if talk.date %} / {{talk.city}}, {{talk.region}} {% endif %} {{talk.year}}    
  </div>

  {% if talk.special %}
  <p><b>{{talk.special}}</b></p>
  {% endif %}

</li>
{% endfor %}
</ol>

