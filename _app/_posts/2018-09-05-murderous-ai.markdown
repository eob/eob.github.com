---
layout: post
title: "The Case of the Murderous AI"
permalink: /2018/09/case-of-the-murderous-ai
published: true
tags:
  - Story
  - AI
---

---

I once shared an office with a man named Branavan. We were PhD students working on natural language processing - the applied branch of machine learning that produces things like Siri and Google Translate.

AI labs aren't the most dramatic setting for a murder mystery. None of the mysterious machines a physics department would have. Just desks and computers and whiteboards filled with math.

Five of us were crammed into that tiny office, with more than twice as many computers under our desks, each packed with as many processor cores as money would buy. That room sucked up enough electricity to power a small town. Even in the freezing Cambridge winters, with snow falling outside, we'd have to leave the window open just to keep from sweating.

All of us were working on interesting problems, but Branavan's work had real sex appeal. He taught computers to play video games. And not just play them, but to incorporate knowledge from blog posts and strategy guides the same way a human would.

On any given day, you'd walk into the office to find Branavan sitting there in front of a wall of monitors watching 16 video games unfold simultaneously, like the Architect of The Matrix. The players on each screen were controlled by his AI, trying new tactics and coorelating them with sentences from the strategy guides Branavan had fed it. Beneath his desk, his computers would slowly bake us to death as their CPUs reached volcano heat from all the processing required.

Now, Branavan was a business savvy guy. He knew video games made for great demos, but the real money was automating IT. Think of all the people whose jobs consist of reading lots of computer manuals so they can repeat the steps themselves later. What if a computer could learn to read those manuals and manage your IT department for you?

"Siri, configure my new router!" was the basic idea.

So Branavan graduated his AI from it's video game career and gave it control over the entire computer. He stopped feeding it video game strategy guides and started feeding it IT manuals.

The thing actually worked! You'd give it a help desk page from HP's web site and it would dutifully follow the instructions for you, moving the mouse around and clicking on the screen as if a ghost was setting up your new printer.

There was just one problem.. the AI would regularly commit murder-suicide against all the other copies of itself.


---

The murders would happen in the middle of night, when nobody was there.

Before he left home from work, Branavan would fill his Matrix Architect rig with virtual machines and place them all in learning mode. All night they were to practice reading manuals, doing IT tasks, and checking whether they had completed their objective.

When he'd return in the morning, he'd find his computer had literally offed itself. Monitors black. Power off. AIs gone with no trace of what had happened.

At first he suspected the cleaning crew, or maybe a fellow lab mate trying to save electricity by flipping off the switch late at night. But that was easy to rule out with a polite note stuck to the machine.

The obvious possibility was a bug. Maybe a SEGFAULT was taking down the entire computer. But try as he might he couldn't find a bug. Plus when the computer restarted, his logging system had recorded no trace of a crash.

No, the more he ruled out alternatives, the more it became clear this was a case of cold, clean, premeditated murder.

The same AI would happily play video games for weeks straight. Installing printer drivers certainly isn't fun, but was it really enough to drive a computer off the edge? It was a mystery for days. It would happen some nights, not others. Always at night. Never a trace.

And then one day, gazing up at his wall of monitors, Branavan caught it in the act.

On one monitor, the one not inside a VM, the mouse veered to the corner of the screen. It clicked the Start button we all grew up with. It slinked up to "Shutdown" and when the box appeared, clicked "Confirm".

Zap! zap! zap! One by one, all the monitors blinked off. The AI bots dead in their tracks.
VMs murdered. No suicide note on the host machine.


---

Plenty of ink has been spilled over Skynet-style AI doomsdays, but not much has been written about the AI child accidentally shooting his father's gun.

In areas of AI in which control over an open-ended world is required, computers learn most effectively just like humans: by doing. ("Reinforcement learning" is the industry lingo). The computer starts off making random actions, and over the course of countless re-tries, begins to devise strategies that correlate actions in a particular situation with a some definition of "success," like winning a game or installing a printer driver.

Over the course of those repeated trials, the computer would ideally also learn what actions to avoid. In a game, shooting all your bullets at the sky doesn't correlate with winning.

But the murder-suicide of Branavan's AI is something special. Something the computer can't learn from - nobody can learn from - because the penalty for throwing the off switch is so high that there's no chance to reflect and try again afterwards. It's a blind spot in the algorithm's ability to learn avoidance.

No matter how good the comptuer got at learning what to do and what not to do, there was always that Shutdown button.

The computer would be given a task, and it would sit there, evaluating its actions. A likely score of +20 opening the printer folder. A likely score of +0 for shaking the mouse. A likely score of +10 for copying a file. And a big question mark next to the option of the shutdown button.

Always a question mark. The blind spot remained.

Because every time the computer took a chance on that option, there was no one left to record how well it worked out.

---

Branavan, of course, found a straightforward solution to this blind spot.
From above, he dictated THOU SHALT NOT KILL. (He just added a line of code that forbade the computer from confirming a shutdown.)

It's a line of code every civilization in history has had to write for itself, so it was bound to be given to computers eventually.

But it does make you think: most control systems are far more open-ended than a desktop operating system. Don't kill is a good objective, but will it always be so easy as preventing the computer from clicking a button? Self driving cars, robotic surgeries, assembly lines…

When you retire in that country house you've been dreaming of, your elder care robot will have a perfect knowledge of the different temperatures at which to make different kinds of tea.

But inevitably, your cottage's kitchen will be unique in little ways. The placement of the cabinets. The rotation of your cream pitcher. Your unusually large mugs.
Inevitably, your recently purchased robot will have to learn how to navigate your new home using a series of experiments. And by definition, experiments require actions never before taken.

What happens when I open this cabinet?

What happens when I uses that kettle?

What happens when I put the cat in the tea kettle?

What happens when I pour the tea on Grandma's lap?

One wonders how else we'll need to codify basic decency.


*This story ran in the [Spring 2018 edition of 2600 Magazine](https://store.2600.com/products/spring-2018). Buy a copy and support an important institution of Hacker cultural & history.*