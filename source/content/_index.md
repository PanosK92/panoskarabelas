+++
title = "Panos Karabelas"

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
