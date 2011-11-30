---
layout: post
title: iPhone Native Apps Prediction
permalink: /2007/10/iphone-native-apps-prediction/
---

> Post-hoc update: hah! boy was I wrong!

Jobs finally let the inevitable plan leak that Apple was going to support
native apps from 3rd party developers on the iPhone. (This is the whole reason
I bought one, so good news for me). He mentioned the understandable difficulty
of releasing such a framework because of security reasons, which I think makes
complete sense: the prospect of mobile viruses is potentially disastrous.
Here's the prediction then: **"Native" apps are really going to be HTML-based
Widgets, armed with new WebKit features & a rich JavaScript API into the
phone's features.** Several things support this theory:

    * The only way to create a truly secure native-app framework based on binary files would be Apple inspecting and signing each binary to give their approval. This creates a bottleneck that would stifle the type of experimentation and hacking I think Apple knows it needs. **Therefore a non-binary format used as the native app language is preferable**. Java byte code is already out, as evidenced by Apple's failure to include Java on the iPhone. MS CLI is out for obvious reasons. That pretty much leaves Flash and Web-based solutions.
    * **We know the iPhone already supports widgets,** even though we aren't allowed to create our own. A good way to guess what bones we're going to get thrown is to look at which one's Apple is already chewing on.
    * **Apple is embracing the web in a very big way**. The flourishing of the web has done a lot of good for Apple -- when your company has been plagued for years with detractors saying "well so-and-so-program won't run on a Mac," the platform independence of web applications is a welcome arrival. It makes sense for them to continue embracing web technologies on other devices, such as the iPhone.
    * **WebKit just added support for [local storage[(http://webkit.org/blog/126/webkit-does-html5-client-side-database-storage/)**. One of the first problems with third-party apps is how to let them store information without being able to corrupt the iPhone. Some sort of managed storage solution has to be added to provide persistence without true filesystem access, and this is exactly what the WebKit team just added.
