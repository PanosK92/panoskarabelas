---
date: 2026-11-08
title: Twelve years of building a game engine, and what it means to finish one
image: /media/engine/showcase_ferrari.jpg
description: From a yellow triangle to an island you can drive across. On finishing Spartan, why it was my rocket, and why it won't be yours.
---

![image](/media/engine/showcase_ferrari.jpg)

Around 2014, I opened a window and drew a yellow triangle on a blue background. Twelve years and more than 8,000 commits later, that same codebase renders an island some 30 kilometres across, with towns, an airport, more than 200 roads, forests, an FFT ocean and cars simulated at 200 Hz. Path traced. Every frame.

Drag the handle. That's the whole story in one picture.

{{< compare before="/media/post_finished_2014_triangle_wide.jpg" after="/media/engine/showcase_island_town.jpg" labelBefore="2014" labelAfter="2026" caption="The first frame Spartan ever rendered, and Zakynthos today. Same codebase, same engineer." >}}

I've written about the engine before, about [what twelve years of rewrites taught me about simplicity](/blog/posts/kiss/). This post is different. This time I want to say a word that almost nobody who builds an engine ever gets to say.

Finished.

I don't know of many people who have kept one engine alive in public for twelve years, worked on it nonstop, actually brought it to the point where you can ship with it, and then sat down to write about what that was like. So here it is.

## What finished means

Let me get the obvious part out of the way: an engine is never finished. There is always a faster path, a better shadow, a new GPU feature, a bug hiding in a system you haven't touched in three years. Anyone who tells you their engine is done is either lying or has stopped working on it.

So when I say finished, I mean something specific. I mean that Spartan now has enough features to make most games. Not tech demos. Games. It has the editor, Lua scripting, a standalone runtime, a game builder that packages a world into something you can ship, Steam integration, full documentation. And as of this month, visual scripting. You can build an entire game without writing a single line of Lua or C++, if that's what you prefer.

That last piece is the one that made me draw the line. I'll explain why. But first, how a triangle turned into this.

## Why an engine

I was more than halfway through university when it hit me. I had to do something with my life, and the degree was not going to cut it.

I've never been a believer in degrees. To me, the piece of paper means nothing. It says you sat in rooms for a number of years. It doesn't say you can build anything. And I wanted to break into the game industry, an industry that, as far as I could tell, cared a lot more about what you could build than about what you had studied.

So the question became: what do I build?

The obvious answer was a game. But think about what making a game meant back then. You needed a programmer, a designer, an artist, someone for sound, someone for animation. You needed a team. Shipping a game on your own was brutally difficult, and shipping something good on your own was close to impossible. It's a multidisciplinary problem, and I was one person.

So I didn't start from the goal. I started from the constraints, and reasoned my way up from first principles.

I was one person. I could program, and I could keep going for a very long time. A game needed too many disciplines for one person to finish. So the question became: *what can I build, alone, that has real value to somebody else? Something people would pay for, and something that never has to be finished, it just keeps growing?*

The answer was a game engine. I didn't choose it because it was cool, or because someone told me to. My circumstances, reasoned through from first principles, defined the goal.

![image](/media/post_finished_2014_crate.jpg "Physics comes online. A textured crate, Bullet physics, and Visual Studio wrapped around everything.")

It started small, like everything does. A triangle. Then a textured crate with physics. Then a Jeep in a world with houses, a frame counter in the corner, and the whole solution explorer visible in the screenshot because at the time, the code *was* the product.

![image](/media/post_finished_2015_jeep.jpg "February 2015. “Directus Engine”, 62 FPS, and a solution explorer that still fits on one screen.")

Back then it wasn't called Spartan. It was called Directus3D, a codename that stuck around for years. By August 2015 it had a skysphere, a G-buffer and a console that proudly announced every shader it compiled.

![image](/media/post_finished_2015_hermes.jpg "August 2015. A Hermes bust under a skysphere, on a GTX 660 Ti.")

