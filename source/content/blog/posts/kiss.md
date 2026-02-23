---
date: 2026-02-23
title: What building a game engine for a decade and the SR-71 Blackbird have in common
---

![image](/media/dramatic_blackbird_in_flight.jpg)

I've been building [Spartan Engine](https://github.com/PanosK92/SpartanEngine) for over a decade. A real-time 3D engine, from scratch, in C++. Rendering, physics, audio, scripting, editor, the works. Over those years I've rewritten almost every system multiple times. And every single time, the rewrite was simpler than what it replaced.

That's not what people expect to hear. Most assume that as a system matures, it gets more sophisticated. More layers. More abstractions. More patterns. But the opposite happened. My engine got *simpler*. Not because I was cutting corners, but because I was finally understanding what the problem actually needed.

It took me a long time to realize I wasn't discovering something new. I was just slowly, painfully arriving at a principle that an aerospace engineer had articulated sixty years before me. I'm not comparing my work to his. But the underlying truth is the same.

## The man who built the impossible

In the 1960s, Kelly Johnson led a small team at Lockheed's Skunk Works division. Their task: build a reconnaissance aircraft that could fly at Mach 3.2 at 85,000 feet. At the edge of space. Faster than any missile could chase it. The airframe would endure surface temperatures of over 300°C from friction alone. No existing material, engine, or design paradigm could handle it.

The result was the SR-71 Blackbird. It held the world speed record for over 30 years. It was never, not once, shot down. To this day, it remains one of the most extraordinary machines ever built.

But here's what most people miss about the Blackbird: it wasn't built by a massive team drowning in process. Johnson's Skunk Works operated with a small group of sharp engineers and a set of principles that would make most modern project managers nervous. Minimal paperwork. Direct communication. Small teams with full ownership. And above all, one rule that governed everything: **keep it simple, stupid.**

![image](/media/kelly_johnson_with_blackbird_bnw.jpg)

Johnson is the person who coined the KISS principle. The story goes that he handed his design engineers a handful of standard tools and told them that whatever they built had to be repairable by an average mechanic in the field using only these tools. If the design couldn't meet that constraint, the design was wrong. Not the mechanic.

Think about that. The fastest, most advanced aircraft on the planet, designed with the constraint that a field mechanic with a basic wrench should be able to service it. That's not a compromise. That's the insight.

And it wasn't just a slogan. Johnson's team lived it in every design decision they made.

## The beauty of Spartan design

![image](/media/skin_panels.jpg)

**The leaking fuel tanks.** At Mach 3.2, the airframe heats to over 300°C. Titanium expands. Johnson's team could have engineered complex high-temperature sealing systems: flexible joints, exotic gaskets, pressurized compartments. Instead, they designed the skin panels with deliberate gaps. On the ground, the Blackbird famously leaked fuel through them. In flight, thermal expansion sealed the gaps tight. The "flaw" *was* the solution. No extra parts, no seals to fail, no maintenance overhead. They turned a law of physics into a feature.

**One material.** Roughly 85% of the airframe was titanium alloy. At a time when conventional aircraft used complex multi-material composites, Johnson chose a single primary structural material. One set of thermal calculations. One set of manufacturing processes. One set of maintenance procedures. It simplified everything downstream because it eliminated the combinatorial complexity of mixing materials that expand, flex, and fatigue at different rates.

![image](/media/pratt_n_whitney_j58_engine.jpg)

**One engine that did two jobs.** The Pratt & Whitney J58 was a turboramjet. At low speeds it functioned as a turbojet. At high speeds it bypassed the compressor and operated as a ramjet. Instead of carrying two separate propulsion systems with two sets of fuel lines, two sets of controls, and two failure modes, they designed one engine that transitioned between modes. The concept was sophisticated. The implementation was mechanically simpler than the alternative.

**Stars for navigation.** The SR-71 used an astro-inertial navigation system that tracked stars even in broad daylight, providing accuracy within 300 feet at Mach 3+. Why stars? Because they can't be jammed. No external radio signals needed, no ground stations to depend on, no electronic countermeasures to worry about. Johnson's team reached back to the oldest navigation reference in human history and paired it with modern sensors. The simplest possible dependency, the sky, made it the most reliable navigation system of its era.

