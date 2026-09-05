# AGENTS.md

## What this is

A single-file Tampermonkey userscript (`gemini-enhancer.user.js`) that auto-hides Gemini's sidebar. Scope is set by the `@match https://gemini.google.com/*` metadata header.

## No build, test, or lint

There is no `package.json`, npm, Node dependency, or CI. Verification is manual: install/refresh the script in Tampermonkey and visit Gemini. There is no automated way to test changes.

## Gotchas

- The script's core is brittle DOM selectors into Gemini's UI: `.sidenav-header-buttons button` is clicked to close the sidebar (`closeSidebar`), `.side-nav-menu-button button` to open it (`openSidebar`), and `.sidenav-with-history-container` is the sidebar container. Per the script's own naming, the open/close roles are inverted relative to the class names. Google changes these frequently, so a change that "doesn't work anymore" is usually a selector break, not a logic bug.
- Initialization is lazy: a `MutationObserver` polls until the sidebar container appears, then attaches listeners. Don't assume the container exists at script run time.
- The right-border style references Gemini's CSS variable `--bard-color-custom-primary-container` with a fallback color — keep the fallback.

## Conventions

- Bump `@version` in the userscript header whenever behavior changes; Tampermonkey uses it to detect updates.
- Keep everything in the single file; the README documents install only.