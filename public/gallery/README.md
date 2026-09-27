# Фотографии / Photos

The `.svg` files here are placeholders so the site runs before the real photos
are in place.

Facebook blocks automated downloads, so the real photos have to be saved by
hand from the company page:
https://www.facebook.com/people/Tim-ProMebel/100077423180264/?sk=photos

Steps:
1. Open each photo, right-click → "Save image as…" into this folder.
2. Name them descriptively in English, e.g. `kujna-moderna.jpg`.
3. Update the `image` paths in `src/data/gallery.js` to match.
4. Delete the placeholder `.svg` files (and `/public/hero.svg` once a real
   hero photo replaces it).

Keep photos around 1200px wide and compressed (~200–400KB) so the gallery
stays fast.