Every one of these choices followed the same logic: don't add a part when physics already gives you the answer. Don't add a system when one system can do two jobs. Don't add a dependency when you can depend on something that's been there for a billion years.

![image](/media/spartan_engine_impressive_screenshot.png)

This philosophy, this stripped-to-the-bone, nothing-unnecessary approach to building something extraordinary, is what resonated with me so deeply that about three or four years into development, I renamed my engine. It used to have a different name. I called it **Spartan** because that's the design ethos I was converging on, whether I realized it at the time or not.

But I didn't arrive at that ethos through inspiration. I arrived at it through pain.

## How I got here (the hard way)

If you open Spartan's source code, you might be surprised. It doesn't look like what universities teach you "proper" C++ should look like. People see it and think I chose to write it this way out of some stylistic preference. I didn't. I got *burned* into writing it this way.

Every complex design I ever wrote came back to bite me. Every clever abstraction, every "just in case" layer, every pattern applied because the book said so. Over the course of a decade, at the scale of a full engine, they all became liabilities. Not immediately. That's the trap. They feel productive when you write them.

And the smarter the engineer, the bigger the trap. Really sharp engineers get a dopamine hit from engineering itself. Designing an elegant type system, building a perfectly generic abstraction, architecting a framework that handles every conceivable edge case. It *feels good*. It's intellectually satisfying. I get it, because I've been there. But when you're serious about what you're building, when you're shipping something real, at scale, over years, that dopamine-driven complexity becomes a liability. The cleverness that felt so rewarding to write becomes the thing you curse at 2 AM when it breaks in a way nobody can debug. Intelligence is not the problem. Channeling it toward addition when it should be channeled toward subtraction, that's the problem.

The cost shows up six months later when you're refactoring a system and you have to untangle seven layers of indirection to change one behavior. Or two years later when a new contributor opens the codebase and can't figure out where anything actually happens because the logic is scattered across interfaces, managers, and abstract base classes.

Complexity compounds. At small scale, you don't feel it. At engine scale, over a decade, it will crush you. So everything you see in my code now is scar tissue. It's what's left after the unnecessary parts burned away.

Let me show you what that looks like.

## The scars

**Static classes everywhere.** My `Renderer`, `Input`, `Profiler`, `FileSystem`, `Engine`, they're all static. There's only ever one renderer. There's only ever one input system. I used to instantiate these. I used to pass them around, manage their lifetimes, inject them as dependencies. And for what? There was never going to be a second renderer. There was never going to be a second input system. I was managing complexity that had no reason to exist.

```cpp
array<bool, 107> Input::m_keys;

bool Input::GetKey(const KeyCode key)
{
    return m_keys[static_cast<uint32_t>(key)];
}

bool Input::GetKeyDown(const KeyCode key)
{
    return GetKey(key) && !m_keys_previous_frame[static_cast<uint32_t>(key)];
}
```

Two arrays and some boolean logic. No InputManager. No InputEventQueue. No InputBuffer with a strategy pattern. Just the thing itself, doing the thing. Not because I think simple is cute, but because everything else failed me over time.

Now, I'm aware that static/global state has real tradeoffs. It makes unit testing harder. It creates implicit dependencies. In a large team with dozens of engineers touching the same subsystem, you might genuinely need the guardrails that come with dependency injection and clear ownership boundaries. I'm not pretending those concerns don't exist. But for this project, at this scale, the tradeoff is overwhelmingly in favor of simplicity. The cognitive overhead of managing singleton lifetimes and passing objects through five layers of constructors was costing me more than it was protecting me from.

**Anonymous namespaces in the .cpp files.** I used to put helper functions and internal state in private class members. It bloated every header. Every file that included that header recompiled when I changed an implementation detail. It coupled things that had no business being coupled. Now, implementation details live in anonymous namespaces in the .cpp, invisible to the rest of the codebase, existing only where they're used.

