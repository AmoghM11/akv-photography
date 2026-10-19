/* AKV Photography - site content, shared by every page.

   SOURCES (extracted 12 Sep 2026 - all copy below is drawn from the
   studio's own listings, not invented):
     Instagram    https://www.instagram.com/a.k.vphotography/
     WedMeGood    https://www.wedmegood.com/profile/AKV-Photography-210942
     YouTube      https://www.youtube.com/@AKVPhotography
     Justdial     https://www.justdial.com/Bangalore/AKV-Photography-...-G5A2_BZDET
     WeddingWire  https://www.weddingwire.in/wedding-photographers/akv-photography--e77368

   PHOTOGRAPHY: every photograph on the site comes from the studio's own
   albums (js/albums.js), served from assets/photos/. Nothing is pulled
   from the directory listings any more. A couple with no album yet
   shows blank frames until theirs arrives - see HANDOVER.md.

   EMAIL is deliberately absent until the studio confirms the public inbox. */

/* ===================================================================
   CLIENT HANDOVER — the one block to edit when the studio sends its
   own logo, photographs and enquiry form. Every page reads from here,
   so none of the HTML has to be touched. See HANDOVER.md.
   =================================================================== */
const SETUP = {

  /* --- PHOTOGRAPHS -------------------------------------------------
     Where the album folders live. Each album is a folder of WebP files
     made by tools/process_albums.py, listed in js/albums.js. */
  photoDir: 'assets/photos/',

  /* --- LOGO --------------------------------------------------------
     Leave both blank to keep the drawn aperture mark that is there now.
     Fill them in and the nav, the mobile menu and the footer all swap
     to the real logo on their own.
       logo      - the dark lockup (mark + name) for the pale nav
       logoLight - the reversed lockup for the ink-dark footer
       logoMark  - a square mark on its own, if there is no lockup:
                   it replaces only the drawn aperture and the typeset
                   "AKV Photography" beside it stays
     One file is enough. Whatever is missing falls back to what is set,
     and with all three blank the drawn aperture simply stays. */
  /* the studio's own logo (Oct 2026), drawn from their vector PDF:
     the mark beside the wordmark for the nav, the full stacked logo
     with its tagline, reversed, for the dark footer */
  logo: 'assets/brand/logo-row.svg',
  logoLight: 'assets/brand/logo-light.svg',
  logoMark: '',
  logoHeight: 38,
  logoFooterHeight: 104,

  /* --- FOUNDER PORTRAIT --------------------------------------------
     A photograph of Anil for the About page. Blank leaves the card as
     a name and a line of text, which is how it stands today - the
     picture that used to sit there was a bride from the wedding
     archive, not him. Portrait crop, 4:5, at least 900px wide. */
  founderPhoto: '',

  /* --- ENQUIRY FORM ------------------------------------------------
     The site keeps its own form; the responses land in the studio's
     Google Sheet and the visitor never leaves the page.
     To wire it up: open the Google Form, "Get pre-filled link", fill
     each field with its own name, copy the link, and read the
     entry.XXXXXXX id sitting against each answer.
       formAction — the form URL with /viewform swapped for /formResponse
       formFields — the entry id for each question, e.g. 'entry.1234567'
     Leave any question the form does not ask as an empty string.
     While formAction is blank the form does not pretend to send: it
     asks the visitor to call or WhatsApp instead. */
  formAction: '',
  formFields: {
    name: '',
    phone: '',
    email: '',
    date: '',
    type: '',
    message: ''
  }
};

/* One photograph from an album folder, by its file stem: 640 or 1080
   wide, or 'full' (2400px on the long edge). G and J name the two
   albums the studio has sent so far. */
const PHOTO = (album, stem, w) => SETUP.photoDir + album + '/' + stem + '-' + (w || 1080) + '.webp';
const G = (stem, w) => PHOTO('gajalakshmi-and-santhosh', stem, w);
const J = (stem, w) => PHOTO('james-and-supriya/engagement', stem, w);

