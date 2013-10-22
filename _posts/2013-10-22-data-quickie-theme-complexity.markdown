---
layout: post
title: "Data quickie: Wordpress themes are getting more complicated over time"
permalink: /2013/10/wordpress-themes-are-getting-more-complicated-over-time
published: true
thumbnail: theme-complexity-100.png
---

Here's a quickie for you. The other day I scraped all the themes from
[WordPress.org](http://www.wordpress.org) (615 in total, or at least what my
script pulled down) and then plotted how complex the theme was based on when it
was created.

I used two ways to measure complexity: how many files were in the theme package
and how many bytes were in the **non-image** files inside the theme package.
These two metrics are somewhat related (we would expect the number of bytes to
increase as the number of files increases) but also tell slightly different
stories. 

## Number of files in a WordPress theme over time

![Time versus Number of Files](/experiments/wordpress-theme-complexity/year-versus-num-files.png "Time versus Number of Files")

## Number of bytes in *non-image* theme files over time

Not counting bytes in image files is important because we should expect the
quality (and thus file size) of images to increase over time.

![Time versus Bytes](/experiments/wordpress-theme-complexity/year-versus-bytes-no-images.png "Time versus Bytes")

## Conclusion

Writing a theme is getting harder over time, and I suspect that this could be
said of web sites in general. We need to work to make sure the tools to manage
this complexity are improving at the same rate of the level of sophistication
expected by web authors and surfers.

Here are the data files:
[YearVersusNumberFiles.csv](/experiments/wordpress-theme-complexity/YearVersusNumFiles.csv)
and
[YearVersusBytesNoImages.csv](/experiments/wordpress-theme-complexity/YearVersusBytesNoImages.csv)
