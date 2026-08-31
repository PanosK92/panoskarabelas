+++
title = "Spartan Engine"
type = "engine"
description = "Spartan Engine: a bindless, GPU-driven game engine with real-time path-traced global illumination, hardware ray tracing and 200 Hz vehicle dynamics, built solo over twelve years."
image = "/media/engine/world_showroom_a.png"

[hero]
  eyebrow = "One engineer. Twelve years."
  lead = "A bindless, GPU-driven renderer with real-time path-traced global illumination, hardware ray tracing, and a vehicle simulation running at 200 Hz. It started as a university project. It is now the thing I am known for."

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
  value = "MIT"
  label = "Licence, free with attribution"

[principle]
  title = "The GPU owns the data"
  body = "Every resource — geometry, materials, textures, lights, transforms, bounding volumes — lives in persistent, globally accessible buffers. No per-draw descriptor updates. No per-draw resource binding. No CPU-side draw loops. One philosophy applied without compromise: favour real-time over baked, dynamic over static, modern over safe."

[[groups]]
  name = "The renderer"
  items = [
    "Zero-binding draw path. All per-draw data lives in one bindless storage buffer, and push constants carry an index and nothing else.",
    "GPU-driven indirect rendering with per-meshlet frustum, Hi-Z occlusion and backface cone culling. One DrawIndexedIndirectCount per pass.",
    "ReSTIR path tracing with spatiotemporal reservoir resampling. Multi-bounce global illumination with no bake step and no light probes.",
    "Hardware ray-traced reflections and shadows through ray queries, sharing the same vertex-pulling path as the rasteriser.",
    "One universal HLSL codebase compiled to both SPIR-V and DXIL, so Vulkan and DirectX 12 run the same shaders.",
  ]

[[groups]]
  name = "The rest of the engine"
  items = [
    "Physically based camera and lights in real units. The sun is set in kelvin and lux, not in arbitrary multipliers.",
    "FSR 3, XeSS 3 and TAAU upscaling, with variable rate shading and dynamic resolution scaling.",
    "Tessendorf FFT ocean in compute, volumetric clouds with multi-scatter lighting, and froxel fog with temporal reprojection.",
    "Vehicle dynamics at 200 Hz. Pacejka MF 5.2 tyres with thermal, pressure and wear models, LSD differentials and thermal brake fade.",
    "Lua 5.4 through Sol2 with the full engine API, and an Nsight-style profiler with separate graphics and async compute lanes.",
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
  note = "Jesse Guerrero's beginner programming book features Spartan's code and community."
  url = "https://www.amazon.com/dp/B0CXG1CMNK"

[[usedby]]
  name = "University of Thessaly"
  note = "Where it began, as a thesis and portfolio piece."
  url = "https://en.wikipedia.org/wiki/University_of_Thessaly"

[[gallery]]
  src = "/media/engine/world_sponza.png"
  alt = "The Sponza atrium with curtains and ivy in the Spartan Engine editor, with the renderer options panel showing ReSTIR path tracing, ray-traced reflections and ray-traced shadows all enabled"
  caption = "sponza — read the renderer panel on the right rather than taking my word for it. ReSTIR path tracing, ray-traced reflections and ray-traced shadows all on, rendering at 1920x1080 and upscaling to 3180x1553 with FSR 3."

[[gallery]]
  src = "/media/engine/world_showroom_a.png"
  alt = "A LaFerrari on a lit turntable, rendered with path-traced global illumination and ray-traced reflections"
  caption = "showroom — the emissive bars overhead are the only lights in the scene. Everything on the car and the floor is bounce, path traced per frame."

[[gallery]]
  src = "/media/engine/world_liminal_a.png"
  alt = "A dim liminal corridor with a single ceiling light, rendered with real-time global illumination"
  caption = "liminal — a single ceiling panel, and a room that is legible anyway. This is the case that breaks renderers which lean on ambient terms."

[[gallery]]
  src = "/media/engine/world_selection_4.png"
  alt = "The Spartan Engine world launcher showing nine selectable worlds"
  caption = "the launcher — nine worlds ship with the engine, all physics-enabled, none of them canned demos."
+++

## Why it exists

I had to "finish" this project inside a year so I could use it as a ticket out of Greece and into a
studio that would have me. To get there I worked 100-hour weeks, roughly fourteen hours a day, every
day. It worked. It also never stopped.

Twelve years later it is still the same codebase, and I have rewritten almost every system in it
multiple times. Every single rewrite came out **simpler** than what it replaced. That is not what
people expect to hear about a maturing system, and it is the most useful thing I have learned from
building this.

This is what a codebase looks like when one person owns every line for a decade. No legacy
committees. No half-migrated architectures. No "we'll fix it in the next version."

It is a personal R&D engine, not a commercial product. No roadmap promises, no support queue, no
compromises on the vision. There is a destination that gives all of this a purpose — the plan is in
the repository if you are curious.