/* The studio's own albums (js/albums.js), served from this repo as
   WebP: 640 and 1080 wide for the grid, 2400px on the long edge for
   the lightbox. A frame is [stem, width, height]. Phones get the 1080
   in the lightbox too — it already fills their screen. */
const ALBUM_SRC = (a, f, w) => a.dir + f[0] + '-' + w + '.webp';
const ALBUM_SRCSET = (a, f) => ALBUM_SRC(a, f, 640) + ' 640w, ' + ALBUM_SRC(a, f, 1080) + ' 1080w';
const ALBUM_FULL = (a, f) => ((window.innerWidth * (window.devicePixelRatio || 1)) <= 1200
  ? ALBUM_SRC(a, f, 1080)
  : a.dir + f[0] + '-full.webp');

const FILM = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
/* the studio's older uploads predate maxres stills */
const FILM_HQ = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const WATCH = (id) => `https://www.youtube.com/watch?v=${id}`;

const AKV = {

  brand: {
    name: 'AKV Photography',
    initials: 'AKV',
    /* the studio's own words, from their Instagram bio */
    tagline: 'Crafting stories through visuals',
    promise: 'Premium wedding photography services. 600+ weddings covered since 2012.',
    founder: 'Anil Kumar Venkatesh',
    city: 'Bangalore',
    since: 2012
  },

  contact: {
    /* both numbers are published by the studio on their WedMeGood vendor record */
    phone: '+91 95383 13749',
    phoneHref: 'tel:+919538313749',
    phone2: '+91 98030 60906',
    phone2Href: 'tel:+919803060906',
    whatsappHref: 'https://wa.me/919803060906',
    addressLine1: '#41, 1st Floor, Opposite GR Heights',
    addressLine2: 'BDA 80ft Road, JP Nagar 8th Phase',
    addressLine3: 'Bangalore 560076, Karnataka',
    mapHref: 'https://www.google.com/maps?q=12.864011039950778,77.58119136082155',
    hours: 'Open daily from 9:00 am',
    instagram: 'https://www.instagram.com/a.k.vphotography/',
    facebook: 'https://www.facebook.com/AkvPhotography/',
    youtube: 'https://www.youtube.com/@AKVPhotography'
  },

  /* ---------------------------------------------------------------
     The studio's own channels. The wedding directories were used to
     gather this content, but they are not linked from the site -
     nothing here sends a visitor to a competitor's listing.
     --------------------------------------------------------------- */
  social: [
    { icon: 'instagram',  label: 'Instagram',   handle: '@a.k.vphotography',
      href: 'https://www.instagram.com/a.k.vphotography/' },
    { icon: 'youtube',    label: 'YouTube',     handle: '@AKVPhotography',
      href: 'https://www.youtube.com/@AKVPhotography' },
    { icon: 'facebook',   label: 'Facebook',    handle: 'AkvPhotography',
      href: 'https://www.facebook.com/AkvPhotography/' },
    { icon: 'whatsapp',   label: 'WhatsApp',    handle: 'Message the studio',
      href: 'https://wa.me/919803060906' }
  ],

  /* Short labels only. The long names live in each page's <title> and
     <h1>, where they do the search work; the nav has to fit a logo. */
  nav: [
    { file: 'index.html',       label: 'Home' },
    { file: 'stories.html',     label: 'Stories' },
    { file: 'films.html',       label: 'Pre-Wedding' },
    { file: 'traditional.html', label: 'Traditional' },
    { file: 'about.html',       label: 'About' }
  ],

  hero: {
    eyebrow: 'Wedding &amp; Lifestyle Photography &middot; Bangalore',
    titleA: 'The tiny details',
    titleItalic: 'hold',
    titleB: 'the best memories.',
    body: 'AKV Photography has been photographing weddings across Bangalore and beyond since 2012 - candid, unhurried, quietly precise. Led by Anil Kumar Venkatesh, the studio captures the moments most people miss and returns them to you as a story you can hold.',
    stats: [
      { value: '600+', label: 'Weddings covered' },
      { value: '14', label: 'Years behind the lens' },
      { value: '4.9', label: 'Average client rating' }
    ],
    /* the hero panel advances through these, frame by frame */
    slides: [
      { src: G('065-dsc04306'), alt: 'Gajalakshmi and Santhosh laughing together in the garden on their wedding day' },
      { src: G('090-dsc04694'), alt: 'Gajalakshmi in her red reception lehenga, photographed under string lights' },
      { src: J('006-0a4a6959'), alt: 'James and Supriya on the afternoon of their engagement' },
      { src: G('083-dsc04661'), alt: 'Gajalakshmi and Santhosh photographed at night before their reception' }
    ]
  },

  craft: {
    shuffle: [
      G('071-dsc04383'),
      J('015-0a4a7281'),
      G('081-dsc04631'),
      G('044-dsc03416')
    ]
  },

  /* the film strip on the home page */
  strip: [
    G('001-dsc02782', 640), G('039-dsc03377', 640), G('065-dsc04306', 640), G('086-dsc04678', 640),
    J('005-0a4a6952', 640), G('047-dsc03598', 640), G('071-dsc04383', 640), J('021-0a4a7609', 640),
    G('098-dsc04802', 640), G('108-dsc05009', 640), J('034-0a4a7928', 640), G('044-dsc03416', 640),
    G('063-dsc04278', 640), J('029-0a4a7814', 640), G('081-dsc04631', 640), G('019-dsc02934', 640),
    J('011-0a4a7069', 640), G('093-dsc04706', 640)
  ],

  /* the four frames under each page title: <div data-band="stories"> */
  bands: {
    stories: [J('008-0a4a6994', 640), G('070-dsc04378', 640), J('022-0a4a7640', 640), G('073-dsc04391', 640)],
    films: [G('039-dsc03377', 640), G('037-dsc03303', 640), G('045-dsc03424', 640), G('048-dsc04083', 640)],
    traditional: [G('025-dsc03078', 640), G('038-dsc03305', 640), G('041-dsc03397', 640), G('026-dsc03087', 640)],
    about: [G('001-dsc02782', 640), J('001-0a4a6928', 640), G('005-dsc02858', 640), G('018-dsc02899', 640)]
  },

  pillars: [
    { value: 600, decimals: 0, suffix: '+', label: 'Weddings covered since 2012', note: 'The studio&rsquo;s own count, and still climbing.' },
    { value: 14, decimals: 0, suffix: '', label: 'Years photographing weddings', note: 'Founded in 2012 in JP Nagar, Bangalore.' },
    { value: 100, decimals: 0, suffix: '%', label: 'Of couples recommend the studio', note: 'Every published review is a five-star.' }
  ],

  process: [
    {
      step: '01',
      title: 'We talk first',
      body: 'Before a single frame - dates, venues, families, the rituals that matter most and the ones you would rather we photograph from a distance. Anil personally builds a shoot storyline for the event, so nothing is improvised on the day.',
      image: G('002-dsc02787')
    },
    {
      step: '02',
      title: 'We shoot without interrupting',
      body: 'Candid and traditional, side by side. Our team moves quietly through the muhurtham, the mehendi, the reception - never blocking a ritual, never staging a moment that was already happening. Drone, live streaming and photobooth on request.',
      image: G('038-dsc03305')
    },
    {
      step: '03',
      title: 'We deliver in four weeks',
      body: 'Colour-graded photographs, candid and traditional films, and hand-sequenced albums. Standard delivery is four weeks from the last event day - and you will not have to chase us for it.',
      image: G('092-dsc04704')
    }
  ],

  /* the full service list the studio publishes across its listings */
  services: [
    { icon: 'candid', title: 'Candid Photography', body: 'Unposed, unhurried coverage of the moments happening between the moments - the ones nobody thought to ask for.', href: 'traditional.html' },
    { icon: 'ritual', title: 'Traditional Photography', body: 'Every ritual, every family portrait, every elder in frame. Composed with care and shot with respect for the ceremony.', href: 'traditional.html' },
    { icon: 'film', title: 'Cinematography', body: 'Cinematic wedding films in 4K - teasers within days, highlight films that hold the shape of the day.', href: 'films.html' },
    { icon: 'reel', title: 'Traditional Videography', body: 'Full-length, uncut coverage of the muhurtham and every ritual, for the family who want the ceremony exactly as it happened.', href: 'films.html' },
    { icon: 'couple', title: 'Pre-Wedding Shoots', body: 'Location shoots built around your story, scouted in advance. Teaser, highlight film and candid stills included.', href: 'stories.html' },
    { icon: 'bloom', title: 'Maternity &amp; Lifestyle', body: 'Maternity, newborn, baby shower, naming ceremony, portrait and fashion shoots - the same eye for light, at a quieter scale.', href: 'stories.html' },
    { icon: 'album', title: 'Albums &amp; Prints', body: 'Hand-sequenced albums, designed so the story reads the way the day actually felt.', href: 'about.html' },
    { icon: 'booth', title: 'Photobooth', body: 'A photobooth for the reception, so the guests leave with something in their hands the same evening.', href: 'about.html' },
    { icon: 'live', title: 'Live Streaming', body: 'The ceremony streamed in real time for the family who could not travel - a service the studio has been running for years.', href: 'films.html' }
  ],

  /* occasions the studio covers, published across Justdial and WeddingWire
     and borne out by their own film archive */
  occasions: [
    'Wedding &amp; muhurtham', 'Engagement', 'Reception', 'Mehendi &amp; haldi',
    'Sangeet', 'Pre-wedding shoots', 'Beegara oota', 'Naming ceremony',
    'Baby shower', 'First birthday', 'Threading ceremony', 'House warming',
    'Maternity &amp; newborn', 'Portfolio &amp; fashion', 'Parties', 'Corporate events'
  ],

  /* ---------------------------------------------------------------
     The couples. Every one of them is on the Stories page, in this
     order; the wedding days (page: 'films') are on Weddings too.
       story  - the introduction, shown beside the couple's name
       day    - optional second paragraph, what the album itself shows
       quote  - optional words from the couple, verbatim from a review
       album  - the key of their album in js/albums.js. Without one the
                couple shows blank frames until the photographs arrive.
       cover  - the file stem of the frame on their home-page card
     --------------------------------------------------------------- */
  couples: [
    {
      slug: 'gajalakshmi-santhosh',
      couple: 'Gajalakshmi &amp; Santhosh',
      plain: 'Gajalakshmi and Santhosh',
      place: 'Bangalore',
      kind: 'Wedding',
      page: 'films',
      date: '5 September 2025',
      story: 'They met in the quiet in-between moments of busy lives - two hearts learning the rhythm of each other, one smile at a time. What started as small conversations grew into late-night confessions and shared dreams. Through distance, deadlines and doubts, their love stayed steady: soft when the world felt loud, strong when life felt heavy.',
      /* written from the album itself */
      day: 'The day began early in a garden venue - a brass Ganesha at the gate, a hand-painted Kalyanam board and a white mandap hung with jasmine and red roses. The muhurtham followed with both families close around it. By evening the two of them had changed into red and grey for portraits under the string lights, and the night ended on a reception stage of white flowers.',
      quote: { text: 'From the very first conversation to the final delivery of our pictures, the entire photography team was nothing short of exceptional.', by: 'Gajalakshmi Rajendran' },
      album: 'gajalakshmi-and-santhosh',
      cover: '066-dsc04317'
    },
    {
      slug: 'james-supriya',
      couple: 'James &amp; Supriya',
      plain: 'James and Supriya',
      place: 'Bangalore',
      /* one story for all three occasions the studio shot for them */
      kind: 'Engagement, Wedding &amp; Pre-wedding',
      page: 'films',
      date: '28 &amp; 29 August 2025',
      story: 'Through late-night talks, spontaneous adventures, and everyday moments in between, their love grew stronger and deeper. They made it official on an afternoon in a garden, under an arch of white flowers with both families close by, and were married the next morning in an old stone temple. Then came a shoot of their own by the sea - just the two of them.',
      album: 'james-and-supriya',
      cover: 'wedding/008-dsc01340'
    },
    {
      slug: 'esha-sanjay',
      couple: 'Dr Esha &amp; Dr Sanjay',
      plain: 'Dr Esha and Dr Sanjay',
      place: 'Bangalore',
      kind: 'Wedding',
      page: 'films',
      story: 'Two healers found their forever in each other. Their wedding was a blend of calm strength and quiet romance - where steady hands that save lives learned to hold on to love. From soft smiles during the vows to teary glances shared between rituals, every moment felt intentional, and the families wrapped the whole day in pride.'
    },
    {
      slug: 'deeksha-jatin',
      couple: 'Deeksha &amp; Jatin',
      plain: 'Deeksha and Jatin',
      place: 'Bangalore',
      kind: 'Engagement',
      page: 'stories',
      story: 'An engagement shot the way an engagement should be - loud with family, quiet in the corners, and photographed from both at once. The rings, the reactions, and the half-second before everybody remembered there was a camera in the room.'
    },
    {
      slug: 'shravanthi-sandeep',
      couple: 'Shravanthi &amp; Sandeep',
      plain: 'Shravanthi and Sandeep',
      place: 'Bangalore',
      kind: 'Engagement',
      page: 'stories',
      story: 'A story shot across Bangalore - not a journey to a city, but a chapter where two hearts wandered through it together. Shot as stills and as film, so the engagement had both a photograph to frame and a teaser to send the family.',
      /* their beegara oota, cut by the studio */
      film: 'ubYCcLVG9N8',
      filmLabel: 'Beegara oota, cut in 4K'
    }
  ],

  /* ---------------------------------------------------------------
     The studio's complete YouTube archive - 33 films, every title
     taken verbatim from the channel. Nothing is embedded until a
     visitor actually presses play.
       w wedding | f reception & functions | e engagement & pre-wedding
       c family celebrations | l live streamed
     --------------------------------------------------------------- */
  films: [
    { id: 'MME7y8Jiepg', couple: 'Sparsha &amp; Rakshith',        title: 'Jain wedding story', kind: 'w' },
    { id: '8t7tJtG7Ung', couple: 'Sharan &amp; Raksha',           title: 'Wedding at V Legacy', kind: 'w' },
    { id: '3isHTtk-wP8', couple: 'Varsha &amp; Sagar',            title: 'Complete wedding story', kind: 'w' },
    { id: 'zaSzPt175ZM', couple: 'Sanjana &amp; Hemanth',         title: 'South Indian cinematic candid film', kind: 'w' },
    { id: 'yX4hivdxmzg', couple: 'Chaithanya &amp; Nityashree',   title: 'Cinematic candid wedding film', kind: 'w' },
    { id: 'Eph_W-w9h6Q', couple: 'Gautham &amp; Sushmitha',       title: 'Wedding cinematic candid film', kind: 'w' },
    { id: 'B8UZXo1s9-c', hq: true, couple: 'Alisha &amp; Ammar',            title: 'Beautiful wedding story', kind: 'w' },
    { id: 'nsFF-aAOAvc', hq: true, couple: 'Umadevi &amp; Chirag',          title: 'Wedding at BRS Grandeur', kind: 'w' },
    { id: 'CL3yfHqu7XM', couple: 'Sandhya &amp; Suresh',          title: 'Wedding candid film', kind: 'w' },
    { id: 'oNtXgtvC0qo', hq: true, couple: 'Sandhya &amp; Suresh',          title: 'Wedding candid teaser', kind: 'w' },
    { id: 'i9kll34yFHY', hq: true, couple: 'Pradeep &amp; Nayana',          title: 'Candid cinematic teaser', kind: 'w' },

    { id: 'h0yecDWDTWs', couple: 'Sharan &amp; Raksha',           title: 'Reception at V Legacy', kind: 'f' },
    { id: 'ujFPDFoJEQs', couple: 'Gautham &amp; Sushmitha',       title: 'Reception cinematic candid film', kind: 'f' },
    { id: '_NNU05h9jMQ', couple: 'Umadevi &amp; Chirag',          title: 'Reception at BRS Grandeur', kind: 'f' },
    { id: 'k89SXQl0GaY', couple: 'Sandhya &amp; Suresh',          title: 'Reception candid cinematic film', kind: 'f' },
    { id: 'VvcRdLY3D50', couple: 'Raksha &amp; Sharan',           title: 'Haldi film', kind: 'f' },
    { id: 'qW67N16TlWI', couple: 'Lakshmi',                       title: 'Haldi &amp; mehendi cinematic film', kind: 'f' },
    { id: 'PDIbVbNKykQ', couple: 'Bindu',                         title: 'Haldi &amp; mehendi ceremony', kind: 'f' },
    { id: 'ubYCcLVG9N8', couple: 'Shravanthi &amp; Sandeep',      title: 'Beegara oota candid cinematic film', kind: 'f' },

    { id: 'cU4QOKISA70', couple: 'Impana &amp; Sankeerth',        title: 'Engagement cinematic candid film', kind: 'e' },
    { id: 'ZceTJCJFLcY', couple: 'Impana &amp; Sankeerth',        title: 'Engagement cinematic teaser', kind: 'e' },
    { id: 'j-sLYSfSuTQ', couple: 'Amrutha &amp; Sharan',          title: 'Pre-wedding cinematic film', kind: 'e' },
    { id: 'oAPQmWc--O4', couple: 'Dhruvana &amp; Yashwanth',      title: 'Pre-wedding film', kind: 'e' },
    { id: 'ZcJ-BTAaj1Q', couple: 'Pooja &amp; Sachin',            title: 'Pre-wedding cinematic film', kind: 'e' },
    { id: 'd_YXMIaDsTo', couple: 'Jayashree &amp; Pavan',         title: 'Pre-wedding shoot &middot; Nee Parichaya Helade', kind: 'e' },

    { id: 'jMTD_14v0n8', couple: 'Bhanu Priya Reddy',             title: 'Baby shower cinematic candid film', kind: 'c' },
    { id: 'vHquWVGZfgQ', couple: 'Kavya',                         title: 'Baby shower cinematic candid film', kind: 'c' },
    { id: 'oTr-o_lS8r4', couple: 'Esharya',                       title: 'Naming ceremony cinematic candid film', kind: 'c' },
    { id: 'lxYkwUsGt4g', couple: 'Esharya',                       title: 'Naming ceremony teaser', kind: 'c' },
    { id: 'TUkO-YWwYo8', couple: 'Vedansh Raj',                   title: 'First birthday cinematic candid film', kind: 'c' },

    { id: '_JHkCTyE68I', couple: 'Raksha &amp; Prashanth',        title: 'Reception, streamed live', kind: 'l' },
    { id: 'RJLB-SnaeJk', couple: 'Impana &amp; Sankeerth',        title: 'Wedding ceremony, streamed live', kind: 'l' },
    { id: '2c9lExNhreg', couple: 'Impana &amp; Sankeerth',        title: 'Engagement, streamed live', kind: 'l' }
  ],

  filmFilters: [
    { key: 'all', label: 'Every film' },
    { key: 'w', label: 'Wedding Films' },
    { key: 'f', label: 'Receptions &amp; Functions' },
    { key: 'e', label: 'Engagement &amp; Pre-Wedding' },
    { key: 'c', label: 'Family Celebrations' },
    { key: 'l', label: 'Streamed Live' }
  ],

  /* what a film package actually contains */
  filmCraft: [
    { icon: 'film', title: 'Cinematic wedding film', body: 'The whole day cut as a film - the drive in, the mandap, the blessings, the send-off. Shot in 4K and graded to match the photographs frame for frame.' },
    { icon: 'candid', title: 'Teaser &amp; highlight', body: 'A one-minute teaser you can send out within days of the wedding, and a longer highlight film that holds the shape of the day.' },
    { icon: 'reel', title: 'Traditional videography', body: 'Full-length, uncut coverage of the muhurtham and every ritual, for the family members who want the ceremony exactly as it happened.' },
    { icon: 'couple', title: 'Drone &amp; aerials', body: 'Aerial coverage of the venue, the baraat and the send-off, available on request and cleared with the venue beforehand.' },
    { icon: 'live', title: 'Live streaming', body: 'The ceremony streamed in real time for the family who could not travel - weddings, engagements and receptions, all running on the studio&rsquo;s own channel.' },
    { icon: 'bloom', title: 'Function films', body: 'Haldi, mehendi, sangeet, beegara oota, reception, naming ceremonies, baby showers and first birthdays, each cut as its own short film.' }
  ],

  /* ---------------------------------------------------------------
     Reviews, verbatim, from the studio's WedMeGood and WeddingWire
     profiles. `src` marks which listing each one came from.
     --------------------------------------------------------------- */
  testimonials: [
    { name: 'Gajalakshmi Rajendran', meta: 'Wedding &middot; Bangalore',
      quote: 'From the very first conversation to the final delivery of our pictures, the entire photography team was nothing short of exceptional. Professional, punctual, creative, detail-oriented, and incredibly organized. They blended into every function so seamlessly, capturing candid emotions, raw laughter and all the little in-between moments with such authenticity and elegance.' },
    { name: 'Kruthika R', meta: 'Wedding &middot; Bangalore',
      quote: 'We are highly satisfied with the professionalism and artistic excellence of Anil sir. His keen attention to detail, communication skills and refined artistic approach are much appreciated. Every photo is a work of art that we will treasure forever.' },
    { name: 'Keerthana L', meta: 'Wedding &middot; Bangalore',
      quote: 'The photos turned out stunning - natural, vibrant, and full of life. Every shot tells a story, and looking through them feels like reliving the entire day all over again. The team was punctual, well-coordinated, and blended seamlessly with our guests while still managing to get every important moment.' },
    { name: 'Renu Verma', meta: 'Wedding &middot; Bangalore',
      quote: 'The team was professional, easy to work with, and captured every moment beautifully without being intrusive. The photos came out natural, vibrant, and full of emotion. Highly recommended for anyone looking for reliable and talented wedding photographers.' },
    { name: 'Ashwini', meta: 'Threading ceremony &middot; Bangalore',
      quote: 'Anil was very friendly and open to our ideas. When we first spoke with him he made us comfortable and gave us his view on how he will go about taking photographs of the event. The team was very punctual and arrived on time at the venue and did their best work. Their candid videography is topnotch.' },
    { name: 'Sana', meta: 'Wedding at ITC &middot; Bangalore',
      quote: 'Great experience with this team. Very patient and humble people. They are always there to hear your expectations and give their best to fulfill it. They did a great job at my wedding at ITC, Bangalore.' },
    { name: 'Jyothishwar', meta: 'Event &middot; Bangalore',
      quote: 'Thank you so much Mr. Anil and team. Your team have been so wonderful to work with throughout the whole process. We are so impressed with your professionalism and great packages.' },
    { name: 'Tejas Sanketi', meta: 'Wedding &middot; Bangalore',
      quote: 'A wonderful team of creative and energetic photographers, with a penchant for aesthetics in album making. Loved the way our wedding moments were captured and the end result is truly amazing. A must recommend for all prospective couples out there.' },
    { name: 'Navya Anjinappa', meta: 'Wedding &middot; Bangalore',
      quote: 'The quality of photos and videos they shared are really remarkable. I want to appreciate each member of this team who does not feel bored to take a hundred attempts for creating a perfect shot. Even after failure they show a smile instead of anger.' },
    { name: 'Pradeep Malnad', meta: 'Wedding &middot; Bangalore',
      quote: 'The quality of pics, video and editing is very good. Anil and team are very professional and punctual. They kept all my requirements in mind and gave me a very good memory. We will surely recommend them to anyone looking for beautiful memories for life.' },
    { name: 'Safiya', meta: 'Wedding &middot; Bangalore',
      quote: 'It was great to work with this team. Very professional, friendly, flexible, resourceful and very dedicated. Our pictures came out stunningly beautiful. We chose them on a very short notice.' },
    { name: 'Nikitha', meta: 'Wedding &middot; Bangalore',
      quote: 'I am thankful I found AKV Photography to cover our wedding. We got beautiful pictures which capture our memories for a lifetime. We informed Anil about the timings and location of the event once and it was handled.' },
    { name: 'Bindu A Gowda', meta: 'House warming &middot; Bangalore',
      quote: 'Great photographer to work with. AKV Photography was energetic, engaging, and a lot of fun. We love our house warming ceremony pictures!' },
    { name: 'Abhinaya S', meta: 'Wedding &middot; Bangalore',
      quote: 'Great photography and very professional work. The photos came out natural, sharp, and beautifully edited. Really happy with the overall experience.' },
    { name: 'Mohan Kumar', meta: 'Wedding &middot; Bangalore',
      quote: 'Anybody can come and click the photos, but this team has professional and friendly staff. Professional, commitment, delivery - customers happy. Thank you for making my marriage a lifetime memory.' },
    { name: 'Nagarjun', meta: 'Wedding &middot; Bangalore',
      quote: 'We are happy with the audio and visual work they have done for our wedding. Quality work and trustworthy. I recommend AKV for all your programs.' },
    { name: 'Sumit M', meta: 'Maternity shoot &middot; Bangalore',
      quote: 'Amazing work done. I had a maternity photoshoot and the quality of work done by Anil is amazing - he is very professional and has some serious skills.' },
    { name: 'Sowrabha Jayatheertha', meta: 'Wedding &middot; Bangalore',
      quote: 'We were on a tight budget and started searching for good photographers online. That is when we came across Mr. Anil. Boy, were we lucky. He was very professional from the very start.' }
  ],

  /* booking terms the studio publishes on WeddingWire - no rates,
     by the studio's own request */
  booking: [
    { label: 'Working since', value: '2012 - fourteen years of weddings' },
    { label: 'Outstation travel', value: 'Yes, including destination weddings' },
    { label: 'Payment accepted', value: 'Net banking, cash and mobile wallets' },
    { label: 'To hold a date', value: 'A part-advance confirms the booking' },
    { label: 'Cancellations', value: 'Please tell us at least 15 days in advance' },
    { label: 'Delivery', value: 'Four weeks from the last event day' }
  ],

  /* The archive on the Traditional page: every frame of every album,
     filled in below from js/albums.js and tagged by the part of the
     album it comes from. */
  gallery: [],

  galleryFilters: [
    { key: 'all', label: 'Everything' },
    { key: 'w', label: 'The wedding' },
    { key: 'e', label: 'The engagement' },
    { key: 'c', label: 'Portraits &amp; couples' },
    { key: 'd', label: 'Venue &amp; details' }
  ]
};

