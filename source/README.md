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