```cpp
namespace spartan
{
    namespace // anonymous, invisible outside this file
    {
        const float distance_deactivate = 80.0f;
        const float distance_activate   = 40.0f;

        PxTransform to_px_transform(const Vector3& pos, const Quaternion& rot)
        {
            return PxTransform(PxVec3(pos.x, pos.y, pos.z), PxQuat(rot.x, rot.y, rot.z, rot.w));
        }
    }
}
```

**Public data members.** My `Vector3` has `x`, `y`, `z` as public floats. Not `GetX()`, not `SetX()`. I know this violates what every C++ textbook tells you. But there's no invariant to protect here. There's no setter logic. Wrapping these in accessors would be adding ceremony for the sake of ceremony, and I've learned the hard way that ceremony has a cost, even when it looks free.

```cpp
class Vector3
{
public:
    Vector3() { x = 0; y = 0; z = 0; }
    Vector3(float x, float y, float z) { this->x = x; this->y = y; this->z = z; }

    float x, y, z;
};
```

**Standard types used directly.** My entity hierarchy is a raw pointer to a parent and a `std::vector` of children. I tried custom containers early on. Custom trees, custom allocators, custom everything. They all became maintenance burdens that solved problems I didn't actually have.

Are standard types perfect? No. I'm well aware that `std::vector` isn't always cache-optimal, that `std::shared_ptr` has overhead from reference counting, that in certain hot paths you absolutely want custom allocators or flat arrays. The point isn't that standard types are always the best choice. The point is that they should be the *default* choice, and you should only replace them when profiling tells you to. Not because someone on a forum said you should, not because a blog post made you feel like you aren't a real engineer unless you roll your own.

```cpp
class Entity : public SpartanObject
{
private:
    Entity*                  m_parent = nullptr;
    std::vector<Entity*>     m_children;
    std::array<std::shared_ptr<Component>, static_cast<uint32_t>(ComponentType::Max)> m_components;
};
```

A parent pointer, a vector of children, and an array of components. That's what the problem needs. That's what the code is.

**Assertions instead of defensive programming.** Early in the project I wrote defensive code. Null checks that returned silently, fallback paths that hid errors. It felt safe. It was the opposite of safe. Bugs didn't crash, they *hid*. I'd spend days tracking down why something wasn't rendering, only to find a silent `return` five call levels deep that was swallowing a null pointer that should never have been null.

```cpp
SP_ASSERT_MSG(physical_devices.size() != 0, "No physical devices detected");
SP_ASSERT_MSG(width  != 0, "Width can't be zero");
SP_ASSERT(m_cmd_list_present->GetState() == RHI_CommandListState::Recording);
```

If something is wrong, I want to know *now*. Not six frames later. Not after a silent cascade of incorrect state. The assert fires, and you fix the root cause. Right there. Right then.

To be clear: assertions are a development tool. In shipping builds, you handle errors gracefully where it matters for the end user. But during development, which is where you spend 99% of your time, silent failures are the enemy. The faster a bug screams at you, the faster you fix it, and the less time it has to quietly corrupt everything downstream.

## Why "the book" isn't enough

I see a version of this tension in my Discord server and pull requests constantly. Well-intentioned contributors propose things like additional abstraction layers, wrapper classes around standard types, or manager-of-manager patterns. The conversation usually goes something like this:

*"Hey, I think we should add an event bus system so subsystems can communicate through messages."*

Why? What would it give us?

*"Well, we could decouple things and make the architecture more flexible and..."*

Will it produce measurable, quantifiable differences in the output?

*"Not really. Maybe marginal gains."*

Then it's unnecessary complexity.

It always comes back to the same question: **does the problem actually need this, or are you adding it because it's what you were taught to do?**

I want to be clear. I'm not anti-education. Universities and textbooks teach you patterns for a reason. Factory patterns, observer patterns, strategy patterns, abstract base classes, dependency injection. These are real tools that solve real problems. You should learn them. You should understand them deeply.

But here's what nobody tells you: **they're guides, not laws of physics.** No finite set of rules can cover every situation you'll encounter. The moment you treat patterns as gospel, as things you must always apply, you stop thinking about your specific problem and start forcing it into someone else's solution. Sometimes the right answer is a pattern from the book. Sometimes the right answer is something the book never considered. And sometimes the right answer is to throw the book away entirely and let the problem itself show you what it needs.

