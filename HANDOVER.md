# AKV Photography — client asset handover

Everything the studio still owes, and exactly where each piece goes.

All three items are wired already. Nothing here needs a developer to
re-architect anything — each one is a value typed into **one block** at
the top of `js/data.js`, marked `CLIENT HANDOVER`.

```js
const SETUP = {
  photos: 'wedmegood',        // -> 'local' once the originals land
  photoDir: 'assets/photos/',
  logo: '',                   // the studio's lockup
  logoLight: '',              // the reversed one, for the dark footer
  logoMark: '',               // a bare mark, if there is no lockup
  logoHeight: 34,
  formAction: '',             // the Google Form endpoint
  formFields: { … }           // its entry.XXXX ids
};
```

---

## 1. The logo

**Ask the client for:**

| File | Why it is needed |
|---|---|
| **Horizontal lockup, dark** | The nav and the top of the footer sit on pale paper. |
| **Horizontal lockup, reversed (white/light)** | The footer background is near-black. A dark-only logo disappears there. This is the one that usually gets forgotten. |
| **Square mark on its own** | The favicon, and the nav on narrow phones. |
| Brand colours as hex codes | Only so we can check they do not fight the brass/paper palette. |

Format: **SVG preferred.** Otherwise PNG at 1024px or larger with a
transparent background — not a JPEG, and not a screenshot of a logo.

**Where it goes:**

```js
logo:      'assets/logo.svg',
logoLight: 'assets/logo-reversed.svg',
```

That is the whole job. The nav brand, the mobile menu and the footer all
swap themselves over — no HTML is touched. If only a square mark exists,
set `logoMark` instead and the typeset "AKV Photography" stays beside it.

Two files still to replace by hand once the logo exists:
`assets/favicon.svg`, and the `og:image` meta tag at the top of each of
the five pages (that is the picture that appears when the link is shared
on WhatsApp).

---

## 2. The photographs

**Full checklist:** `assets/photos/MANIFEST.txt` — every photograph the
site asks for, grouped by section, with the exact filename it looks for.
**309 in total**, but most of that is the 150-frame archive gallery; the
sections that actually need attention are much smaller:

| Section | Count | Shape |
|---|---|---|
| Home hero slides | 4 | Portrait-ish, one strong subject each |
| Home shuffle card | 4 | Any |
| Page header bands (4 pages × 4) | 16 | Landscape |
| Couple albums | 5 albums, 20–30 each | Portrait 3:4 |
| Maternity / lifestyle | 8 | Any — **currently placeholders** |
| Archive gallery | 150 | Mixed |
| **Anil's portrait (About)** | 1 | Portrait 4:5, ≥900px — **currently absent** |

A portrait of Anil goes in through `SETUP.founderPhoto` rather than the
manifest, since it is the one photograph with no filename to match:

```js
founderPhoto: 'assets/photos/anil.jpg',
```

It drops in above his name on the About page; no markup changes.

**Specification to send the client:**

- Longest edge **2500px**
- **JPEG, quality 85**
- **sRGB colour profile** — not Adobe RGB, which desaturates in browsers
- Keep the filenames from the manifest, or send a mapping

**Where it goes:**

1. Drop the files into `assets/photos/`
2. Set `photos: 'local'` in `js/data.js`
3. Reload — every page follows

> **Before going live:** the site currently streams images from the
> WedMeGood CDN, which resizes them on demand. A local folder has no such
> service, so once the originals are in, generate the 400/800/1600px
> variants rather than serving 2500px files to phones. The home page
> alone loads about 50 images.

**Two genuine gaps:**

1. The maternity and lifestyle set on the Stories page is standing in
   with frames from the wedding archive, and the page says so. Those 8
   need real maternity photographs.
2. **There is no photograph of Anil.** The one that used to sit on his
   About card was a bride from the wedding archive, which read as
   though it were him, so it has been removed. The card shows his name
   and role until a real portrait arrives. None of the studio's
   listings carry one — WedMeGood's own profile picture for AKV is a
   bride photograph, not the founder.

---

## 3. The enquiry form

The site keeps its own form — same look, same fields — and posts the
answers straight into the studio's Google Sheet. **The visitor never
leaves the site**, which an embedded Google Form or an outbound link
would both cost us.

**Ask the client to:**

1. Build the Google Form with these questions, in this order:

   | Question | Type |
   |---|---|
   | Your name | Short answer |
   | Phone | Short answer |
   | Email | Short answer |
   | Event date | **Short answer** — not the Date type |
   | What are we shooting? | Short answer |
   | Anything else we should know? | Paragraph |

   *Event date must be Short answer.* Google's Date question splits into
   three separate fields and will not accept a single value.

2. Open the form → **⋮ menu → Get pre-filled link**
3. Type each question's own name into its box (type `name` into the name
   box, `phone` into the phone box, and so on)
4. **Get link → Copy link** and send us that URL

**Where it goes:** the copied link contains every id we need.

```
…/viewform?entry.1234567=name&entry.7654321=phone&…
```

```js
formAction: 'https://docs.google.com/forms/d/e/<FORM_ID>/formResponse',
formFields: {
  name:    'entry.1234567',
  phone:   'entry.7654321',
  email:   'entry.1111111',
  date:    'entry.2222222',
  type:    'entry.3333333',
  message: 'entry.4444444'
}
```

Note the endpoint ends in **`/formResponse`**, not `/viewform`.

**Until that arrives**, the form validates as normal but does not pretend
to send: it tells the visitor to call or WhatsApp the studio, with both
links live. It no longer accepts an enquiry and silently discards it,
which is what it did before.

---

## Still outstanding from the studio

- [ ] **A public email address.** There is none on the site anywhere. The
      address in their WedMeGood record is an account login, not a
      published inbox, so it has deliberately not been used.
- [ ] **Confirm both phone numbers** — +91 95383 13749 and
      +91 98030 60906, taken from their own WedMeGood listing.
- [ ] **Confirm the postal code.** Three of their listings disagree:
      Justdial says 560076, WeddingWire 560078, WedMeGood 560083. All
      three map to the same point. The site uses **560076**, matching
      Justdial and their original website.

---

## Albums from the studio's originals (Oct 2026)

The studio shared full-resolution albums on Google Drive. These are now
served from this repo, not WedMeGood:

| Album | Frames | Page |
|---|---|---|
| Gajalakshmi & Santhosh — wedding & reception | 111 | Weddings |
| James & Supriya — engagement | 46 | Stories |

- Files: `assets/photos/<album>/NNN-<original>-{640,1080,full}.webp`
  (640/1080 wide for the grid, 2400px long edge for the lightbox, sRGB,
  metadata stripped — about 55 KB / 125 KB / 500 KB each).
- Order: the order the day happened (camera capture time), split into
  chapters. Both live in `js/albums.js`; a couple entry in `js/data.js`
  points at it with `album:` and picks its card photo with `cover:`.
- Layout: these albums keep every photograph's own shape (no cropping),
  in justified rows that read left to right, with a chapter title between
  scenes.
- To add the next batch: download the Drive folder, run `tools/process_albums.py`
  over it (it sorts by capture time and writes the three sizes),
  set the chapters, and add the album to `js/albums.js`.
