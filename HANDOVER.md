# AKV Photography — client asset handover

Everything the studio still owes, and exactly where each piece goes.

The logo and the photographs are in. What is left is typed into the
`SETUP` block at the top of `js/data.js`, marked `CLIENT HANDOVER`.

```js
const SETUP = {
  photoDir: 'assets/photos/',
  logo: 'assets/brand/logo-row.svg',        // done
  logoLight: 'assets/brand/logo-light.svg', // done
  founderPhoto: '',           // Anil's portrait, still to come
  formAction: '',             // the Google Form endpoint
  formFields: { … }           // its entry.XXXX ids
};
```

---

## 1. The logo — done (Oct 2026)

The studio sent its logo on Google Drive. The vector PDF in that folder
was converted to SVG, so it stays sharp at any size:

| File | Where it is used |
|---|---|
| `assets/brand/logo-row.svg` | The nav: the camera mark beside AKV PHOTOGRAPHY |
| `assets/brand/logo-light.svg` | The dark footer: the full logo with its tagline, in light ink |
| `assets/brand/mark.svg` | The About card, holding Anil's portrait slot |
| `assets/favicon.svg`, `assets/apple-touch-icon.png` | Browser tab and phone home-screen icon |

They are set in `SETUP.logo` / `SETUP.logoLight` in `js/data.js`
(`logoHeight` for the nav, `logoFooterHeight` for the footer). The
yellow `DP.jpg` and the Google Forms header in the same folder are for
social profiles and the form, not the site.

---

## 2. The photographs

Every photograph on the site is now the studio's own, from their Drive
albums. The old WedMeGood images are gone completely: hero, film strip,
page headers, the Traditional archive, the couples and the maternity
stand-ins.

**How a couple works** (`js/data.js` → `couples`, `js/albums.js`):

- Every couple is on the **Stories** page; wedding days are also on
  **Weddings**. Each story shows its introduction, the album's opening
  frames, and a **View full gallery** button that opens the whole album
  in a sheet over the same page (the phone's back button closes it, and
  `stories.html#<slug>/gallery` links straight to it).
- A gallery always runs in this order, set by `parts` in `js/albums.js`:
  **opening frames** (venue, decor) → **individual portraits** (bride,
  then groom) → **the wedding or engagement** → **the couple together**.
  No text is set between photographs.
- A couple with no `album` shows blank frames and no gallery button.
  Today that is Dr Esha & Dr Sanjay, Deeksha & Jatin and
  Shravanthi & Sandeep.
- A couple with several occasions keeps them in one story and one
  folder (`assets/photos/james-and-supriya/{engagement,wedding,prewedding}/`).
  Their `parts` name each occasion (`engagement`, `wedding`) in place of
  a single `event`. The Drive's `._` files are macOS clutter; the
  processing tool skips them.

**To add a couple's photographs:**

1. Download their Drive folder and run `tools/process_albums.py` over it
   (it writes 640 / 1080 / full-size WebP into `assets/photos/<album>/`).
2. Look through the frames and put them in the order above, then add the
   album to `js/albums.js` with its four `parts` counts.
3. Set `album:` (and `cover:`, the stem of the frame on the home-page
   card) on the couple in `js/data.js`. The page, the gallery and the
   Traditional archive all pick it up.

**Still missing:** maternity and lifestyle photographs (that section is
text only for now), and a portrait of Anil for the About page
(`SETUP.founderPhoto`).

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
