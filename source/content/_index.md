+++
title = "Panos Karabelas"

[doc]
  role = "Rendering and engine programmer"

  lede = """
I build renderers, and the engines around them. For twelve years that has mostly meant one
codebase, written on nights and weekends, which now renders real-time path-traced global
illumination on a single GPU. Enough people have taken it apart that pieces of it ship inside
Godot Engine and a S.T.A.L.K.E.R. Anomaly rendering addon.
"""

  ledeTwo = """
During the day I work on graphics and engine code at BeamNG. Before that I spent two years at AMD
embedded inside other studios' engines making their frames faster, shipped Dirt 5 at Codemasters,
and built environmental-analysis AI for an unreleased PSVR title at Sony.
"""

  engineOne = """
Spartan Engine is built around a single principle: the GPU owns the data. Every resource — geometry,
materials, textures, lights, transforms, bounding volumes — lives in persistent, globally accessible
buffers. There are no per-draw descriptor updates and no CPU-side draw loops. A pass issues one
indirect call and the GPU decides what to draw.
"""

  engineTwo = """
Lighting is ReSTIR path tracing with spatiotemporal reservoir resampling, so global illumination is
multi-bounce and fully dynamic with no bake step and no light probes. Reflections and shadows are
hardware ray-queried through the same vertex-pulling path the rasteriser uses, and the shaders are
one universal HLSL codebase compiled to both SPIR-V and DXIL.
"""

  engineNoteTitle = "Twelve years"

  engineNote = """
The first commit was a university thesis. Almost every system has been rewritten several times
since, and every rewrite came out smaller than the thing it replaced.
"""

  recordProse = """
Fifteen years, four studios, and a great many frame captures. The job has been the same in all of
them: find out where the frame is actually going, then fix it.
"""

  podcastProse = """
I sit down with the most interesting people I can get in front of a microphone and ask the questions
I actually want answered, rather than the ones that make for a tidy episode. If a conversation is
worth ninety minutes, it gets ninety minutes.
"""

[hero]
  tagline = "I build renderers, and the engines around them."
  lead = "Twelve years on a solo engine with real-time path-traced global illumination. Before that, shipped titles at AMD, Codemasters and Sony. The rendering code I write on nights and weekends now runs inside Godot Engine and S.T.A.L.K.E.R. Anomaly."
  imageAlt = "The Spartan Engine editor rendering the Sponza scene with real-time path-traced global illumination"

[[stats]]
  value = "live-stars"
  label = "GitHub stars on Spartan Engine"

[[stats]]
  value = "12 yrs"
  label = "One engine, one engineer, near-daily"

[[stats]]
  value = "600+"
  label = "Engineers in the Spartan Discord"

[[stats]]
  value = "Godot"
  label = "…and S.T.A.L.K.E.R. Anomaly ship my rendering code"

[engine]
  eyebrow = "Spartan Engine"
  title = "A bindless, GPU-driven engine with real-time path-traced global illumination"
  lead = "Built around one principle: the GPU owns the data. Every resource — geometry, materials, textures, lights, transforms, bounding volumes — lives in persistent, globally accessible buffers. No per-draw descriptor updates. No CPU-side draw loops."

[[engine.features]]
  title = "ReSTIR path tracing"
  body = "Spatiotemporal reservoir resampling for real-time multi-bounce global illumination. No bake step, no light probes."

[[engine.features]]
  title = "Zero-binding draw path"
  body = "All per-draw data sits in a single bindless storage buffer. Push constants carry an index and nothing else."

[[engine.features]]
  title = "Hardware ray tracing"
  body = "Ray-queried reflections and shadows sharing one vertex-pulling path with the rasteriser."

[[engine.features]]
  title = "200 Hz vehicle dynamics"
  body = "Pacejka MF 5.2 tyres with thermal, pressure and wear models, inside the PhysX fixed-timestep loop."

[[engine.features]]
  title = "Vulkan and DirectX 12"
  body = "One universal HLSL codebase compiled to both SPIR-V and DXIL, from the same shaders."

[[engine.features]]
  title = "Oceans, clouds and fog"
  body = "Tessendorf FFT ocean in compute, Nubis-style volumetric clouds, froxel volumetric fog with temporal reprojection."

[[record]]
  org = "BeamNG"
  role = "Graphics / Engine Programmer"
  years = "2025 — Present"
  current = true

[[record]]
  org = "AMD"
  role = "MTS Developer Technology Engineer"
  years = "2022 — 2024"
  note = "Embedded with studios across the UK and Europe, profiling and rewriting their GPU pipelines. Returnal, The Callisto Protocol and Suicide Squad were among them."

[[record]]
  org = "Codemasters (EA)"
  role = "Senior Graphics Programmer"
  years = "2020 — 2022"
  note = "Shipped Dirt 5 across six platforms, from Stadia to Xbox Series X."

[[record]]
  org = "Sony Interactive Entertainment"
  role = "Generalist Programmer"
  years = "2016 — 2019"
  note = "Environmental-analysis AI and the debug tooling behind an unreleased PSVR title."

[podcast]
  title = "Conversations with people worth listening to"
  lead = "I sit down with the brightest minds I can find across cutting-edge industries and ask the questions I actually want answered. Pilot episodes are live."
+++
