---
layout: post
title: "Data quickie: How much does complicated HTML slow you down?"
permalink: /2013/10/how-much-does-complicated-html-slow-you-down
published: false
tags:
- "data analysis"
- "the web"
---

## Core Idea

The core question I wanted to answer was how much the ``fluff`` surrounding
HTML content impairs your ability to navigate the content. To do this, I shows
Mechanical Turk users the raw HTML from an imaginary blog and asked them what
the title of the nth blog post was. The blog always had 10 posts total.

## Fix `n`, Vary `Fluff`

For this experiment, I fixed `n=5` and varied the amount of fluff present in
the fake blog. The experiment was a within-subjects design: each person
recieved four levels of fluff: 0, 2, 4, and 6. To try to create a useful, but
relatively plain (i.e., defensible) representation of fluff, I interpreted the
level of fluff as the number of HTML tags that wrapped each core tag in the
`fluff=0` formulation.

In other words `fluff=0` contains:

```
<h2 class="title">Bat Boy Spotted in a Boston-area Suburb!</h2>
```

And `fluff=2` would then be:

```
<div class="foo">
  <div class="bar">
    <h2 class="title">Bat Boy Spotted in a Boston-area Suburb!</h2>
  </div>
</div>
```

Each new element was given one CSS class, randomly selected from a dictionary
of American English.

The full structure of the `fluff=0` case was chosen to be representative of a
real blog post: with a section for a header, body, and footer, and a few pieces
of metadata about the post. Three paragraphs of random content from the New
York Times were included in the body of each blog post. The `<p>` tags in this
content was not wrapped in extra tags as `fluff` increased.

```
<div class="posts">
  <div class="post">
    <div class="header">
      <h2 class="title">Bat Boy Spotted in a Boston-area Suburb!</h2>
      By: <span class="byline">Rutabega Daikon</span>
    </div>
    <div class="body">Lorem ipsum dolor sit amet</div>
    <div class="footer">
    Tags:
      <li>
        <ul>world events</ul>
        <ul>breaking</ul>
      </li>
    </div>
  </div>
</div>
````

