---
layout: post
title: "Use Spreadsheet data in your Framer Projects"
permalink: /2017/02/use-spreadsheet-data-in-framer-projects
published: true
tags:
  - Cloudstitch
  - Design
---

![](https://cdn-images-1.medium.com/max/1600/1*KOaWPwmY1LXxKUtf5D1l5g.png)

**Update: Also check out our [Sketch
Plugin](https://medium.com/@edwardbenson/fill-your-sketch-designs-with-data-from-spreadsheets-ef18b608a2a9#.6kauodb94)!**

Today [Cloudstitch](http://www.cloudstitch.com/) is releasing the first of a few
bridges that connect design tools with data from your office suite. We’re
starting with
[Framer](https://framer.com/?utm_source=blog.framer.com&utm_campaign=Cloudstitch&utm_medium=Blog_Post1),
which is an amazing app for programmatic UI experimentation. The [Cloudstitch
Framer Module](https://github.com/cloudstitch/framer.module.cloudstitch) lets
you load data from Google Spreadsheets and Microsoft Excel directly into your
Framer projects.

We think designers should work with *realistic* data as often as possible. It
informs your design decisions, lets you find edge cases that need to be
accommodated, and makes for much better demos.

But keeping your data in JSON files is no fun: they’re a pain to edit and can’t
be easily shared. Cloudstitch lets you load the data from shared spreadsheets in
the cloud instead.

### How to Install

[Download the module from
GitHub](https://github.com/cloudstitch/framer.module.cloudstitch) and add the
**cloudstitch.coffee** file to the /**modules** folder of your project. You can
find it in the **/modules** folder of the example project in the GitHub
repository.

This git repository is also a working Framer project that serves as an example.
Download it and double click `cloudstitch.framer` file to see.

### How to Use

#### 1. Create a spreadsheet using Cloudstitch

![](https://cdn-images-1.medium.com/max/1600/1*mSpvtDwN1HR5DXcefy0ciw.gif)
<span class="figcaption_hack">Create a new spreadsheet & API using Cloudstitch</span>

Clone the [Framer Module
Demo](https://www.cloudstitch.com/project-templates/framer-module-demo/clone) on
Cloudstitch and then edit the spreadsheet created for your new project.

This spreadsheet acts as the datasource that you can load from Framer.

#### 2. Sync your spreadsheet with Cloudstitch

<span class="figcaption_hack">Syncing your spreadsheet data publishes it to the Cloudstitch API</span>

When you’re done editing the spreadsheet, press the green **Sync with your
Template** button in Cloudstitch. This makes a fresh copy of your spreadsheet
available over Cloudstitch’s API.

#### 3. Use the spreadsheet data in Framer

Include the Cloudstitch module within your project by adding the following:

Then get data from your spreadsheet by providing the Cloudstitch username and
appname of your project:

In that code snippet, **callback** is a function that will get called and passed
the variable **data**, which contains all the tables from your spreadsheet.

You can find the username and appname for your Cloudstitch project by looking at
its URL:

<span class="figcaption_hack">Finding the username and appname for your project.</span>

### That’s all, folks!

When you’re done, you can build designs that rely on **real, easy to update
data** instead of fake values stored in code files.

<span class="figcaption_hack">The project included with the module</span>

Download the library, along with working demo code, at
[github.com/cloudstitch/framer.module.cloudstitch](http://github.com/cloudstitch/framer.module.cloudstitch)

