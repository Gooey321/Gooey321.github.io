---
layout: default
title: Home
---
<h1>Latest Posts</h1>

<ul>
  {% for post in site.posts %}
  <br>
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.date | date_to_string }} - {{ post.author }}
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>