/* Albums from the studio's originals: the frames come from js/albums.js.
   A couple without an album gets an empty list, and shows blank frames. */
const GALLERY_LABELS = { w: 'Wedding', e: 'Engagement', c: 'Portrait', d: 'Venue and details' };
AKV.couples.forEach((c) => {
  c.album = c.album ? ALBUMS[c.album] : null;
  c.photos = c.album ? c.album.frames : [];
  if (!c.album) return;
  /* tag each frame by its part of the album, for the archive filters.
     The parts run in order; an album with more than one occasion names
     each one (engagement, wedding) instead of a single event. */
  const PART_TAG = { intro: 'd', portraits: 'c', couple: 'c', engagement: 'e', wedding: 'w',
    event: c.kind === 'Wedding' ? 'w' : 'e' };
  const tags = [];
  Object.keys(c.album.parts).forEach((k) => {
    for (let n = 0; n < c.album.parts[k]; n++) tags.push(PART_TAG[k] || 'c');
  });
  c.photos.forEach((f, i) => {
    const tag = tags[i] || 'c';
    AKV.gallery.push({
      thumb: ALBUM_SRC(c.album, f, 640),
      full: ALBUM_FULL(c.album, f),
      w: f[1], h: f[2],
      tag: tag,
      alt: c.plain + ', ' + GALLERY_LABELS[tag].toLowerCase() + ', photographed by AKV Photography',
      cap: c.plain + ' · ' + c.kind
    });
  });
});
