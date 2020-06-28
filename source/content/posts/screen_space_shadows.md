---
date: 2020-06-28
title: Screen space shadows
---

## New site and actual blog posts of what I do (finally) !

I haven't posted abou this anywhere, so if you have found this,  chances are I will be working on it for a few days.
When all is done, I will announce everything on my social media, until then, have a nice day :smile:

```
float ScreenSpaceShadows(Surface surface, Light light)
{
    // Compute ray
    float3 ray_pos      = mul(float4(surface.position, 1.0f), g_view).xyz;
    float3 ray_dir      = mul(float4(-light.direction, 0.0f), g_view).xyz;
    float step_length   = g_sss_ray_max_distance / (float)g_sss_steps;
    float3 ray_step     = ray_dir * step_length;
    float2 ray_uv       = 0.0f;
    float shadow        = 1.0f;

    // Offseting with some temporal interleaved gradient noise, will capture more detail
    float offset = interleaved_gradient_noise(g_resolution * surface.uv);
    ray_pos += ray_step * offset;

    // Ray march towards the light
    float occlusion = 0.0;
    for (uint i = 0; i < g_sss_steps; i++)
    {
        // Step ray
        ray_pos += ray_step;
        ray_uv  = project_uv(ray_pos, g_projection);

        [branch]
        if (is_saturated(ray_uv))
        {
            // Compare depth
            float depth_z       = get_linear_depth(ray_uv);
            float depth_delta   = ray_pos.z - depth_z;
    
            // Occlusion test
            if (abs(g_sss_tolerance - depth_delta) < g_sss_tolerance)
            {
                occlusion = 1.0f;
                break;
            }
        }
    }

    // fade when out of screen
    occlusion *= screen_fade(ray_uv);
    
    return 1.0f - occlusion;
}
```