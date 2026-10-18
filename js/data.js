/* AKV Photography - site content, shared by every page.

   SOURCES (extracted 12 Sep 2026 - all copy below is drawn from the
   studio's own listings, not invented):
     Instagram    https://www.instagram.com/a.k.vphotography/
     WedMeGood    https://www.wedmegood.com/profile/AKV-Photography-210942
     YouTube      https://www.youtube.com/@AKVPhotography
     Justdial     https://www.justdial.com/Bangalore/AKV-Photography-...-G5A2_BZDET
     WeddingWire  https://www.weddingwire.in/wedding-photographers/akv-photography--e77368

   PHOTOGRAPHY: every image is still pulled from the studio's WedMeGood
   library. When the high-resolution originals arrive, put them in
   assets/photos/ and flip SETUP.photos to 'local' - see HANDOVER.md.

   EMAIL is deliberately absent until the studio confirms the public inbox. */

/* ===================================================================
   CLIENT HANDOVER — the one block to edit when the studio sends its
   own logo, photographs and enquiry form. Every page reads from here,
   so none of the HTML has to be touched. See HANDOVER.md.
   =================================================================== */
const SETUP = {

  /* --- PHOTOGRAPHS -------------------------------------------------
     'wedmegood' streams from the studio's directory library (today).
     'local'     serves this repo's own assets/photos/ folder.
     Drop the studio's files into assets/photos/ keeping the filenames
     listed in HANDOVER.md, flip this to 'local', and every page on the
     site follows. Nothing else changes. */
  photos: 'wedmegood',
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
  logo: '',
  logoLight: '',
  logoMark: '',
  logoHeight: 34,

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

/* Photographs resolve through SETUP — the studio's library today, this
   repo's own folder the moment the originals land. */
const IMG = (file, w) => (SETUP.photos === 'local'
  ? SETUP.photoDir + file
  : `https://image.wedmegood.com/resized/${w || 800}X/uploads/member/210942/${file}`);

const PROJ = (id, file, w) => (SETUP.photos === 'local'
  ? SETUP.photoDir + file
  : `https://image.wedmegood.com/resized/${w || 800}X/uploads/project/${id}/${file}`);

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
    { file: 'films.html',       label: 'Weddings' },
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
    /* the hero panel advances through these, frame by frame - unchanged */
    slides: [
      { src: IMG('1771252263_DSC07531.jpg', 1400), alt: 'A bride photographed in soft daylight by AKV Photography' },
      { src: IMG('1771252717_AKV_2704.jpg', 1400), alt: 'A couple during their wedding portraits' },
      { src: IMG('1771250831_MPM08318_Edit.jpg', 1400), alt: 'A candid moment during a Bangalore wedding ceremony' },
      { src: IMG('1771408299_1000216873.jpg', 1400), alt: 'Bridal detail photographed close up' }
    ]
  },

  craft: {
    shuffle: [
      IMG('1771252263_DSC07531.jpg'),
      IMG('1771252717_AKV_2704.jpg'),
      IMG('1771250831_MPM08318_Edit.jpg'),
      IMG('1771408299_1000216873.jpg')
    ]
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
      image: IMG('1771249911_MPM01417_Edit.jpg', 1400)
    },
    {
      step: '02',
      title: 'We shoot without interrupting',
      body: 'Candid and traditional, side by side. Our team moves quietly through the muhurtham, the mehendi, the reception - never blocking a ritual, never staging a moment that was already happening. Drone, live streaming and photobooth on request.',
      image: IMG('1771247516_Reception__322_.jpg', 1400)
    },
    {
      step: '03',
      title: 'We deliver in four weeks',
      body: 'Colour-graded photographs, candid and traditional films, and hand-sequenced albums. Standard delivery is four weeks from the last event day - and you will not have to chase us for it.',
      image: IMG('1771252990_AKV_9270_Edit.jpg', 1400)
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
     The couples. Engagements and pre-wedding stories live on Stories,
     wedding days on Weddings. An entry with `album` is served from the
     studio's own originals (js/albums.js), in story order and in
     chapters; `cover` is then the index of the frame on its card.
     --------------------------------------------------------------- */
  couples: [
    {
      slug: 'gajalakshmi-santhosh',
      couple: 'Gajalakshmi &amp; Santhosh',
      plain: 'Gajalakshmi and Santhosh',
      place: 'Bangalore',
      kind: 'Wedding',
      page: 'films',
      story: 'They met in the quiet in-between moments of busy lives - two hearts learning the rhythm of each other, one smile at a time. What started as small conversations grew into late-night confessions and shared dreams. Through distance, deadlines and doubts, their love stayed steady: soft when the world felt loud, strong when life felt heavy.',
      /* the studio's own album - 111 frames, from the morning setup
         to the reception, in the order the day happened */
      album: 'gajalakshmi-and-santhosh',
      cover: 65
    },
    {
      slug: 'james-supriya',
      couple: 'James &amp; Supriya',
      plain: 'James and Supriya',
      place: 'Bangalore',
      kind: 'Wedding',
      page: 'films',
      story: 'Through late-night talks, spontaneous adventures, and everyday moments in between, their love grew stronger and deeper. Surrounded by family and friends, they celebrated not just a wedding - but a partnership built on trust, friendship, and unwavering love.',
      project: 321481,
      cover: '1771246459_DSC01597.jpg',
      photos: [
        '1771246459_DSC01597.jpg', '1771246461_DSC01262.jpg', '1771246461_DSC01310.jpg', '1771246461_DSC01528.jpg',
        '1771246461_DSC01822.jpg', '1771246461_DSC01924.jpg', '1771246461_DSC02020.jpg',
        '1771246462_DSC01214.jpg', '1771246462_DSC01279.jpg', '1771246462_DSC01298.jpg',
        '1771246462_DSC01454.jpg', '1771246462_DSC01497.jpg', '1771246462_DSC01672.jpg',
        '1771246462_DSC01718.jpg', '1771246462_DSC01798.jpg', '1771246490_DSC01526.jpg',
        '1771246491_DSC01433.jpg', '1771246491_DSC01452.jpg', '1771246491_DSC01613.jpg',
        '1771246491_DSC01648.jpg', '1771246491_DSC01809.jpg', '1771246491_DSC01890.jpg'
      ]
    },
    {
      slug: 'esha-sanjay',
      couple: 'Dr Esha &amp; Dr Sanjay',
      plain: 'Dr Esha and Dr Sanjay',
      place: 'Bangalore',
      kind: 'Wedding',
      page: 'films',
      story: 'Two healers found their forever in each other. Their wedding was a blend of calm strength and quiet romance - where steady hands that save lives learned to hold on to love. From soft smiles during the vows to teary glances shared between rituals, every moment felt intentional, and the families wrapped the whole day in pride.',
      project: 321418,
      cover: '1771063863_0A4A3603.jpg',
      photos: [
        '1771063367_0A4A1667.jpg', '1771063367_0A4A1887.jpg', '1771063368_0A4A1659.jpg',
        '1771063368_0A4A1707.jpg', '1771063368_0A4A1716.jpg', '1771063368_0A4A1873.jpg',
        '1771063641_0A4A2631.jpg', '1771063643_0A4A2096.jpg', '1771063644_0A4A1950.jpg',
        '1771063644_0A4A2160.jpg', '1771063644_0A4A2179.jpg', '1771063644_0A4A2205.jpg',
        '1771063784_0A4A2827.jpg', '1771063785_0A4A2763.jpg', '1771063785_0A4A2798.jpg',
        '1771063786_0A4A2832.jpg', '1771063786_0A4A2846.jpg', '1771063863_0A4A3437.jpg',
        '1771063863_0A4A3603.jpg', '1771063864_0A4A3535.jpg'
      ]
    },
    {
      slug: 'james-supriya-engagement',
      couple: 'James &amp; Supriya',
      plain: 'James and Supriya',
      place: 'Bangalore',
      kind: 'Engagement',
      page: 'stories',
      /* written from the album itself - the order of the afternoon as it was shot */
      story: 'The afternoon they made it official - a garden, an arch of white flowers and both families close by. The portraits came first, while the light was soft; then the rings, the garlands and the cake, and the last frames as the evening came in.',
      album: 'james-and-supriya-engagement',
      cover: 29
    },
    {
      slug: 'deeksha-jatin',
      couple: 'Deeksha &amp; Jatin',
      plain: 'Deeksha and Jatin',
      place: 'Bangalore',
      kind: 'Engagement',
      page: 'stories',
      story: 'An engagement shot the way an engagement should be - loud with family, quiet in the corners, and photographed from both at once. The rings, the reactions, and the half-second before everybody remembered there was a camera in the room.',
      project: 321473,
      cover: '1771240325_MPM05280.jpg',
      photos: [
        '1771240127_MPM05376.jpg', '1771240133_MPM04174.jpg', '1771240137_MPM03973.jpg',
        '1771240138_MPM03996.jpg', '1771240138_MPM04076.jpg', '1771240140_MPM04431.jpg',
        '1771240141_MPM03442.jpg', '1771240141_MPM05362.jpg', '1771240142_MPM05152.jpg',
        '1771240142_MPM05266.jpg', '1771240323_MPM04339.jpg', '1771240323_MPM04364.jpg',
        '1771240324_MPM05395.jpg', '1771240325_MPM04155.jpg', '1771240325_MPM04345.jpg',
        '1771240325_MPM05242.jpg', '1771240325_MPM05280.jpg', '1771240326_MPM04191.jpg',
        '1771240326_MPM04310.jpg', '1771240326_MPM05193.jpg', '1771240326_MPM05350.jpg'
      ]
    },
    {
      slug: 'shravanthi-sandeep',
      couple: 'Shravanthi &amp; Sandeep',
      plain: 'Shravanthi and Sandeep',
      place: 'Bangalore',
      kind: 'Engagement',
      page: 'stories',
      story: 'A story shot across Bangalore - not a journey to a city, but a chapter where two hearts wandered through it together. Shot as stills and as film, so the engagement had both a photograph to frame and a teaser to send the family.',
      project: 231989,
      cover: '1673850138_S_S__296_.jpg',
      /* their beegara oota, cut by the studio - the one couple on this
         site whose album has a film to sit beside it */
      film: 'ubYCcLVG9N8',
      filmLabel: 'Beegara oota, cut in 4K',
      photos: [
        '1673849303_S_S__7_.jpg', '1673849306_S_S__22_.jpg', '1673849306_S_S__9_.jpg',
        '1673849307_S_S__32_.jpg', '1673849309_S_S__27_.jpg', '1673849311_S_S__16_.jpg',
        '1673849311_S_S__28_.jpg', '1673849904_S_S__104_.jpg', '1673849904_S_S__21_.jpg',
        '1673849904_S_S__91_.jpg', '1673849905_S_S__102_.jpg', '1673849906_S_S__101_.jpg',
        '1673849906_S_S__65_.jpg', '1673850134_S_S__293_.jpg', '1673850135_S_S__306_.jpg',
        '1673850136_S_S__285_.jpg', '1673850136_S_S__287_.jpg', '1673850137_S_S__301_.jpg',
        '1673850137_S_S__304_.jpg', '1673850138_S_S__296_.jpg', '1673850140_S_S__274_.jpg',
        '1673850278_S_S__164_.jpg', '1673850278_S_S__203_.jpg', '1673850278_S_S__206_.jpg',
        '1673850292_S_S__275_.jpg', '1673850396_S_S__85_.jpg'
      ]
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

  /* 150 photographs from the studio's portfolio.
     tag: w wedding | r reception | c couples and portraits | m candid moments */
  gallery: [
    ['1771252263_DSC07531.jpg','m'], ['1771243885_DSC01279.jpg','m'], ['1771248764_DSC01535.jpg','m'],
    ['1771408139_1000228082.jpg','m'], ['1771408223_1000228098.jpg','m'], ['1771408464_1000216865.jpg','m'],
    ['1771252717_AKV_2704.jpg','c'], ['1771252991_AKV_9323.jpg','c'], ['1771408065_1000113676.jpg','m'],
    ['1771252718_AKV_2171.jpg','c'], ['1771408262_1000228072.jpg','m'], ['1771250831_MPM08318_Edit.jpg','m'],
    ['1771250831_MPM08046.jpg','m'], ['1771408426_1000216855.jpg','m'], ['1771252717_AKV_2193.jpg','c'],
    ['1771249911_MPM09490.jpg','m'], ['1771252992_AKV_9408.jpg','c'], ['1771247880_DSC04881.jpg','m'],
    ['1771250830_DSC06468.jpg','m'], ['1771252718_AKV_2747.jpg','c'], ['1771243885_DSC02314.jpg','m'],
    ['1771408299_1000216873.jpg','m'], ['1771249910_DSC01221.jpg','m'], ['1771252718_AKV_2658.jpg','c'],
    ['1771252990_AKV_9270_Edit.jpg','c'], ['1771246905_0A4A3597.jpg','m'], ['1771249910_DSC05967.jpg','m'],
    ['1771408182_1000227348.jpg','m'], ['1771408379_1000113664.jpg','m'], ['1771252527_AKV_4001_Edit.jpg','c'],
    ['1771252433_AKV_0434.jpg','c'], ['1771252264_DSC07917.jpg','m'], ['1771250829_DSC03408.jpg','m'],
    ['1771249909_DSC02893.jpg','m'], ['1771248764_DSC00511.jpg','m'], ['1771252433_AKV_0684.jpg','c'],
    ['1771252264_DSC08022.jpg','m'], ['1771250829_DSC04105.jpg','m'], ['1771249911_MPM01504.jpg','m'],
    ['1771247804_AKV_4355.jpg','c'], ['1771252434_AKV_0817.jpg','c'], ['1771250831_MPM08285_Edit.jpg','m'],
    ['1771250829_DSC02770.jpg','m'], ['1771249911_MPM01417_Edit.jpg','m'], ['1771247774_AKV_4293_2.jpg','c'],
    ['1771252263_DSC07550.jpg','m'], ['1771250830_DSC06440_Edit.jpg','m'], ['1771249911_MPM09365.jpg','m'],
    ['1771249912_MPM01304.jpg','m'], ['1771247516_Reception__322_.jpg','r'], ['1771408493_1000209337.jpg','m'],
    ['1771250830_DSC07170_Edit.jpg','m'], ['1771252991_AKV_9207.jpg','c'], ['1771249912_MPM09918.jpg','m'],
    ['1771247465_Reception__71_.jpg','r'], ['1771252263_DSC07777.jpg','m'], ['1771250830_DSC07225_Edit.jpg','m'],
    ['1771249909_DSC03118.jpg','m'], ['1771249911_DSC00648.jpg','m'], ['1771247312_0A4A2900.jpg','m'],
    ['1771247250_0A4A7861.jpg','m'], ['1771244412_DSC00571.jpg','m'], ['1771243749_MPM04076.jpg','m'],
    ['1771073897_SK_03311.jpg','m'], ['1771073609_Reception__14_.jpg','r'], ['1771247203_0A4A6414.jpg','m'],
    ['1771244244_DSC09005.jpg','m'], ['1771074192_SPV_4428.jpg','m'], ['1771073815_0A4A9148.jpg','m'],
    ['1771073451_0A4A1093.jpg','m'], ['1771247188_0A4A6402.jpg','m'], ['1771244244_DSC09129.jpg','m'],
    ['1771244244_DSC09021.jpg','m'], ['1771073764_0A4A8329.jpg','m'], ['1771073144_AKV_9604.jpg','c'],
    ['1771247070_0A4A7007_wedding.jpg','w'], ['1771243885_0A4A7483.jpg','m'], ['1771244412_DSC00443.jpg','m'],
    ['1771073725_0A4A8059.jpg','m'], ['1771073085_0A4A2358.jpg','m'], ['1771246837_0A4A1735.jpg','m'],
    ['1771072148_Wedding__16_.jpg','w'], ['1771073992_SK_03836.jpg','m'], ['1771073694_0A4A7935.jpg','m'],
    ['1771074048_SPV_3755.jpg','m'], ['1771243956_DSC01718.jpg','m'], ['1771243748_MPM04174.jpg','m'],
    ['1771073898_SK_03466.jpg','m'], ['1771073634_Reception__16_.jpg','r'], ['1771073085_0A4A2384.jpg','m'],
    ['1771073085_0A4A2363.jpg','m'], ['1771072512_AKV_2182.jpg','c'], ['1771072370_Wedding__167_.1.jpg','w'],
    ['1771071967_0B7A9461.jpg','m'], ['1771070936_DSC04737.jpg','m'], ['1771073047_0A4A2369.jpg','m'],
    ['1771072512_AKV_2453.jpg','c'], ['1771072290_Wedding__87_.jpg','w'], ['1771071920_Muhurtham__125_.2.jpg','w'],
    ['1771070606_DSC00213.jpg','m'], ['1771243749_MPM03973.jpg','m'], ['1771072467_AKV_1598.jpg','c'],
    ['1771072223_Wedding__19_.6.jpg','w'], ['1771071872_Reception__19_.jpg','r'], ['1771070522_DSC01220_Edit.jpg','m'],
    ['1771073008_0A4A1657.jpg','m'], ['1771072468_AKV_1542.jpg','c'], ['1771072086_Reception__22_.7.jpg','r'],
    ['1771071839_Reception__10_.jpg','r'], ['1771070416_AKV_4474.jpg','c'], ['1771072814_AKV_5950.jpg','c'],
    ['1771072422_AKV_1158.jpg','c'], ['1771072063_Reception__11_.jpg','r'], ['1771071154_Reception__55_.jpg','r'],
    ['1771070372_AKV_4596.jpg','c'], ['1771072512_AKV_2270.jpg','c'], ['1771072422_AKV_1112.jpg','c'],
    ['1771072064_Reception__21_.jpg','r'], ['1771071101_Reception__196_.jpg','r'], ['1771070343_AKV_4671.jpg','c'],
    ['1771070277_AKV_9494.jpg','c'], ['1771069698_MPM03350.jpg','m'], ['1771068885_DSC01328_Edit.jpg','m'],
    ['1771067709_DSC04306.jpg','m'], ['1771066883_MPM08254_Edit.jpg','m'], ['1771071065_Reception__44_.jpg','r'],
    ['1771069372_DSC04388.jpg','m'], ['1771068549_DSC05600.jpg','m'], ['1771067600_DSC04685.jpg','m'],
    ['1771066798_DSC04074.jpg','m'], ['1771068833_DSC05477.jpg','m'], ['1771069194_DSC09534.jpg','m'],
    ['1771068372_DSC04263.jpg','m'], ['1771067470_DSC04756.jpg','m'], ['1771066696_DSC03985.jpg','m'],
    ['1771069986_MPM05242.jpg','m'], ['1771069003_DSC09871.jpg','m'], ['1771068258_DSC03415.jpg','m'],
    ['1771067275_AKV_4936.jpg','c'], ['1771066696_DSC03974.jpg','m'], ['1771069807_MPM05266.jpg','m'],
    ['1771068944_DSC01599.jpg','m'], ['1771068135_DSC04252.jpg','m'], ['1771067217_DSC09714.jpg','m'],
    ['1771065829_MPM07217_Edit.jpg','m'], ['1771067968_DSC01310.jpg','m'], ['1771068906_DSC01386.jpg','m'],
    ['1771067944_DSC01535.jpg','m'], ['1771067109_wedding__84_.jpg','w'], ['1771065355_DSC01888_Edit.jpg','m']
  ],

  galleryFilters: [
    { key: 'all', label: 'Everything' },
    { key: 'w', label: 'Weddings' },
    { key: 'r', label: 'Receptions' },
    { key: 'c', label: 'Couples &amp; Portraits' },
    { key: 'm', label: 'Candid Moments' }
  ],

  /* Frames used where a section is still waiting on its own set of
     photographs. Captioned neutrally so nothing is claimed that the
     frame does not show. */
  archiveFrames: [
    IMG('1771252718_AKV_2171.jpg'), IMG('1771408299_1000216873.jpg'),
    IMG('1771252991_AKV_9323.jpg'), IMG('1771408065_1000113676.jpg'),
    IMG('1771252433_AKV_0434.jpg'), IMG('1771408182_1000227348.jpg'),
    IMG('1771252434_AKV_0817.jpg'), IMG('1771408426_1000216855.jpg')
  ]
};

/* Albums from the studio's originals: the frames come from js/albums.js */
AKV.couples.forEach((c) => {
  if (!c.album) return;
  c.album = ALBUMS[c.album];
  c.photos = c.album.frames;
});