Then came an editor. A hierarchy, an inspector, a project browser. It looked like what I thought an engine was supposed to look like, because I was learning by building, and building by imitating what I admired.

![image](/media/post_finished_editor_first.jpg "The first editor. Wheatley from Portal 2, a chrome material test and a lot of empty grey panels.")

![image](/media/post_finished_directus3d.jpg "Directus3D grows up: physically based materials, rigid bodies, colliders and a night scene.")

In 2019, I renamed it. Directus3D had always been a codename, and by then I knew what the engine actually was, and what it was becoming. Stripped down. Nothing unnecessary. Built to endure. Spartan.

![image](/media/post_finished_spartan_sponza.jpg "Spartan on Vulkan. Sponza, a real profiler, renderer options and a GPU that would have been science fiction in 2014.")

![image](/media/post_finished_audi.jpg "Layered car paint and reflections. By now, the screenshots were doing the talking.")

## Raised Spartan

People sometimes ask me how I kept going for twelve years. They expect a story about motivation, or discipline, or some trick for staying productive. The honest answer is less glamorous.

I never had to find the strength. It was already there, because of where I came from.

I've been through difficult phases in my life, from poverty to whatever you can imagine. Nothing was given to me. I had to take everything. And when that's your starting point, something strange happens to the idea of a low point. They exist, of course. I had them. But they didn't register the way people expect them to. Hard was the baseline. Hard was normal.

![image](/media/post_finished_corinthian_helmet.jpg "A bronze helmet of Corinthian type, the kind Greek hoplites wore into battle. The Metropolitan Museum of Art, public domain.")

The ancient Spartans understood this better than anyone. According to Plutarch, Spartan boys were taken into the *agoge* at the age of seven. Communal training, little food, no shoes, and from the age of twelve, a single cloak for the whole year. The point was that a man raised in hardship doesn't experience hardship as an obstacle. He experiences it as the weather.

That one idea, that hardship can become your baseline rather than your enemy, is exactly what I lived. The Spartans even gave us a word for my favourite way to write code. They came from Laconia, and they were famous for saying as much as possible with as little as possible. *Laconic.*

As long as I had the basics taken care of, I could write code like a machine. Every day. For as long as it took. I knew that about myself from the very beginning, which is why I was never afraid of a project with no end date.

So I worked like a soldier.

## The engine opens doors

Here's something most people get wrong about opportunity. They think it comes from degrees. From certifications. From climbing to a slightly better job, and then a slightly better one after that.

In my experience, it doesn't. Opportunity comes from people. People who walk in because you did something great.

The engine did that for me, over and over again, in ways I could never have predicted. It took my life from the routine, from just living and working and repeating, to a completely different level. And the strangest part is how it happened.

I stopped hunting for jobs. The jobs started coming to me.

People from high up in companies would reach out directly. Not recruiters, not HR. The people who actually make decisions. They'd ask for help, and they'd give me the freedom to choose the money and the terms I wanted. And when I wanted something myself, the door was already open. I could get an interview with whoever I wanted, from Naughty Dog to Remedy. The engine didn't just open doors. It brought people to mine.

