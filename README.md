# HollowTube

A sleek, filter list generator for YouTube. Pick the UI elements you want to hide — sidebar sections, homepage content, search button styling, mix playlists, and more — then copy the generated filter rules straight into [uBlock Origin](https://ublockorigin.com/).

## Why This Exists

There are tons of YouTube "declutter" extensions on the Chrome Web Store or whatever. The problem? YouTube updates its UI **constantly**, and most of those extensions are abandoned or can't be maintained — selectors break, and you're left hunting for yet another replacement.(i think i tried probably every YouTube extension out there xd :sob: )

HollowTube takes a different approach. Instead of relying on a third-party extension to chase YouTube's changes, it generates filter rules for **uBlock Origin** — something you likely already have installed or have to. And when YouTube inevitably changes something? Just right-click the element, hit **"Block element"**, grab the new selector, and update your list. No waiting on a developer to push a fix, no broken extension sitting in your toolbar — you're in full control.

## Usage

1. Open [HollowTube](https://enxov.github.io/hollowtube) in your browser.
2. **Create mode** (default) — check the elements you want hidden.
3. Click the output panel at the bottom to expand it, then hit the copy button.
4. Paste the filters into **uBlock Origin → My filters**.
5. To manage existing filters later, switch to **Delete & Update** mode, paste your current list, and delete or update as needed.

## Contributing

Contributions are welcome! To add a new blockable element:

1. Add an entry to the `ELEMENTS` array in `elements.js` with `id`, `label`, `filters`, and `matchers`.
2. The UI picks it up automatically — no HTML changes needed.

## License

This project is licensed under the [MIT License](LICENSE).