The greatest innovations in engineering didn't come from following the manual. They came from someone who understood the manual deeply enough to know when to deviate from it. Kelly Johnson knew every rule of aircraft design. He just also knew which ones didn't apply at Mach 3.2.

## Nature dictates the design

This is the deeper idea underneath all of it, and the one that took me the longest to see.

When you work on a problem long enough, really work on it, for years, you start to see that the problem itself tells you what the solution needs to be. Not what your education says it should be. Not what the patterns book recommends. Not what the latest conference talk suggests. The *problem* dictates the design. Nature dictates the form.

Kelly Johnson didn't start with a desire to build a simple aircraft. He started with a set of brutal constraints: Mach 3.2, 85,000 feet, titanium that didn't exist in the supply chain, fuel that doubled as coolant. Those constraints *forced* simplicity. Every unnecessary part was thermal mass that could crack. Every extra system was a failure point at the edge of the atmosphere. The Blackbird became simple not because Johnson liked simplicity as an aesthetic, but because the laws of physics left no room for anything unnecessary.

The same is true in a game engine. When you're shipping frames every 16 milliseconds, when you're managing thousands of draw calls, when you're synchronizing CPU and GPU across multiple command lists, the physics of the problem don't leave room for an `AbstractDrawCallFactoryManagerInterface`. The frame budget is your Mach 3.2. The GPU memory is your titanium. The constraints are real and unforgiving, and they'll burn away everything that doesn't need to be there.

The SR-71 didn't have unnecessary parts because unnecessary parts would have killed the pilot. Your game engine shouldn't have unnecessary abstractions because unnecessary abstractions will kill your frame rate, your iteration speed, and your ability to debug the thing at 2 AM when something breaks and you're six layers deep in indirection wondering which virtual dispatch is eating your cache line.

## What ten years taught me

After a decade of learning this the hard way, here's what I know:

1. **If a class doesn't need multiple instances, make it static.** Don't create complexity to manage a lifetime that doesn't need managing.

2. **If a piece of state is only used in one file, put it in an anonymous namespace.** Don't pollute headers with implementation details.

3. **If the standard library type does the job, use it.** Don't wrap `std::vector` in a custom class just to feel like you're engineering something.

4. **If something breaks, let it break loudly.** Assert. Don't write defensive code that hides bugs behind graceful degradation.

5. **If you can't measure the difference, it doesn't exist.** Don't add a custom allocator, a custom vector, or a custom anything unless you can point to a profiler trace that says you need it.

6. **If the code does what it needs to in three lines, don't write a framework.** Three similar lines of code is better than a premature abstraction.

None of these are absolute laws. Context matters. Team size matters. Project requirements matter. If you're building a plugin architecture that genuinely needs to support third-party extensibility, you might need those abstract interfaces. If you're working on a codebase with 200 engineers, you might need stricter encapsulation to prevent people from stepping on each other. I'm not saying these rules apply universally to every project in every situation.

What I am saying is this: **the default should be simplicity, and complexity should require justification.** Not the other way around. Most codebases I've seen, including my own early work, get it backwards. They start complex and never ask why.

Every one of these rules is the same rule, restated: **if the problem doesn't demand it, don't add it.** That's KISS. That's what Kelly Johnson knew. That's what the Blackbird was built on. That's what ten years of engine development taught me the slow way.

The best part is no part. The best code is no code. And the best abstraction is the one you had the discipline not to write.

## This is just the beginning

After a decade, the engine is better than it's ever been, and I feel like I'm just getting started. The lessons above didn't make things easier. They made things *possible*. When your codebase is simple enough that you can hold the whole thing in your head, you can move fast. You can take risks. You can attempt things that would be unthinkable in a tangled mess of abstractions.

That's where I am now. Not at the finish line. At the starting line, with a decade of hard-won clarity behind me and the most ambitious version of Spartan still ahead.

If any of this resonated with you, come check out the project. It's open source, it's alive, and there's a growing community around it.

**[Spartan Engine on GitHub](https://github.com/PanosK92/SpartanEngine)**
