# panoskarabelas.com

Personal site for [Panos Karabelas](https://panoskarabelas.com/).

Built with Hugo Extended 0.164.0. Custom layouts and styling live in `layouts/` and `assets/`; Hermit-V2 remains the fallback theme. GitHub Pages serves the generated files in the repository root.

## Edit and preview

1. Open a terminal in `source/`.
2. Run `run.bat` to preview at http://localhost:1313/.
3. Edit Markdown and front matter under `content/`.

The homepage content, featured scenes, and shipped titles are in `content/_index.md`. Career details live in `content/projects.md`; engine specifications live in `content/engine.md`.

## Design and behavior

- `assets/scss/_tokens.scss`: shared colors, typography, and spacing.
- `assets/scss/_portfolio.scss`: editorial homepage, gallery, and shared visual refinements.
- `assets/js/site.js`: navigation, scene switching, image viewer, video facades, and code copying. No JavaScript dependencies.
- Images are generated as responsive WebP assets by Hugo. Fonts are hosted locally. Videos load their player only after a click.
- Engine gallery images open in a native dialog, with arrow-key navigation and Escape to close. Without JavaScript, the images remain ordinary links.
- Reduced-motion preferences are respected; content remains readable without JavaScript.

## Publish

1. Run `build.bat` from `source/` to generate the site into the repository root.
2. Commit the source changes and generated files, then push `master`.

The Hugo executable is included as `hugo_extended_0.164.0.exe`.

## Native port pages

The ports are a section of their own: `/ports/` (`content/ports/_index.md`, `layouts/ports/list.html`) lists every port and is the link the native launchers open. The main menu has a Ports entry, and the homepage shows the same cards through `layouts/_partials/native-ports.html`, which ranges over the section's pages by `weight`. The old `/projects/sega-gt-online/` and `/projects/dino-crisis-2/` addresses are kept as aliases.

Sega GT Online lives at `/ports/sega-gt-online/`. The reusable page layout is `layouts/native-port/single.html`; its styles are in `assets/scss/_native-ports.scss`. The game's descriptions, feature groups, FAQ and release state live in `content/ports/sega-gt-online/index.md`.

A feature can carry before/after sliders: `comparisons` (each with `title`, `before`, `after`, `caption` and optional `beforeLabel`/`afterLabel`, default "Upgrades off"/"Upgrades on") plus `comparisonEyebrow`, `comparisonTitle`, `comparisonIntro` and `comparisonNote`. The page nav links to the first such feature, labelled by the page's `comparisonNav`. Sliders use the page's `--port-aspect`.

To enable a public download, fill the `[release]` `url`, `version`, `size` and `sha256` fields, and update `note` to describe that release. An empty URL shows the coming-soon state. Update the development snapshot and recent work when releasing a new build. Do not label an unfinished feature as restored.

Images under `assets/media/ports/sega-gt-online/` are actual screenshots from the native build, captured on 4 October 2026. They retain the capture's native 640×360 dimensions; they are not AI-generated or enlarged. The original game's assets belong to their respective owners. Hugo generates responsive assets and the social preview image from these originals.

For another port, create a bundle under `content/ports/` with `type = "native-port"`, a `weight` for its position and equivalent front matter. The layout takes the cover lines, original platform and publisher from that page; the category and cards pick it up automatically.

Dino Crisis 2 uses the same layout at `/ports/dino-crisis-2/`. Its content describes the SourceNext PC reference, 4:3 framing, prepared AI artwork, character upgrades and the current opening-gameplay milestone. Its screenshots come from the native project's existing verification captures and retain their 960×720 dimensions. Its comparisons are the port's own outputs: `compare-title-original.png` is the disc's 320×240 title image from `--export-images`, enlarged 4× with nearest-neighbour filtering, against the pack's 1280×960 file; the Dylan and Regina pairs are the 960×720 `--verify-models` captures (`*_original_*` / `*_enhanced_*`). Release/setup/development copy and card tags are per-project front matter; do not carry Sega GT's renderer, disc requirements or wheel support into another port.

## Bug reporting

Both native-port pages include a shared bug-report form. With JavaScript it posts JSON to FormSubmit's AJAX endpoint for `panosconroe@hotmail.com`, without opening a mail app or leaving the page. Each email contains the game, canonical page, summary, build, optional reporter email/hardware and reproduction details. FormSubmit sets Reply-To from the optional email field. It requires one-time recipient activation from the confirmation email; before activation forwarding is not guaranteed. Submit one clearly labelled setup report and confirm the inbox link, then verify receipt of a report from the deployed site. AJAX localhost testing can be restricted by the relay.

The UI locks duplicate submissions while a request is pending, times out after 20 seconds, announces results accessibly and clears the draft only after a successful response. Failure preserves the draft and offers direct email. A honeypot supplements provider spam filtering. No email passwords or SMTP credentials are stored in the site. Without JavaScript, the form submits through FormSubmit's hosted flow. Do not add logs or attachments containing private data; the current form sends only the visitor's explicit text fields.

### Renderer comparisons

Sega GT Online's rendering section includes showroom and grid comparisons made by
`--profile-graphics <directory> --profile-scene 0|1 --profile-only baseline`.
The executable creates hidden SDL windows and captures the renderer output without
desktop input. Both sides use the same frame sequence, scene and settings except
`graphics_upgrades` (the master controlled by Ctrl+G). Capture settings: Direct3D 12,
16:9, 3× scene resolution, SDR, temporal upscaler off; saved output is 640×360.
Source PNGs are unretouched; responsive copies use WebP quality 95. These are
native off/on comparisons, not captures from Xbox hardware. Replace both images
of a pair together when updating the renderer. Motion blur and HDR need motion
and a compatible display to assess; still SDR images do not demonstrate them.