It didn't stop at jobs, either. Spartan's TAA ended up in [Godot](https://github.com/godotengine/godot/blob/37d51d2cb7f6e47bef8329887e9e1740a914dc4e/servers/rendering/renderer_rd/shaders/effects/taa_resolve.glsl#L2). Its rendering code ships in a [S.T.A.L.K.E.R. Anomaly addon](https://www.moddb.com/mods/stalker-anomaly/addons/screen-space-shaders). It's in a [published programming book](https://www.amazon.com/dp/B0CXG1CMNK). More than 600 engineers follow its development on Discord. I didn't plan any of it. It just happened, because the work was there for people to find.

![image](/media/post_finished_livestream.jpg "Building in public. When the work is visible, people find it.")

And once that starts, your job becomes very simple. You don't have to worry about job hunting anymore. You don't have to network, or polish a CV, or play a game you don't believe in. You just have to be really good at what you do.

That's it. Be really good at what you do. The rest manifests.

## Why visual scripting is the line

Visual scripting is nothing special as a feature. Every major engine has it. I'm not going to pretend I invented node graphs.

For me, it's a statement.

For years, I made Spartan difficult to use. On purpose. There was no scripting, not visual, not even Lua. Just C++. People would ask for it, and I'd say no. Not because I didn't want people using the engine, but because I knew something they didn't: the scope was massive, and parts of it were incomplete. I have a very high bar, and the engine wasn't clearing it yet.

Exposing an engine of that scope, while parts of it were still unfinished, would have been pointless. You don't hand someone the keys to a house that doesn't have floors yet. They'll fall through, they'll blame the house, and they'll be right.

Now the floors are there. The internals are robust enough that I'm confident in them, and that confidence is what changed. So I opened the doors, and I did it with the most accessible way in there is: drag a node, connect a wire, press play.

![image](/media/post_finished_visual_scripting.png "Lesson four from the tutorial world: a light that blinks, built from twelve nodes and zero lines of code.")

Every engine API function is available as a node. The graph compiles to Lua, so nothing is hidden, and it runs exactly like Lua written by hand. There's a tutorial world with four small lessons that take you from your first tick event to branching logic.

In [my SR-71 post](/blog/posts/kiss/), I wrote about how Kelly Johnson designed the SR-71 so that an average mechanic with a handful of standard tools could service it. Visual scripting is my version of that. But notice the order. Johnson didn't build for the field mechanic first and the edge of space second. He built an aircraft that could survive Mach 3.2, and *then* made sure anyone could maintain it.

That's where I draw the line. Not because of the feature itself. Because of what it means: the airframe is solid, so now I can hand out the wrenches.

## The soldier becomes a general

Let me be clear about where I stand on AI, because it's a big part of this story.

I love AI. I think it's the future, and anyone who doesn't see that is going to become history. And I mean that literally, not as a slogan.

AI won't replace you. The developer who uses AI will. It multiplies your output by ten. It writes better code than most humans, and it makes far fewer mistakes. People love to call AI code slop. Have you seen what humans write? We've been shipping slop for decades. We were just slower at it.

Now, I'm aware that this is where a lot of people stop nodding. And I want to be fair: AI is a tool, and a tool amplifies whoever is holding it. Point it at a problem without understanding the problem, and it will amplify your confusion at ten times the speed. Taste, judgement and direction still have to come from somewhere. That part hasn't changed. What changed is everything else.

Here's what AI didn't do. It didn't build Spartan. The skeleton and the philosophy were already there, twelve years of them, written by hand, rewritten by hand, burned down and rebuilt by hand.

Here's what it did do. It gave me back time. Without it, getting the engine to where it is today would have taken me at least another three or four years. Fifteen years, maybe more. Instead it's twelve, and nothing was skipped to get there.

It's like having an employee. I literally pay for him. I dictate, and he writes the routine code, the boilerplate, the scripts, the glue. I act as the technical director. I look at the engine from above, and I worry about the things that actually matter.

That's the real gain. Not the code it writes. The work it takes off my plate. My grey matter isn't wasted on a Python script anymore. It goes where it should go, like optimising the renderer. And from up there, with the routine out of the way, I design better.

For most of these twelve years, I was the soldier. Alone, in the trenches, doing everything by hand. Now I'm the general. Same person. Different job.

## The rocket won't fly twice

People love to say *"don't build an engine, build a game."* I always found that advice foolish.

Build an engine. Build whatever the hell you want. Especially back then, before AI, building an engine was one of the best things a young programmer could possibly do. You learn everything. Math, hardware, architecture, performance, tooling, the works. Nothing teaches you like a problem that has no bottom.

For me, it was more than education. It was a rocket. I was strapped to it, and it took me places. People, opportunities, doors I didn't know existed.

But I want to be honest with anyone starting out today: **it won't be that rocket for you.**

Not because engines stopped mattering. Because the novelty is gone. Value comes from scarcity, and the scarcity is gone. If someone can sit in their office and manifest an engine, or a renderer, or whatever system they need, by talking to an LLM for an afternoon, then the fact that you built one by hand doesn't impress them the way it impressed people a decade ago. There's no value in offering people something they can already have.

So if you love it, build one. If you want to learn, build one. You'll come out the other side a better engineer, I promise you that.

But there's a mistake I see all the time. People meet me, hear the story, and go off to build an engine. I'm happy they do. But I can usually tell they didn't reason their way there. They copied my *conclusion*, not my *reasoning*.

That matters, because the conclusion was never the point. It was the output of a set of constraints that existed twelve, fourteen years ago. One person, too many disciplines, no AI, and a world where an engine built by hand was rare enough to open doors. Change the constraints and the answer changes with them. You can't take a decision someone made fourteen years ago and run it today. It might work. It might not. Either way, you're not thinking. You're imitating.

If you reason from first principles, you don't need anyone's old answer. You can derive the next one yourself, and you'll see the goal moving before everyone else does. That's how I knew an engine was the right move then, and it's how I know it isn't the same move now.

So if there's one thing from this post I'd want you to keep, it's this. **When a decision is going to cost you years of your life and a lot of money, reason from first principles.** Every single time. It's worth it.

And if you're looking for a rocket today, reason it through and you'll land where I did. Look one level up. The game has gone meta. The question is no longer *"can I build an engine?"* The question is *"what can I build with an engine and AI that nobody could build before?"*

## A studio of one

Here's my prediction. We're going to see the first AAA and AA studios run by single-digit headcounts.

I know how that sounds. Look at the industry right now, though. Studios are overloaded. The budgets, the headcount, the years it takes to ship anything, the internal politics. Games that take seven years and hundreds of people, and then underperform because the world moved on while they were in production. It isn't sustainable, and you can see it isn't. Studios closing. Waves of layoffs, one after another. It all keeps going in the same direction.

What replaces it is a sustainable model. Fewer people, far more skilled. People with a vision and a creative direction, who can wield the engine, the AI and the art at the same time. A handful of high-agency individuals with the output of a hundred.

Am I sure about the timing? No. Predictions like this are always early before they're right. There will be studios that try this and fail, and people will point at them and say it doesn't work. But the direction is set. The output multiplier is real. I feel it every single day. And a multiplier like that doesn't get un-invented.

## Just getting started

So, is Spartan finished? Yes.

And I'm just getting started. I'm smiling as I write this.

For as long as I can remember, I've carried a game in my head. It's inspired by Gran Turismo 4 and Test Drive Unlimited, and it's detailed down to the last corner. For most of my life, it was the kind of game you'd need a studio and millions of dollars to make. Millions. A team, a building, a publisher, years.

Now I have my engine. And I have AI. Suddenly, the thing that needed a studio is within reach of one person.

![image](/media/engine/showcase_ferrari_close.jpg "Where it's heading. Layered clearcoat paint and ray-traced reflections, all in real time.")

It already has an island to live on. The Zakynthos you saw at the top of this post, some 30 kilometres across, with racing-grade physics running underneath. That's not a tech demo waiting for a purpose. That's the beginning of the game.

So I'm seizing it. I'm not predicting single-digit AAA studios from the sidelines. I'm going to be one. I say what I believe, and then I go and do it.

The triangle took twelve years to become an island. Let's see what the next few years do with an engine and AI.

If any of this resonated with you, come take a look. It's on GitHub, it's documented, and for the first time in twelve years, it's ready for you.

**[Spartan Engine on GitHub](https://github.com/PanosK92/SpartanEngine)**
