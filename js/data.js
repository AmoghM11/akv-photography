/* AKV Photography - site content.
   The page links out to nothing but the studio's own social profiles.
   Photographs are loaded from the studio's image CDN.

   REPLACE THE PLACEHOLDER PHONE / EMAIL IN AKV.contact BEFORE GOING LIVE. */

const IMG  = (file, w) => `https://image.wedmegood.com/resized/${w || 800}X/uploads/member/210942/${file}`;
const PROJ = (id, file, w) => `https://image.wedmegood.com/resized/${w || 800}X/uploads/project/${id}/${file}`;

const AKV = {

  brand: {
    name: 'AKV Photography',
    initials: 'AKV',
    tagline: 'Crafting stories through visuals',
    founder: 'Anil Kumar Venkatesh',
    city: 'Bangalore',
    since: 2012
  },

  contact: {
    // TODO - swap these for the studio's real published number and inbox.
    phone: '+91 00000 00000',
    phoneHref: 'tel:+910000000000',
    whatsappHref: 'https://wa.me/910000000000',
    email: 'hello@akvphotography.in',
    addressLine1: '#41, 1st Floor, Opposite GR Heights',
    addressLine2: 'BDA 80ft Road, JP Nagar 8th Phase',
    addressLine3: 'Bangalore 560076, Karnataka',
    mapHref: 'https://maps.google.com/?q=12.864,77.5812',
    hours: 'Open daily until 8:00 pm',
    instagram: 'https://www.instagram.com/a.k.vphotography/',
    facebook: 'https://www.facebook.com/AkvPhotography/'
  },

  hero: {
    eyebrow: 'Wedding &amp; Lifestyle Photography &middot; Bangalore',
    titleA: 'The tiny details',
    titleItalic: 'hold',
    titleB: 'the best memories.',
    body: 'AKV Photography has been photographing weddings across Bangalore and beyond since 2012 - candid, unhurried, quietly precise. Led by Anil Kumar Venkatesh, the studio captures the moments most people miss and returns them to you as a story you can hold.',
    stats: [
      { value: '4.9', label: 'Average client rating' },
      { value: '39', label: 'Five-star reviews' },
      { value: '14', label: 'Years behind the lens' }
    ],
    /* the hero panel advances through these, frame by frame */
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
    { value: 14, decimals: 0, suffix: '', label: 'Years photographing weddings', note: 'Studio founded in 2012 in JP Nagar, Bangalore.' },
    { value: 4.9, decimals: 1, suffix: '', label: 'Average rating across 39 reviews', note: 'Every published review is a five-star.' },
    { value: 100, decimals: 0, suffix: '%', label: 'Of couples recommend the studio', note: 'Fourteen years of weddings, and not one regret on record.' }
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

  services: [
    { icon: 'candid', title: 'Candid Photography', body: 'Unposed, unhurried coverage of the moments happening between the moments - the ones nobody thought to ask for.' },
    { icon: 'ritual', title: 'Traditional Photography', body: 'Every ritual, every family portrait, every elder in frame. Composed with care and shot with respect for the ceremony.' },
    { icon: 'film', title: 'Wedding Films', body: 'Cinematography and traditional videography - teasers, highlight films and full-length ceremony coverage in 4K.' },
    { icon: 'couple', title: 'Pre-Wedding Shoots', body: 'Location shoots built around your story, from Rs 20,000 per day. Teaser, highlight film and candid stills included.' },
    { icon: 'bloom', title: 'Maternity &amp; Lifestyle', body: 'Maternity, newborn, portfolio and fashion shoots - the same eye for light, at a much quieter scale.' },
    { icon: 'album', title: 'Albums &amp; Prints', body: 'Hand-sequenced albums from Rs 15,000 per 40 pages, designed so the story reads the way the day actually felt.' }
  ],

  weddings: [
    {
      couple: 'James &amp; Supriya',
      place: 'Bangalore',
      story: 'Through late-night talks, spontaneous adventures, and everyday moments in between, their love grew stronger and deeper. Today, surrounded by family and friends, they celebrate not just a wedding - but a partnership built on trust, friendship, and unwavering love.',
      image: PROJ(321481, '1771246459_DSC01597.jpg', 1000)
    },
    {
      couple: 'Gajalakshmi &amp; Santhosh',
      place: 'Bangalore',
      story: 'They met in the quiet in-between moments of busy lives - two hearts learning the rhythm of each other, one smile at a time. Through distance, deadlines, and doubts, their love stayed steady: soft when the world felt loud, strong when life felt heavy.',
      image: PROJ(321470, '1771236134_DSC04318.jpg', 1000)
    },
    {
      couple: 'Deeksha &amp; Jatin',
      place: 'Bangalore &middot; Engagement',
      story: 'An engagement shot the way an engagement should be - loud with family, quiet in the corners, and photographed from both at once.',
      image: PROJ(321473, '1771240325_MPM05280.jpg', 1000)
    },
    {
      couple: 'Dr Esha &amp; Dr Sanjay',
      place: 'Bangalore',
      story: 'Two doctors, one very short window between shifts, and a wedding day that needed to be captured without ever getting in its own way.',
      image: IMG('1771252527_AKV_4001_Edit.jpg', 1000)
    },
    {
      couple: 'Shravanthi &amp; Sandeep',
      place: 'Bangalore &middot; Engagement',
      story: 'A pre-wedding story shot across Bangalore - not a journey to a city, but a chapter where two hearts wandered through it together.',
      image: IMG('wed-shravanthi-sandeep.jpg')
    }
  ],

  testimonials: [
    { name: 'Kruthika R', meta: 'Wedding &middot; Bangalore',
      quote: 'We are highly satisfied with the professionalism and artistic excellence of Anil sir. His keen attention to detail, communication skills and refined artistic approach are much appreciated. Every photo is a work of art.' },
    { name: 'Gajalakshmi Rajendran', meta: 'Wedding &middot; Bangalore',
      quote: 'From the very first conversation to the final delivery of our pictures, the entire photography team was nothing short of exceptional. Professional, punctual, creative, detail-oriented, and incredibly organized.' },
    { name: 'Renu Verma', meta: 'Wedding &middot; Bangalore',
      quote: 'The team was professional, easy to work with, and captured every moment beautifully without being intrusive. The photos came out natural, vibrant, and full of emotion.' },
    { name: 'Tejas Sanketi', meta: 'Wedding &middot; Bangalore',
      quote: 'A wonderful team of creative and energetic photographers, with a penchant for aesthetics in album making. Loved the way our wedding moments were captured and the end result is truly amazing.' },
    { name: 'Nabanita Chanda', meta: 'Wedding &middot; Bangalore',
      quote: 'The candid shots are beautiful and exactly like I had always envisioned my wedding photos to be. The shots are classy and none of it look like we were posing. The wedding album is very tastefully done.' },
    { name: 'Sowrabha Jayatheertha', meta: 'Wedding &middot; Bangalore',
      quote: 'We were on a tight budget and started searching for good photographers online. That is when we came across Mr. Anil. Boy, were we lucky. He was very professional from the very start.' },
    { name: 'Mohan Kumar', meta: 'Wedding &middot; Bangalore',
      quote: 'Going above and beyond, he is the man you need behind the lens. Professional, commitment, delivery - customers happy. Thank you for making my marriage a lifetime memory.' },
    { name: 'Sumit M', meta: 'Maternity shoot &middot; Bangalore',
      quote: 'Amazing work done. I had a maternity photoshoot and the quality of work done by Anil is amazing - he is very professional and has some serious skills.' }
  ],

  packages: [
    { name: 'Pre-Wedding Shoot', price: '20,000', unit: 'per day', featured: false,
      items: ['Candid and traditional stills', 'Teaser and highlight film', 'Location scouting', 'Colour-graded delivery'] },
    { name: 'Photo Package', price: '30,000', unit: 'per day', featured: false,
      items: ['Candid photography', 'Traditional photography', 'Full ceremony coverage', 'Four-week delivery'] },
    { name: 'Photo + Video', price: '60,000', unit: 'per day', featured: true,
      items: ['Candid and traditional photography', 'Cinematography and videography', 'Teaser and highlight film', 'Drone and live streaming on request'] },
    { name: 'Albums', price: '15,000', unit: 'per 40 pages', featured: false,
      items: ['Hand-sequenced spreads', 'Print-grade retouching', 'Premium binding', 'Designed alongside your film'] }
  ],

  packageNotes: [
    'Multi-day: Rs 80,000 for a 2-day wedding and reception, Rs 1,20,000 for a 3-day package including the pre-wedding shoot.',
    'Up to 25% advance confirms the date. Net banking, cash and mobile wallets accepted.',
    'Outstation travel and stay are borne by the client. We travel for destination weddings.',
    'Standard delivery is four weeks. Cancellations must be notified 15 days in advance.'
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
  ]
};
