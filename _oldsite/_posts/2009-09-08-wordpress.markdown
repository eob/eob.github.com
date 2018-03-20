---
layout: post
title: A More Subtle Wordpress Security Hole
permalink: /2009/09/subtle-wordpress-security-hole
---

This has come up twice in one day over here at the Haystack group, so I thought
I'd post it here. Using Emacs and Vi to configure Wordpress can expose your
database login and password to the world. 

Here is why: Wordpress stores this configuration information in a file called
wp-config.php that lives in the root of your install. This files contents
aren't visible to web visitors because its .php extension causes to be
interpreted by PHP instead of returned to the web user. Emacs, by default, will
save a backup file of anything you edit in the same directory. This file will
end with a tilde character (~). 

This means that if you use a non-customized version of Emacs to edit your
wp-config.php file, you'll get a second file called wp-config.php~. The .php~
extension is not registered to any particular MIME type, and so it will be
returned, in full, to the remote user as text, revealing your database server,
login, and password with it. 

So please, if you use Emacs and have Wordpress, check your WP install directory
for any Emacs backup files and delete them!  There's enough Wordpress hackery
  going around already this week :)


