---
layout: post
title: Nasty Bug in Rack 1.0
permalink: /2009/08/nasty-bug-in-rack
---

I spent most of the afternoon tracking down a nasty bug that ended up being in
the Ruby Rack middlewear and thought I'd post a fix here in case there are any
Rails developers out there who read my blog. In short, a call to `.params` on a
`Rack::Request` object will fail with an uncaught exception whenever
`@env["rack.request.form_input"].eql` and `@env["rack.input"]` are both nil.
This causes `request.POST` to return nil (line 137 of request.rb), which then
causes line 160 of request.rb to throw an exception:

     160 self.put? ? self.GET : self.GET.update(self.POST)

I wouldn't be surprised if this bug is already fixed in the latest git
repository, but I wanted to post the fix here in case you are on a host where
you are frozen at Rack 1.0 and can't update to the lastest. Basically, instead
of using `request.params` to access the union of GET and POST params, use the
following method:

     def extract_params(req)
       if req.put?
         return req.GET
       else
         (req.GET || {}).update(req.POST || {})
       end
       rescue EOFError => e
         req.GET
     end

That implements the code a bit more safely and will return an empty hash
instead of nil. Don't hate me for using Ruby's notorious `(possibly_nil_var ||
backup_var)` syntax. Now to finally finish the real work I was trying to get
done....I guess the good news is I learned how to use ruby-debug. I was using
`Rack::Request` to extract the useful data out of the env variable that is
presented with the rack request. In certain circumstances, the

