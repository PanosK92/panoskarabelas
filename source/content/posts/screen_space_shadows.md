---
date: 2020-07-05
title: Screen space shadows
---

After working on [Spartan](https://github.com/PanosK92/SpartanEngine) game engine for so long, it became 
increasingly obvious that there is a variety of interesting things that I could be writting about.
However, I kept postponing it as I was growing fond of [Hugo](https://gohugo.io/) and didn't want to invest
any content (or money) on Wordpress anymore. The good thing is that I've finally found the courage to transition
to this slick and fast site you're browsing now !

I wanted to start with something simple and short, yet have some immediate results we can enjoy.
You know, the kind of instant gratification you get by watching a [Bob Ross](https://www.youtube.com/watch?v=l141Y0x8om0) episode, a method which
I believe to be one of the most efficient forms of communication. So let's explore something, that with a 
little bit of effort, might give us just that, screen space shadows :smile:

## Screenshots

Here is a wild west motorcycle (courtesy of [Matija Švaco](https://sketchfab.com/3d-models/wild-west-motorcycle-6038a0b13fbe434f901af27fec8391ab)) without any shadows.
{{< figure src="/media/post_sss_active_nothing.png" alt="image" caption="No shadows" class="center" >}}

If we enable shadow mapping, we can introduce some nice large-scale detail.
{{< figure src="/media/post_sss_active_sm.png" alt="image" caption="Shadow mapping" class="center" >}}

If we enable screen space shadows, we can introduce some nice small-scalle detail.
{{< figure src="/media/post_sss_active_sss.png" alt="image" caption="Screen space shadows" class="center" >}}

If we enable both, we can get the best of both worlds.
{{< figure src="/media/post_sss_active_sm_sss.png" alt="image" caption="Shadow mapping + Screen space shadows" class="center" >}}

Let's have a look at a side by side comparison.
{{< figure src="/media/post_sss_comparison.png" alt="image" caption="Shadow mapping without and with screen space shadows" class="center" >}}

## Observations

Loss of small-scale detail when doing shadow mapping is a typical problem, especially with lights that aim to cover a 
large portion of the scene (like directional lights). As we've observed, screen space shadows can help, quite effectively.
Before we explore our approach in further detail, let's see what happens in most of the games we enjoy:

- The player is allowed to keep increasing the shadow resolution. It's costly but it works and it's the most common case.
- The player sees lights with very high shadow resolution, during key moments like character close-ups. This approach doesn't
suffer from typical screen space issues but it does involve the cost of manually tweaking lights, per scene.
- The player gets the extra treatment that is screen space shadows. In some cases the shadows are aided by information from other
render passes, which helps alleviate some screen space issues even further.

An example of some good looking screen space shadows from Remedy Entertainment.
{{< figure src="/media/post_sss_quantum_break.png" alt="image" caption="Screen space shadows in Quantum Break" class="center" >}}
{{< figure src="/media/post_sss_control.png" alt="image" caption="Screen space shadows in Control" class="center" >}}

## The algorithm
The question we have to answer is if the pixel is covered by a shadow or not.
To answer this we start moving from the pixel to the light.
We move in steps, in each step, we ask the light (sample it's depth map), can you see the pixel (is your and the pixel's depth equal) ?
If the answer is no, we know the pixel is shadowed. Below you will find an HLSL example:
```
static const uint  g_sss_steps            = 8;
static const float g_sss_tolerance        = 0.01f;
static const float g_sss_ray_max_distance = 0.05f;

float ScreenSpaceShadows(Surface surface, Light light)
{
    // Compute ray
    float3 ray_pos = mul(float4(surface.position, 1.0f), g_view).xyz;
    float3 ray_dir = mul(float4(-light.direction, 0.0f), g_view).xyz;
	
    // Compute ray step
    float step_length = g_sss_ray_max_distance / (float)g_sss_steps;
    float3 ray_step   = ray_dir * step_length;
	
    // Ray march towards the light
    float occlusion = 0.0;
    float2 ray_uv   = 0.0f;
    for (uint i = 0; i < g_sss_steps; i++)
    {
        // Step ray
        ray_pos += ray_step;
        ray_uv  = project_uv(ray_pos, g_projection);

        // Compare depth
        float depth_z     = get_linear_depth(ray_uv);
        float depth_delta = ray_pos.z - depth_z;
        
        // Occlusion test
        if (abs(g_sss_tolerance - depth_delta) < g_sss_tolerance)
        {
            occlusion = 1.0f;
            break;
        }
    }

    // Fade when out of screen
    occlusion *= screen_fade(ray_uv);
    
    return 1.0f - occlusion;
}
```

## Performance
Like with many effects, we can just increase the step count, get good looking results, accept the performance hit and call it a day.
Afterall, who has time to trade banding (resulting from a low sample count) for noise, blur it to only then be able to use it, right ?
I totally understand and I would like to mention that if you have a TAA implementation in your project, you can do the following:

Choose a noise function and add a temporal factor to it.
I based mine on [Jorge Jimenez's](http://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare)
interleaved gradient noise function as it works particulary well with TAA.
```
float interleaved_gradient_noise(float2 position_screen)
{
    position_screen += g_frame * any(g_taa_jitter_offset); // temporal factor
    float3 magic = float3(0.06711056f, 0.00583715f, 52.9829189f);
    return frac(magic.z * frac(dot(position_screen, magic.xy)));
}
```
And then, in our original algorithm, just before we start ray marching, we offset the position.
```
// Offset starting position with temporal interleaved gradient noise
float offset = interleaved_gradient_noise(g_resolution * surface.uv);
ray_pos      += ray_step * offset;
```
Using only 8 samples, the improvements can be drastic :smile:
{{< figure src="/media/post_sss_noise.png" alt="image" caption="Using noise which can be nicely resolved by TAA" class="center" >}}

## That's it
If you have an thoughts, don't hesitate to reach out to me via the comment section or [Twitter](https://twitter.com/panoskarabelas1)