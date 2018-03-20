---
layout: post
title: "How I Hacked Amazon’s $5 WiFi Button to track Baby Data"
permalink: /2015/08/how-i-hacked-amazons-dash-button-to-track-baby-data
published: true
tags:
  - Buttonjoy
---

**UPDATE: I’m now selling ready-to-use buttons at
**[Buttonjoy.com](https://buttonjoy.com/)**!**

![](https://cdn-images-1.medium.com/max/800/1*uzhO9OTxp6L1YguIJiNFPQ.jpeg)
<span class="figcaption_hack">My son Everest, the project’s quality assurance engineer. He subjected the
button to a rigorous drool test.</span>

New parents are constantly learning how to care for their growing and changing
baby, but it can be a challenge because your baby can’t talk to you. Recording
data helps you find patterns — even obvious ones — that you won’t notice on your
own because of sleep deprivation.How many times did the little guy wake up last
night? Seems like an easy question, but it’s not.

My wife and I tried a few baby-tracker apps, but they tend to be single-purpose,
while your baby’s needs keep changing. And using your smart phone at night
disrupts sleep.** I want a simple button I can stick to the wall and push to
record poops today but wake-ups tomorrow. **Lucky for me, Amazon just started
shipping their new [Dash
Buttons](http://www.amazon.com/b/?node=10667898011&lo=digital-text), which you
can transform into exactly that with just a few minutes.

Dash Buttons are small, $5 plastic buttons with a battery and a WiFi connection
inside. Amazon wants you to stick them to the insides of your cabinet doors and
use them to re-order products like diapers or toilet paper. Push the button, get
a new pack of diapers in the mail in two days.

I’m going to show you how to hijack and use these buttons for just about
anything you want. Here’s is a short video preview of the results. Read on to
see how you can build this yourself in just a few minutes.

<span class="figcaption_hack">Video of the final result. You can wire up as many dash buttons as you like to
record things around your house. The delay between button press and spreadsheet
change is due to the Dash hardware’s boot-up process.</span>

### Here’s the trick: listen for the button to wake up and connect to the network.

OK, so our goal is to detect when one of these Dash buttons is pushed and then
do something other than order more diapers on Amazon. The impressive hack would
be to rip open the button and reprogram it. But I’m a dad: I don’t have time for
that shi — *err.**.* doody.So we’ll take the lazy route: we’ll just write a
simple program that sniffs our wifi network for evidence that the button was
pushed and then records a data point when it hears some.

It turns out Amazon gave us a very easy way to do this because they were so
concerned with power saving. Dash buttons are turned off most of the time to
preserve the battery inside. They only turn on when you push them. *And that
means **they have to re-connect to your Wifi network every time they are
pushed**. *That’s easy to detect.

Internet devices don’t just connect to a Wifi network and start talking to
Amazon: they introduce themselves to the local network first*. *This
introduction is done with something called an [ARP
Probe](https://en.wikipedia.org/wiki/Address_Resolution_Protocol#ARP_probe), and
it’s essentially a safety check to make sure that the [MAC
address](https://en.wikipedia.org/wiki/MAC_address) the device is going to use
as an identifier isn’t already being used by someone else.

<span class="figcaption_hack">Every time you push a Dash button, it reconnects to the network, causing a
predictable transmission called an ARP Probe we can detect and act upon.</span>

That’s great news for us: every time a Dash button is pushed, it powers up its
radio and promptly transmits the message, “Hi! My name is [MAC Address]!”

So, conceptually, problem solved. We just have to:

1.  Prevent the button from actually ordering anything
1.  Listen for Dash Button ARP probes, and
1.  Translate those probes into spreadsheet updates

### Step 1: Prevent the Dash Button from actually ordering anything (Sorry Amazon)

The first thing you need to do is configure your buttons to send messages when
you push them but not actually order anything. When you get a Dash button,
Amazon gives you a list of setup instructions to get going. Just follow this
list of instructions, but don’t complete the finalstep — *don’t select the
particular product you want ordered.*

The last step for the Huggies button, for example, is to select which of several
Huggies products you want. Just don’t answer this question and you won’t have to
worry about actually buying anything.

### Step 2: Detect when a Dash Button is pushed by sniffing for ARP Probes

OK. So now your button is sending messages to the network whenever it’s pushed.
The next step is to sniff the WiFi network for these messages. Remember, we’re
looking for something called an ARP Probe. To do that, we’re going to write a
little Python program using a library called
[Scapy](http://www.secdev.org/projects/scapy/). Just copy and paste the
following code:

With that program running — here’s the low tech part — pick up a button and
press it. You’ll see a message appear after a few seconds (the buttons take a
while to power on!). That’s the MAC address that uniquely identifies that
button.

<span class="figcaption_hack">Every time you push the Dash button, it wakes up and issues an ARP request. By
watching sniffer output of these requests in real time, you can learn each
button’s MAC address.</span>

Now that we know the MAC addresses, we’re going to hard-code them into our
python program (remember, we’re in lazy dad mode here..). The code and screen
shots below are for my buttons. Your addresses will look different.

Here’s the modified code:

And here’s the console output when we push the buttons while this program is
running:

<span class="figcaption_hack">We’re nearly finished! Our code identifies each button push correctly. Now we
just have to record a data point in response.</span>

### Step 3: Record the button push data to a Google Spreadsheet

Now all we have to do is record data every time a button is pushed. To do that,
I’ll use a [Magic Form](http://www.cloudstitch.com/magic-form), a tool my
startup [Cloudstitch](http://www.cloudstitch.com/) launched last week that lets
you send data from anywhere to a Google Sheet.

<span class="figcaption_hack">[Magic Forms](http://www.cloudstitch.com/magic-form) are great when you need a
quick and easy way to save data to the cloud.</span>

Just visit Cloudstitch, create a Magic Form, and you’ll be given a URL that add
rows to your spreadsheet when you post form data to it.

So all the pieces are in place now: before we had a bit of code that prints a
message every time a Dash button is pushed. Now we just add a few more lines of
code to also send data to our Magic Form. Rather than paste in the whole updated
example again, I’ll just [link to the full
version](https://gist.github.com/eob/79f481c68cf4fbb110e7) and instead show you
the part that records a Poopy Diaper entry in our Magic Form. Right after
printing “Pushed Huggies” to the screen, I added this code, which sends two
fields, a** **Timestamp and the message “Poopy Diaper” to the form’s URL.

That’s it! Run the program again, push the buttons, and you’ll see the rows
added to your spreadsheet as you do!

<span class="figcaption_hack">I think it’s clear from the timestamps I need to go to bed.</span>

### Conclusion: The Internet of Things is already here.

A lot of people made fun of Dash Buttons when Amazon [launched them on the day
before April Fool’s
Day](http://www.usatoday.com/story/tech/2015/03/31/amazon-dash-ordering-button/70747342/).
But regardless of what you think about Dash as a consumer product, it’s an
undeniably compelling prototype of what the Internet of Things is going to look
like.

Using the instructions above, I bet you can wire up a Dash button like I did in
under ten minutes. That’s pretty incredible when you consider the buttons were
not supposed to be used this way. Actually — try it out and [send me an
email](mailto:ted@cloudstitch.io) with your time. I’ll curate the common hurdles
and zany ideas or photos.

We’re working on a lot of zany projects like this at
[Cloudstitch](http://www.cloudstitch.com/), by the way. Useful, simple,
self-contained projects built on top of the things in your life you’re already
using, like spreadsheets and buttons. **On that note, we might turn this Dash
button hack into a 1-click project for you to use. If you’re interested in that,
let us know by **[signing up for our “Internet of Things Hacker” mailing
list](http://www.cloudstitch.com/internet-of-things-hacker)**. We’ll use it to
curate and announce fun projects like this.**
