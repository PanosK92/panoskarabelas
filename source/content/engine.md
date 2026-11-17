+++
title = "Spartan Engine"
type = "engine"
description = "Spartan Engine: a bindless, GPU-driven game engine with real-time path-traced global illumination, hardware ray tracing and 200 Hz vehicle dynamics, built solo over twelve years."
image = "/media/engine/showcase_ferrari.jpg"

[hero]
  lead = "A bindless, GPU-driven renderer with real-time path-traced global illumination, hardware ray tracing, and a vehicle simulation running at 200 Hz."

[live]
  title = "Live in your browser"
  lead = "The engine, compiled to WebAssembly and rendering a photoscanned head on your GPU through WebGPU."
  src = "/engine/live/"
  poster = "/media/engine/showcase_human_close.jpg"
  alt = "Close-up of a photoscanned head rendered in Spartan Engine"
  caption = "About 60 MB on first load"
  fallback = "Your browser doesn't expose WebGPU with JSPI, so this is a screenshot. Open the page in a recent Chrome or Edge on desktop to see it live."

[[stats]]
  value = "live-stars"
  label = "GitHub stars"

[[stats]]
  value = "600+"
  label = "Engineers on Discord"

[[stats]]
  value = "272"
  label = "Forks"

[[stats]]
  value = "Free"
  label = "Until your game earns $1M"

[principle]
  title = "The GPU owns the data"
  body = "Every resource — geometry, materials, textures, lights, transforms, bounding volumes — lives in persistent, globally accessible buffers. Real-time over baked, dynamic over static, modern over safe."

[[groups]]
  name = "Architecture"
  items = [
    "Bindless, zero-binding draw path",
    "GPU meshlet culling, one indirect draw per pass",
  ]

[[groups]]
  name = "Lighting"
  items = [
    "ReSTIR path-traced global illumination",
    "Ray-traced reflections and shadows",
  ]

[[groups]]
  name = "Image"
  items = [
    "TAAU, XeSS 3 and dynamic resolution",
    "Physical camera, lumens and kelvin",
  ]

[[groups]]
  name = "Beyond rendering"
  items = [
    "Pacejka tyre model, PhysX physics",
    "Lua 5.4 scripting, built-in profiler",
  ]

[[usedby]]
  name = "Godot Engine"
  note = "Ships Spartan's temporal anti-aliasing resolve."
  url = "https://github.com/godotengine/godot/blob/37d51d2cb7f6e47bef8329887e9e1740a914dc4e/servers/rendering/renderer_rd/shaders/effects/taa_resolve.glsl#L2"

[[usedby]]
  name = "S.T.A.L.K.E.R. Anomaly"
  note = "A rendering addon built on Spartan's source."
  url = "https://www.moddb.com/mods/stalker-anomaly/addons/screen-space-shaders"

[[usedby]]
  name = "A published programming book"
  note = "Jesse Guerrero's beginner book features Spartan's code and community."
  url = "https://www.amazon.com/dp/B0CXG1CMNK"

[[usedby]]
  name = "University of Thessaly"
  note = "Where it began, as a thesis and portfolio piece."
  url = "https://en.wikipedia.org/wiki/University_of_Thessaly"

[[gallery]]
  src = "/media/engine/showcase_ferrari.jpg"
  alt = "A LaFerrari on a lit turntable, rendered with path-traced global illumination and ray-traced reflections"
  caption = "ferrari_showcase — a turntable lit entirely by emissive light bars"

[[gallery]]
  src = "/media/engine/showcase_island_town.jpg"
  alt = "Sunset over Zakynthos Town, forests and a shallow turquoise bay"
  caption = "zakynthos — an open island some 30 km across"

[[gallery]]
  src = "/media/engine/showcase_ferrari_close.jpg"
  alt = "Close-up of the LaFerrari's flank, clearcoat reflecting the showroom lights"
  caption = "car paint — layered clearcoat with ray-traced reflections"

[[gallery]]
  src = "/media/engine/showcase_liminal.jpg"
  alt = "Yellow-papered liminal office rooms under a fluorescent ceiling panel"
  caption = "liminal_space — procedural rooms, path-traced bounce light"

[[gallery]]
  src = "/media/engine/showcase_sponza.jpg"
  alt = "The Sponza atrium with curtains and ivy, lit by path-traced global illumination"
  caption = "sponza — the classic atrium, no probes and no bake"

[[gallery]]
  src = "/media/engine/world_selection_4.png"
  alt = "The Spartan Engine world launcher showing its selectable worlds"
  caption = "the world launcher"
+++

## Why it exists

I had to "finish" this project inside a year so I could use it as a ticket out of Greece and into a
studio that would have me. To get there I worked 100-hour weeks. It worked. It also never stopped.

Twelve years later it is still the same codebase, and I have rewritten almost every system in it
multiple times. Every single rewrite came out **simpler** than what it replaced. It is the most
useful thing I have learned from building this.

It is a personal R&D engine, not a commercial product. No roadmap promises, no support queue. There
is a destination that gives all of this a purpose — the plan is in the repository if you are curious.
