---
layout: post
title: Cross Origin Resource Sharing Gotcha&#58; Don't forget about OPTION requests
permalink: /2012/07/cross-origin-resource-sharing-gotcha
---

Anyone in the business of hacking the web past its original boundaries knows
the importance of the browser's cross-origin security model. But you also know
how often we try to sneak around it.

For static content, JSONP -- the typical sneak route -- seems a bit hacky.
Dynamic JSONP callback names require me to serve up static resources with a
dynamic wrapper. And static callback names just don't seem very principled:
what if I have multiple requests in the pipeline? Yuck.

The workaround is to use Cross-Origin Resource Sharing (CORS), which is a
relatively new family of HTTP headers that communicate to the browser that a
server authorizes the use of its content by external origins. If you can
swallow incompatibility from the usual suspects, it's a nice option because it
allows you to load static cross-origin content as if it were same-origin
content.

All it takes is a few special HTTP headers.  You can add these headers to a
whole directory of static content by adding the following lines to your
`.htaccess` file:

    Header add Access-Control-Allow-Headers "x-requested-with"
    Header add Access-Control-Allow-Methods "GET, PUT, POST, DELETE, HEAD, OPTIONS"
    Header add Access-Control-Allow-Origin "*"

And here's the catch that prompted me to write this post: most how-to snippets
around the web seem to focus on the `Allow-Origin` header, which is the meat
and potatoes of the whole thing. But it is important that you add the
`Allow-Methods` one, too, because some browsers will do what is called a
*preflight* request, which is an `HTTP OPTIONS` call to the endpoint to see,
essentially, what's cooking on the other end of the line. 

The preflight is the browser's first impression before it goes and fetches the
real thing you want.

If you don't explicitly signal that CORS is also OK for these `OPTIONS`
requests, the server might make a bad first impression. The browser will think
that CORS is not enabled, and then infer (incorrectly) that any subsequent
`GET` request will fail. Wanting not to waste your time and bandwidth, the
browser will then never even attempt the `GET` fetch you asked for. **But --
and here's the rub -- your browser console will report this failure to you as a
failure of the `GET` request**, throwing you off the scent of the real bug (a
failed `OPTIONS` request).

So that's it. CORS is your friend. And make sure not to forget about the
`OPTIONS` preflight.
