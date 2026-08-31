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
  name = "Architecture"
  items = [
    "Zero-binding draw path, all per-draw data in a single bindless storage buffer with push constants carrying only an index",
    "One global vertex and index buffer for all geometry, with vertex pulling that bypasses the input assembler and is shared by rasterisation and ray tracing",
    "GPU-driven indirect rendering with per-meshlet frustum, Hi-Z occlusion and backface cone culling, one DrawIndexedIndirectCount per pass",
    "Meshlet clustering via meshoptimizer, with no mesh shader dependency",
    "Universal HLSL compiled for both Vulkan (SPIR-V) and DirectX 12",
    "GPU-side asset processing: mip generation and texture compression at load time, not baked offline",
  ]

[[groups]]
  name = "Lighting and global illumination"
  items = [
    "ReSTIR path tracing with spatiotemporal reservoir resampling for real-time multi-bounce global illumination",
    "Clustered deferred shading on a GPU-built logarithmic-Z grid, scaling to many local lights at near-constant per-pixel cost",
    "Hardware ray-traced reflections and shadows via ray queries",
    "Volumetric clouds baked into the sky panorama, with multi-scatter lighting and aerial perspective",
    "Froxel volumetric fog with temporal reprojection, sun shafts and underwater caustics",
    "Tessendorf FFT ocean with multi-cascade IFFT in compute, driving a camera-following clipmap",
    "Screen-space shadows and XeGTAO ambient occlusion",
  ]

[[groups]]
  name = "Performance and image quality"
  items = [
    "Variable rate shading and dynamic resolution scaling",
    "TAAU, Halton-jittered with variance-clip history reprojection",
    "Intel XeSS 3 upscaling",
    "Physically based camera with auto-exposure and physical light units in lumens and kelvin",
    "ACES, AgX and Gran Turismo 7 tonemappers, with HDR10 output",
    "Custom GPU breadcrumbs for crash tracing and post-mortem debugging",
  ]

[[groups]]
  name = "Beyond rendering"
  items = [
    "Vehicle dynamics at 200 Hz: Pacejka MF 5.2 tyres with thermal, pressure and wear models, LSD differentials, thermal brake fade and ABS",
    "PhysX rigid bodies, character kinematics and vehicle physics",
    "Full skeletal animation with crossfade blending and two-bone IK with ground-aware foot planting",
    "Lua 5.4 scripting through Sol2, with the full engine API and lifecycle callbacks",
    "Nsight-style profiler with separate graphics and async compute lanes, plus a memory fragmentation viewer",
    "OpenXR VR with multiview single-pass stereo, work in progress",
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
  src = "/media/engine/world_showroom_a.png"
  alt = "A LaFerrari on a lit turntable, rendered with path-traced global illumination and ray-traced reflections"
  caption = "ferrari_showcase — a turntable lit entirely by emissive light bars"

[[gallery]]
  src = "/media/engine/world_liminal_a.png"
  alt = "A dim liminal corridor with a single ceiling light, rendered with real-time global illumination"
  caption = "liminal_space — one light source, everything else is bounce"

[[gallery]]
  src = "/media/engine/world_sponza.png"
  alt = "The Sponza atrium with curtains and ivy, open in the Spartan Engine editor"
  caption = "sponza — the classic atrium, with curtains and ivy"

[[gallery]]
  src = "/media/engine/world_selection_4.png"
  alt = "The Spartan Engine world launcher showing nine selectable worlds"
  caption = "Nine worlds ship with the engine. None of them are canned demos."
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
