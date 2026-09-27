# Фотографии / Photos

Real job-site photos, resized to a 1400px long edge and re-encoded as
progressive JPEG (~60–370KB each) — see `src/data/gallery.js` for the
`{ id, category, image, title, width, material, description }` entry that
points at each file.

## Adding another piece

1. Drop the photo into this folder — portrait or landscape both work; the
   gallery card crops to 4:3 with `object-cover`.
2. Resize it first so the site stays fast. From the project root:
   ```bash
   python3 - <<'PY'
   from PIL import Image, ImageOps
   im = Image.open("path/to/photo.jpg")
   im = ImageOps.exif_transpose(im).convert("RGB")
   w, h = im.size
   scale = 1400 / max(w, h)
   if scale < 1:
       im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
   im.save("public/gallery/NN-name.jpg", "JPEG", quality=82, optimize=True, progressive=True)
   PY
   ```
3. Add the matching entry to `galleryItems` in `src/data/gallery.js` — `width`
   is the piece's real width in millimetres if you have it (it's printed on
   the card as a dimension line); `category` must be one of the ids in
   `categories` in the same file.
