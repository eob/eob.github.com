---
layout: post
title: How to Upload Files from the web to a Google Spreadsheet
permalink: /2016/03/how-to-upload-files-to-a-google-spreadsheet
published: true
tags:
  - Hacks
  - Cloudstitch
---

This tutorial shows you how to build a web form that uploads files to a Google
Spreadsheet. We’ll do it using [Cloudstitch](http://www.cloudstitch.com/), a
service that lets web pages talk directly to spreadsheets as if they were
databases. Powering a web form this way only takes a few minutes to set up, and
you’ll be in very good company using it: it’s one of the most popular uses of
Cloudstitch.

At the end of this tutorial, you’ll have simple form you can use to let people
upload a profile photo.

#### Step 1. Create a Magic Form on Cloudstitch

To get started, create a [Magic Form on
Cloudstitch](http://www.cloudstitch.com/magic-form). This will set up two
important pieces for you to use:

1.  It creates spreadsheet for your data
1.  It creates a URL you can use to send data to that spreadsheet

#### Step 2. Create some Spreadsheet Columns

Inside your Magic Form project, click on the **Welcome **tab if it isn’t already
selected, and then click the then **Edit** link for your new Google Spreadsheet.

Next, create columns for the fields you’d like to accept. For this tutorial,
let’s use FirstName, LastName, and Picture.

#### Step 3. Create a Form

Next we’ll create a web form to send data to that spreadsheet.

Back in Cloudstitch, you probably noticed the URL sitting right above your
spreadsheet link. It looks like this (yours will be different):

Any web form you post to this URL will save to the associated spreadsheet
(you’ll have to have created the columns to accept the data first, though).

Create a simple HTML form that contains the same fields that we made columns
for: **FirstName**, **LastName**, and **Picture**. The first two should be
regular input elements, and the third should be a file input. Make sure you set
the form encoding type to **multipart/form-data **and the method to POST.

Here’s an example you can just copy paste (update the URL to match your own):

There’s one extra element in that form above. It’s a hidden element with the
name **_redirect**. This tells Cloudstitch what URL to send users to after they
have submitted data.

#### **Step 4. You’re Done! Put the form anywhere and start uploading files**

<span class="figcaption_hack">Yes, that’s it.</span>

That’s it. You can paste that form code on any website and start using it
immediately. Style it however you want, add columns or multiple files, even use
it over Ajax. We even give you space to develop and test your form right from
your project: head over to the **Examples** tab and use the live editor to build
and style your form before you put it on your site.

Here’s what this example looks like in the project I created

And here’s what my spreadsheet looks like after making a submission:

Cloudstitch supports many more features for your forms, like modifying data and
offering an API. To find out more, take a look at [our
documentation](http://www.cloudstitch.com/docs) (which is itself powered by
Google Docs!) or feel free to reach out at
[hello@cloudstitch.com](mailto:hello@cloudstitch.com).
