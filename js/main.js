/* ===========================================================
   AKV Photography — behaviour, shared by every page.
   Vanilla. No build step, no dependencies.
   Every module below looks for its own mount point and quietly
   does nothing if the current page does not have one.
   =========================================================== */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const C = AKV.contact;
  /* data.js declares SETUP with const, so it lives in the shared global
     lexical scope - not on window. Read it the same way AKV is read. */
  const CFG = (typeof SETUP !== 'undefined' && SETUP) || {};

  /* which page are we on? */
  const PAGE = (function () {
    const last = location.pathname.split('/').pop();
    return !last || last === '' ? 'index.html' : last;
  })();

  const plain = (s) => String(s).replace(/&amp;/g, 'and').replace(/&middot;/g, '-').replace(/&rsquo;/g, "'");

  /* ---------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------- */
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      revealer.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  const watchReveals = (root) => {
    $$('.reveal:not(.in)', root).forEach((el, i) => {
      el.style.transitionDelay = Math.min(i, 6) * 70 + 'ms';
      revealer.observe(el);
    });
  };

  /* frames that fade up as they arrive — galleries and couple albums */
  const frameObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      frameObserver.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -4% 0px', threshold: 0.05 });

  /* ---------------------------------------------------------
     Icons
     --------------------------------------------------------- */
  const ICONS = {
    candid: '<path d="M14.5 4h-5L8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-1.5-3Z"/><circle cx="12" cy="13" r="3.6"/>',
    ritual: '<path d="M12 2.5 14.6 8l6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 19l1.1-6L3.4 8.8 9.4 8 12 2.5Z"/>',
    film:   '<rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M2 12h20M2 8h5M2 16h5M17 8h5M17 16h5"/>',
    reel:   '<rect x="2" y="6" width="13.5" height="12" rx="2.4"/><path d="M15.5 11.2l5.1-2.9a.6.6 0 0 1 .9.52v6.36a.6.6 0 0 1-.9.52l-5.1-2.9Z"/>',
    couple: '<path d="M12 20.5s-7.2-4.4-9.1-8.5C1.2 8.3 3.4 4.8 7 4.8c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 5.8 3.5 4.1 7.2-1.9 4.1-9.1 8.5-9.1 8.5Z"/>',
    bloom:  '<path d="M12 12c0-3.4 2.4-6.2 5.4-6.2C17.4 9.2 15 12 12 12Zm0 0c0-3.4-2.4-6.2-5.4-6.2C6.6 9.2 9 12 12 12Zm0 0c3.4 0 6.2 2.4 6.2 5.4C14.8 17.4 12 15 12 12Zm0 0c-3.4 0-6.2 2.4-6.2 5.4C9.2 17.4 12 15 12 12Z"/><circle cx="12" cy="12" r="1.6"/>',
    album:  '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19a1 1 0 0 1 1 1v15.5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 18V5.5Z"/><path d="M4 18a2.5 2.5 0 0 1 2.5-2.5H20"/><path d="M9 3v9l3-2 3 2V3"/>',
    booth:  '<rect x="5.5" y="2.5" width="13" height="19" rx="1.6"/><path d="M8.5 6.6h7M8.5 11h7M8.5 15.4h7M5.5 8.8h1.6M16.9 8.8h1.6M5.5 13.2h1.6M16.9 13.2h1.6"/>',
    live:   '<circle cx="12" cy="12" r="2.5"/><path d="M8.1 8.1a5.6 5.6 0 0 0 0 7.8M15.9 8.1a5.6 5.6 0 0 1 0 7.8M5.2 5.2a9.7 9.7 0 0 0 0 13.6M18.8 5.2a9.7 9.7 0 0 1 0 13.6"/>'
  };

  /* The platforms' own marks, not drawn approximations: each is the
     official brand glyph on a 24x24 grid, a single filled path. They
     are set in currentColor so they take the surface they sit on -
     brass on paper, light on the ink footer - which is what the brand
     guidelines ask for when a mark links to that brand's own profile. */
  const SOCIAL_ICONS = {
    instagram: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
    youtube:   'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    facebook:  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    whatsapp:  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488'
  };

  /* brand marks are filled, unlike the stroked interface icons below */
  const brandSvg = (d) =>
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="' + d + '"/></svg>';

  const svg = (paths, w) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.3) +
    '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';

  /* one social link, rendered either as a labelled pill or a bare mark */
  const socialItem = (s, variant) => {
    const mark = s.icon === 'mono'
      ? '<span class="soc__mono" aria-hidden="true">' + s.mono + '</span>'
      : '<span class="soc__glyph" aria-hidden="true">' + brandSvg(SOCIAL_ICONS[s.icon]) + '</span>';

    if (variant === 'bare') {
      return '<a class="soc soc--bare" href="' + s.href + '" target="_blank" rel="noopener" ' +
             'aria-label="' + plain(s.label) + '" title="' + plain(s.label) + '">' + mark + '</a>';
    }
    return '<a class="soc" href="' + s.href + '" target="_blank" rel="noopener">' + mark +
           '<span class="soc__text"><b>' + s.label + '</b><i>' + s.handle + '</i></span></a>';
  };

  const socialHtml = (variant) => AKV.social.map((s) => socialItem(s, variant)).join('');

  /* ---------------------------------------------------------
     Nav
     --------------------------------------------------------- */
  (function nav() {
    const bar = $('#nav');
    if (!bar) return;

    const links = AKV.nav
      .map((n) => '<a href="' + n.file + '"' +
        (n.file === PAGE ? ' class="is-active" aria-current="page"' : '') +
        '>' + n.label + '</a>')
      .join('');

    const deskBox = $('#nav-links');
    if (deskBox) deskBox.innerHTML = links;

    const mmBox = $('#mm-links');
    if (mmBox) {
      mmBox.innerHTML = links +
        '<a href="' + (PAGE === 'index.html' ? '#contact' : 'index.html#contact') +
        '" class="mobilemenu__cta">Check your date</a>';
    }

    const cta = $('#nav-cta');
    if (cta) cta.href = PAGE === 'index.html' ? '#contact' : 'index.html#contact';

    const onScrollNav = () => bar.classList.toggle('is-stuck', window.scrollY > 24);
    window.addEventListener('scroll', onScrollNav, { passive: true });
    onScrollNav();

    const burger = $('#burger');
    const menu = $('#mobilemenu');
    if (!burger || !menu) return;

    const setMenu = (open) => {
      menu.hidden = !open;
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('locked', open);
    };
    burger.addEventListener('click', () => setMenu(menu.hidden));
    $$('#mobilemenu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) setMenu(false);
    });
  })();

  /* every social mount on the page */
  (function social() {
    $$('[data-social]').forEach((el) => {
      el.innerHTML = socialHtml(el.dataset.social);
    });
  })();

  /* ---------------------------------------------------------
     Brand — the drawn aperture stands in until the studio sends
     its own logo. Fill SETUP.logo (and SETUP.logoLight for the
     dark footer) and every mark on the site swaps itself over.
     No page markup changes.
     --------------------------------------------------------- */
  (function brand() {
    const S = CFG;
    if (!S.logo && !S.logoLight && !S.logoMark) return;
    const h = S.logoHeight || 34;

    const img = (src, extra) =>
      '<img src="' + src + '" alt="' + AKV.brand.name + '" ' +
      'style="height:' + h + 'px;width:auto;display:block;' + (extra || '') + '">';

    /* A full lockup carries the name, so it replaces the whole brand.
       A bare mark replaces only the aperture and leaves the name set
       in type beside it. */
    const navBox = $('.nav__brand');
    if (navBox) {
      const lockup = S.logo || S.logoLight;
      if (lockup) navBox.innerHTML = img(lockup);
      else if (S.logoMark) {
        const mark = $('.nav__mark', navBox);
        if (mark) mark.innerHTML = img(S.logoMark);
      }
    }

    /* The footer sits on ink, so it takes the reversed file if there
       is one. A logo drawn only in dark ink would vanish there. */
    const footName = $('.footer__brand .nav__name');
    const footSrc = S.logoLight || S.logo;
    if (footName && footSrc) {
      footName.outerHTML = img(footSrc, 'margin-bottom:14px;');
    }
  })();

  /* ---------------------------------------------------------
     Home hero — the signature contact sheet, unchanged.
     --------------------------------------------------------- */
  (function contactSheet() {
    const box = $('#hero-slides');
    if (!box) return;

    const eyebrow = $('#hero-eyebrow');
    const title = $('#hero-title');
    const lede = $('#hero-lede');
    const stats = $('#hero-stats');

    if (eyebrow) eyebrow.innerHTML = AKV.hero.eyebrow;
    if (title) {
      title.innerHTML =
        AKV.hero.titleA + ' <em>' + AKV.hero.titleItalic + '</em><br>' + AKV.hero.titleB;
    }
    if (lede) lede.textContent = AKV.hero.body;
    if (stats) {
      stats.innerHTML = AKV.hero.stats
        .map((s) => '<div><dt>' + s.value + '</dt><dd>' + s.label + '</dd></div>')
        .join('');
    }

    $$('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 220 + i * 120);
    });

    const slides = AKV.hero.slides;
    const HOLD = 5200;

    box.innerHTML = slides
      .map((s, i) =>
        '<img src="' + s.src + '" alt="' + s.alt + '"' +
        (i === 0 ? ' class="is-on" fetchpriority="high"' : ' loading="lazy"') +
        ' decoding="async">')
      .join('');

    const imgs = $$('img', box);
    const nEl = $('#counter-n');
    const tEl = $('#counter-t');
    const fill = $('#counter-fill');
    if (!nEl || !tEl || !fill) return;
    const pad = (n) => String(n).padStart(2, '0');

    tEl.textContent = pad(slides.length);
    let i = 0;

    if (REDUCED) { nEl.textContent = pad(1); fill.style.width = '100%'; return; }

    const advance = () => {
      imgs[i].classList.remove('is-on');
      i = (i + 1) % imgs.length;
      /* restart the ken-burns by reflowing the class */
      imgs[i].classList.remove('is-on');
      void imgs[i].offsetWidth;
      imgs[i].classList.add('is-on');
      nEl.textContent = pad(i + 1);
      fill.style.transition = 'none';
      fill.style.width = '0%';
      void fill.offsetWidth;
      fill.style.transition = 'width ' + HOLD + 'ms linear';
      fill.style.width = '100%';
    };

    nEl.textContent = pad(1);
    fill.style.transition = 'width ' + HOLD + 'ms linear';
    requestAnimationFrame(() => { fill.style.width = '100%'; });
    setInterval(advance, HOLD);
  })();

  /* ---------------------------------------------------------
     Page hero band — four frames under the page title.
     --------------------------------------------------------- */
  (function pageHeroBand() {
    $$('[data-band]').forEach((band) => {
      const files = band.dataset.band.split(',').map((s) => s.trim()).filter(Boolean);
      band.innerHTML = files
        .map((f) => '<figure><img src="' + IMG(f, 700) + '" alt="" loading="lazy" decoding="async"></figure>')
        .join('');
    });
  })();

  /* ---------------------------------------------------------
     Film strip marquee
     --------------------------------------------------------- */
  (function strip() {
    const track = $('#strip-track');
    if (!track) return;
    const picks = AKV.gallery.slice(0, 18);
    const html = picks
      .map((g) => '<img src="' + IMG(g[0], 450) + '" alt="" loading="lazy" decoding="async">')
      .join('');
    track.innerHTML = html + html; /* duplicated for a seamless loop */
  })();

  /* ---------------------------------------------------------
     Story card — stacked shuffler
     --------------------------------------------------------- */
  (function shuffle() {
    const box = $('#shuffle');
    if (!box) return;
    const srcs = AKV.craft.shuffle;
    box.innerHTML = srcs
      .map((s, i) => '<img src="' + s + '" data-pos="' + i + '" alt="" loading="lazy" decoding="async">')
      .join('');
    const imgs = $$('img', box);

    const advance = () => {
      imgs.forEach((im) => {
        const p = (parseInt(im.dataset.pos, 10) + srcs.length - 1) % srcs.length;
        im.dataset.pos = p;
      });
    };
    let timer = REDUCED ? null : setInterval(advance, 3200);
    box.addEventListener('click', () => {
      advance();
      if (timer) { clearInterval(timer); timer = setInterval(advance, 3200); }
    });
    box.setAttribute('role', 'button');
    box.setAttribute('tabindex', '0');
    box.setAttribute('aria-label', 'Show the next photograph');
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance(); }
    });
  })();

  /* ---------------------------------------------------------
     Pillars — animated counters
     --------------------------------------------------------- */
  (function pillars() {
    const wrap = $('#pillars');
    if (!wrap) return;

    wrap.innerHTML = AKV.pillars
      .map((p) =>
        '<div class="pillar reveal">' +
          '<div class="pillar__n" data-n="' + p.value + '" data-dec="' + (p.decimals || 0) +
            '" data-sfx="' + (p.suffix || '') + '">0</div>' +
          '<p class="pillar__l">' + p.label + '</p>' +
          '<p class="pillar__note">' + p.note + '</p>' +
        '</div>')
      .join('');

    const fmt = (v, dec) => (dec > 0 ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN'));

    const counter = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        counter.unobserve(el);
        const target = parseFloat(el.dataset.n);
        const dec = parseInt(el.dataset.dec, 10);
        const sfx = el.dataset.sfx;
        if (REDUCED) { el.textContent = fmt(target, dec) + sfx; return; }
        const dur = 1700;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(target * eased, dec) + (p === 1 ? sfx : '');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });

    $$('.pillar__n', wrap).forEach((el) => counter.observe(el));
  })();

  /* ---------------------------------------------------------
     Process — sticky stack with scrub (pages that carry photographs)
     --------------------------------------------------------- */
  (function process() {
    const stack = $('#stack');
    if (!stack) return;

    stack.innerHTML = AKV.process
      .map((s) =>
        '<div class="step">' +
          '<div class="step__inner">' +
            '<div class="step__media"><img src="' + s.image + '" alt="" loading="lazy" decoding="async"></div>' +
            '<div class="step__text">' +
              '<p class="step__n">Step ' + s.step + '</p>' +
              '<h3>' + s.title + '</h3>' +
              '<p>' + s.body + '</p>' +
            '</div>' +
          '</div>' +
        '</div>')
      .join('');

    if (REDUCED) return;
    const steps = $$('.step', stack);
    const inners = steps.map((s) => $('.step__inner', s));
    const TOP = 96;
    let ticking = false;

    const paint = () => {
      ticking = false;
      for (let i = 0; i < steps.length - 1; i++) {
        const next = steps[i + 1].getBoundingClientRect();
        const raw = 1 - (next.top - TOP) / Math.max(window.innerHeight * 0.8, 1);
        const p = Math.min(Math.max(raw, 0), 1);
        const el = inners[i];
        el.style.transform = 'scale(' + (1 - p * 0.07).toFixed(4) + ')';
        el.style.filter = p > 0.01 ? 'blur(' + (p * 5).toFixed(2) + 'px)' : '';
        el.style.opacity = (1 - p * 0.42).toFixed(3);
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    paint();
  })();

  /* ---------------------------------------------------------
     Process — set in type alone, for the home page
     --------------------------------------------------------- */
  (function stepsPlain() {
    const box = $('#steps');
    if (!box) return;
    box.innerHTML = AKV.process
      .map((s) =>
        '<article class="stepline reveal">' +
          '<p class="stepline__n">' + s.step + '</p>' +
          '<div class="stepline__body">' +
            '<h3>' + s.title + '</h3>' +
            '<p>' + s.body + '</p>' +
          '</div>' +
        '</article>')
      .join('');
  })();

  /* ---------------------------------------------------------
     Services / film craft — the same card, two data sets
     --------------------------------------------------------- */
  const cardsHtml = (list) => list
    .map((s) => {
      const inner =
        '<div class="svc__icon" aria-hidden="true">' + svg(ICONS[s.icon]) + '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.body + '</p>';
      return s.href
        ? '<a class="svc reveal" href="' + s.href + '">' + inner + '</a>'
        : '<article class="svc reveal">' + inner + '</article>';
    })
    .join('');

  (function services() {
    const grid = $('#services-grid');
    if (grid) grid.innerHTML = cardsHtml(AKV.services);

    const craft = $('#film-craft');
    if (craft) craft.innerHTML = cardsHtml(AKV.filmCraft);

    const occ = $('#occasions');
    if (occ) occ.innerHTML = AKV.occasions.map((o) => '<li>' + o + '</li>').join('');

    const bk = $('#booking');
    if (bk) {
      bk.innerHTML = AKV.booking
        .map((b) => '<div class="fact reveal"><dt>' + b.label + '</dt><dd>' + b.value + '</dd></div>')
        .join('');
    }
  })();

  /* ---------------------------------------------------------
     The shared viewer. Photographs open as stills; films open
     as a player, and nothing from YouTube loads until a visitor
     actually asks for one.
     --------------------------------------------------------- */
  const viewer = (function () {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.id = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Viewer');
    lb.hidden = true;
    lb.innerHTML =
      '<button class="lightbox__close" id="lb-close" aria-label="Close viewer">&times;</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" id="lb-prev" aria-label="Previous photograph">&#8249;</button>' +
      '<button class="lightbox__nav lightbox__nav--next" id="lb-next" aria-label="Next photograph">&#8250;</button>' +
      '<figure class="lightbox__stage" id="lb-stage">' +
        '<img id="lb-img" alt="">' +
        '<figcaption id="lb-cap"></figcaption>' +
      '</figure>';
    document.body.appendChild(lb);

    const img = $('#lb-img', lb);
    const cap = $('#lb-cap', lb);
    const stage = $('#lb-stage', lb);
    const prev = $('#lb-prev', lb);
    const next = $('#lb-next', lb);

    let list = [];
    let idx = 0;
    let mode = 'photo';
    let lastFocus = null;
    let frame = null;

    const showAt = (i) => {
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      const item = list[idx];
      img.src = item.src;
      img.alt = item.alt || '';
      cap.textContent = item.cap + ' — ' + (idx + 1) + ' of ' + list.length;
      /* fetch the next frame while this one is looked at, so stepping
         through an album never waits on the network */
      if (list.length > 1) new Image().src = list[(idx + 1) % list.length].src;
    };

    const clearFilm = () => {
      if (frame) { frame.remove(); frame = null; }
      img.hidden = false;
    };

    const open = () => {
      lastFocus = document.activeElement;
      lb.hidden = false;
      document.body.classList.add('locked');
      $('#lb-close', lb).focus();
    };

    const close = () => {
      lb.hidden = true;
      document.body.classList.remove('locked');
      img.removeAttribute('src');
      clearFilm();
      if (lastFocus) lastFocus.focus();
    };

    const openPhotos = (items, i) => {
      mode = 'photo';
      list = items;
      clearFilm();
      prev.hidden = next.hidden = items.length < 2;
      open();
      showAt(i);
    };

    const openFilm = (id, label) => {
      mode = 'film';
      list = [];
      prev.hidden = next.hidden = true;
      img.hidden = true;
      img.removeAttribute('src');
      if (frame) frame.remove();
      frame = document.createElement('iframe');
      frame.className = 'lightbox__frame';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      frame.title = label;
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
      stage.insertBefore(frame, cap);
      cap.textContent = label;
      open();
    };

    $('#lb-close', lb).addEventListener('click', close);
    prev.addEventListener('click', () => showAt(idx - 1));
    next.addEventListener('click', () => showAt(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (mode !== 'photo') return;
      if (e.key === 'ArrowLeft') showAt(idx - 1);
      if (e.key === 'ArrowRight') showAt(idx + 1);
    });

    return { openPhotos: openPhotos, openFilm: openFilm };
  })();

  /* ---------------------------------------------------------
     Gallery — filters, lazy batches, viewer
     --------------------------------------------------------- */
  (function gallery() {
    const masonry = $('#masonry');
    if (!masonry) return;

    const LABELS = { w: 'Wedding', r: 'Reception', c: 'Couples & Portraits', m: 'Candid Moment' };
    const BATCH = 40;
    const moreBtn = $('#load-more');
    const filterBox = $('#filters');

    let filter = (filterBox && filterBox.dataset.preset) || 'all';
    let shown = 0;
    let view = [];

    const computeView = () =>
      (view = filter === 'all' ? AKV.gallery.slice() : AKV.gallery.filter((g) => g[1] === filter));

    const asViewerItems = () => view.map((g) => ({
      src: IMG(g[0], 1600),
      alt: LABELS[g[1]] + ' photographed by AKV Photography',
      cap: LABELS[g[1]]
    }));

    const renderBatch = () => {
      const slice = view.slice(shown, shown + BATCH);
      const frag = document.createDocumentFragment();
      slice.forEach((g, i) => {
        const idx = shown + i;
        const b = document.createElement('button');
        b.className = 'shot';
        b.type = 'button';
        b.dataset.i = idx;
        b.setAttribute('aria-label', 'Open photograph ' + (idx + 1) + ' — ' + LABELS[g[1]]);
        b.innerHTML = '<img src="' + IMG(g[0], 450) + '" alt="' + LABELS[g[1]] +
                      ' photographed by AKV Photography" loading="lazy" decoding="async">';
        frag.appendChild(b);
        frameObserver.observe(b);
      });
      masonry.appendChild(frag);
      shown += slice.length;
      if (moreBtn) {
        moreBtn.parentElement.classList.toggle('is-done', shown >= view.length);
        moreBtn.textContent = 'Load more photographs (' + (view.length - shown) + ' left)';
      }
    };

    const resetGallery = () => {
      masonry.innerHTML = '';
      shown = 0;
      computeView();
      renderBatch();
    };

    if (filterBox) {
      filterBox.innerHTML = AKV.galleryFilters
        .map((f) =>
          '<button type="button" role="tab" data-k="' + f.key + '" aria-selected="' +
          (f.key === filter) + '">' + f.label + '</button>')
        .join('');

      filterBox.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-k]');
        if (!b || b.dataset.k === filter) return;
        $$('button', filterBox).forEach((x) => x.setAttribute('aria-selected', String(x === b)));
        filter = b.dataset.k;
        resetGallery();
      });
    }

    if (moreBtn) moreBtn.addEventListener('click', renderBatch);
    resetGallery();

    masonry.addEventListener('click', (e) => {
      const b = e.target.closest('.shot');
      if (b) viewer.openPhotos(asViewerItems(), +b.dataset.i);
    });
  })();

  /* ---------------------------------------------------------
     Films — one renderer, used by the films page and by the
     smaller film rows dropped into the other pages.
     --------------------------------------------------------- */
  const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
               '<path d="M8 5.2v13.6L19 12 8 5.2Z"/></svg>';

  const filmCard = (f) =>
    '<button class="film reveal" type="button" data-id="' + f.id + '" ' +
      'data-label="' + plain(f.couple) + ' — ' + plain(f.title) + '" ' +
      'aria-label="Play the film: ' + plain(f.couple) + ', ' + plain(f.title) + '">' +
      '<div class="film__media">' +
        /* the studio's older uploads have no maxres still; those are
           flagged in the data, and the handler catches any others */
        '<img src="' + (f.hq ? FILM_HQ(f.id) : FILM(f.id)) +
          '" alt="A still from the film of ' + plain(f.couple) +
          '" loading="lazy" decoding="async"' +
          (f.hq ? '' : ' data-hq="' + FILM_HQ(f.id) + '" ' +
            'onerror="if(this.dataset.hq){this.src=this.dataset.hq;this.removeAttribute(\'data-hq\');}"') + '>' +
        '<span class="film__4k">4K</span>' +
        '<span class="film__play" aria-hidden="true">' + PLAY + '</span>' +
      '</div>' +
      '<div class="film__body">' +
        '<h3 class="film__couple">' + f.couple + '</h3>' +
        '<p class="film__title">' + f.title + '</p>' +
      '</div>' +
    '</button>';

  const wireFilmGrid = (grid) => {
    grid.addEventListener('click', (e) => {
      const b = e.target.closest('.film');
      if (b) viewer.openFilm(b.dataset.id, b.dataset.label);
    });
  };

  (function films() {
    /* the full, filterable archive */
    const grid = $('#filmgrid');
    if (grid) {
      const filterBox = $('#film-filters');
      let filter = 'all';

      const render = () => {
        const view = filter === 'all' ? AKV.films : AKV.films.filter((f) => f.kind === filter);
        grid.innerHTML = view.map(filmCard).join('');
        watchReveals(grid);
      };

      if (filterBox) {
        filterBox.innerHTML = AKV.filmFilters
          .map((f, i) =>
            '<button type="button" role="tab" data-k="' + f.key + '" aria-selected="' +
            (i === 0) + '">' + f.label + '</button>')
          .join('');

        filterBox.addEventListener('click', (e) => {
          const b = e.target.closest('button[data-k]');
          if (!b || b.dataset.k === filter) return;
          $$('button', filterBox).forEach((x) => x.setAttribute('aria-selected', String(x === b)));
          filter = b.dataset.k;
          render();
        });
      }

      wireFilmGrid(grid);
      render();
    }

    /* Film grids elsewhere, scoped to a set of kinds:
         data-films="e"              a plain row
         data-films="f,e,c,l"        a pool
         data-filterbar="some-id"    adds a filter bar over that pool
         data-limit="3"              caps the row                        */
    $$('[data-films]').forEach((box) => {
      const kinds = box.dataset.films.split(',').map((s) => s.trim());
      const limit = parseInt(box.dataset.limit, 10) || 0;
      const pool = AKV.films.filter((f) => kinds.indexOf(f.kind) > -1);
      const bar = box.dataset.filterbar ? document.getElementById(box.dataset.filterbar) : null;
      let filter = 'all';

      const paint = () => {
        let list = filter === 'all' ? pool : pool.filter((f) => f.kind === filter);
        if (limit) list = list.slice(0, limit);
        box.innerHTML = list.map(filmCard).join('');
        watchReveals(box);
      };

      if (bar) {
        const keys = ['all'].concat(kinds);
        bar.innerHTML = AKV.filmFilters
          .filter((f) => keys.indexOf(f.key) > -1)
          .map((f) => '<button type="button" role="tab" data-k="' + f.key + '" aria-selected="' +
            (f.key === 'all') + '">' + f.label + '</button>')
          .join('');

        bar.addEventListener('click', (e) => {
          const b = e.target.closest('button[data-k]');
          if (!b || b.dataset.k === filter) return;
          $$('button', bar).forEach((x) => x.setAttribute('aria-selected', String(x === b)));
          filter = b.dataset.k;
          paint();
        });
      }

      wireFilmGrid(box);
      paint();
    });
  })();

  /* ---------------------------------------------------------
     The five couples. A page asks for the ones that belong to
     it with data-couples="stories" or data-couples="traditional".
     --------------------------------------------------------- */
  (function couples() {
    const mount = $('[data-couples]');
    if (!mount) return;

    const which = mount.dataset.couples;
    const set = AKV.couples.filter((c) => c.page === which);
    const FIRST = 12;

    mount.innerHTML = set
      .map((c) =>
        '<article class="couple" id="' + c.slug + '" data-slug="' + c.slug + '">' +
          '<header class="couple__head">' +
            '<div class="reveal">' +
              '<p class="couple__kind">' + c.place + ' &middot; ' + c.kind + '</p>' +
              '<h2 class="couple__name">' + c.couple + '</h2>' +
            '</div>' +
            '<div class="reveal">' +
              '<p class="couple__story">' + c.story + '</p>' +
              '<p class="couple__count">' + c.photos.length + ' photographs from the day</p>' +
              (c.film
                ? '<button class="btn btn--ghost btn--sm couple__film" type="button" ' +
                    'data-film="' + c.film + '" data-label="' + plain(c.couple) + ' — ' +
                    plain(c.filmLabel) + '">' +
                    '<span class="couple__filmicon" aria-hidden="true">' + PLAY + '</span>' +
                    'Watch their film</button>'
                : '') +
            '</div>' +
          '</header>' +
          '<div class="cgrid" data-grid="' + c.slug + '"></div>' +
          '<div class="couple__more"><button class="btn btn--ghost btn--sm" type="button" ' +
            'data-more="' + c.slug + '">See the rest of the album</button></div>' +
        '</article>')
      .join('');

    mount.addEventListener('click', (e) => {
      const f = e.target.closest('[data-film]');
      if (f) viewer.openFilm(f.dataset.film, f.dataset.label);
    });

    set.forEach((c) => {
      const grid = $('[data-grid="' + c.slug + '"]', mount);
      const btn = $('[data-more="' + c.slug + '"]', mount);
      let shown = 0;

      const A = c.album;
      const alt = c.plain + ', photographed in ' + c.place + ' by AKV Photography';
      /* chapter titles, keyed by the frame each one opens on */
      const chapters = {};
      if (A) {
        grid.classList.add('cgrid--story');
        A.chapters.forEach((ch, n) => { chapters[ch.from] = { n: n + 1, title: ch.title }; });
      }

      const items = c.photos.map((f) => ({
        src: A ? ALBUM_FULL(A, f) : PROJ(c.project, f, 1600),
        alt: alt,
        cap: c.plain + ' · ' + c.kind
      }));

      const render = (n) => {
        const slice = c.photos.slice(shown, shown + n);
        const frag = document.createDocumentFragment();
        slice.forEach((f, i) => {
          const idx = shown + i;
          if (A && chapters[idx]) {
            /* close the row before it, so the last frames of a chapter
               keep their height instead of stretching across the page */
            if (idx > 0) frag.appendChild(Object.assign(document.createElement('i'), { className: 'cfill' }));
            const h = document.createElement('p');
            h.className = 'cchap';
            h.innerHTML = '<span>' + String(chapters[idx].n).padStart(2, '0') + '</span>' + chapters[idx].title;
            frag.appendChild(h);
          }
          const b = document.createElement('button');
          b.className = 'cframe';
          b.type = 'button';
          b.dataset.i = idx;
          b.setAttribute('aria-label', 'Open photograph ' + (idx + 1) + ' of ' + c.plain);
          if (A) {
            const r = (f[1] / f[2]).toFixed(4);
            b.style.setProperty('--ar', r);
            b.innerHTML = '<img src="' + ALBUM_SRC(A, f, 640) + '" srcset="' + ALBUM_SRCSET(A, f) + '" ' +
                          'sizes="(min-width:1180px) 34vw, (min-width:720px) 46vw, 70vw" ' +
                          'width="' + f[1] + '" height="' + f[2] + '" alt="' + alt + '" ' +
                          'loading="lazy" decoding="async">';
          } else {
            b.innerHTML = '<img src="' + PROJ(c.project, f, 700) + '" alt="' + alt + '" ' +
                          'loading="lazy" decoding="async">';
          }
          frag.appendChild(b);
          frameObserver.observe(b);
        });
        if (A) {
          grid.querySelectorAll(':scope > .cfill.is-end').forEach((el) => el.remove());
          frag.appendChild(Object.assign(document.createElement('i'), { className: 'cfill is-end' }));
        }
        grid.appendChild(frag);
        shown += slice.length;
        btn.parentElement.classList.toggle('is-done', shown >= c.photos.length);
        btn.textContent = A
          ? 'Continue the story — ' + (c.photos.length - shown) + ' more photographs'
          : 'See the other ' + (c.photos.length - shown) + ' photographs';
      };

      /* a story album opens on whole chapters, so it never stops mid-scene */
      render(A
        ? (A.chapters.map((ch) => ch.from).find((f) => f >= FIRST) || c.photos.length)
        : FIRST);
      btn.addEventListener('click', () => render(c.photos.length));
      grid.addEventListener('click', (e) => {
        const b = e.target.closest('.cframe');
        if (b) viewer.openPhotos(items, +b.dataset.i);
      });
    });
  })();

  /* ---------------------------------------------------------
     Archive frames — sections still waiting on their own set
     --------------------------------------------------------- */
  (function archive() {
    const grid = $('#archive-grid');
    if (!grid) return;

    const items = AKV.archiveFrames.map((src) => ({
      src: src.replace('/800X/', '/1600X/'),
      alt: 'A frame from the AKV Photography archive',
      cap: 'From the studio archive'
    }));

    grid.innerHTML = AKV.archiveFrames
      .map((src, i) =>
        '<button class="cframe" type="button" data-i="' + i + '" ' +
          'aria-label="Open archive photograph ' + (i + 1) + '">' +
          '<img src="' + src.replace('/800X/', '/700X/') + '" ' +
          'alt="A frame from the AKV Photography archive" loading="lazy" decoding="async">' +
        '</button>')
      .join('');

    $$('.cframe', grid).forEach((el) => frameObserver.observe(el));
    grid.addEventListener('click', (e) => {
      const b = e.target.closest('.cframe');
      if (b) viewer.openPhotos(items, +b.dataset.i);
    });
  })();

  /* ---------------------------------------------------------
     Couples, set in type alone — the home page index
     --------------------------------------------------------- */
  (function coupleIndex() {
    const box = $('#cindex');
    if (!box) return;

    box.innerHTML = AKV.couples
      .map((c) => {
        const href = c.page + '.html#' + c.slug;
        return '<a class="cidx reveal" href="' + href + '">' +
          '<p class="cidx__kind">' + c.place + ' &middot; ' + c.kind + '</p>' +
          '<h3 class="cidx__name">' + c.couple + '</h3>' +
          '<p class="cidx__story">' + c.story + '</p>' +
          '<p class="cidx__go">' + c.photos.length + ' photographs ' +
            '<i aria-hidden="true">&rarr;</i></p>' +
        '</a>';
      })
      .join('');
  })();

  /* ---------------------------------------------------------
     Real weddings rail — every couple, each one a link to the
     page that carries their album.
     --------------------------------------------------------- */
  (function rail() {
    const box = $('#rail');
    if (!box) return;

    box.innerHTML = AKV.couples
      .map((c) => {
        const href = c.page + '.html#' + c.slug;
        return '<a class="wed" href="' + href + '">' +
          '<div class="wed__media"><img src="' +
            (c.album ? ALBUM_SRC(c.album, c.photos[c.cover], 1080) : PROJ(c.project, c.cover, 1000)) + '" alt="' +
            c.plain + ', photographed in ' + c.place + ' by AKV Photography" ' +
            'loading="lazy" decoding="async"></div>' +
          '<div class="wed__body">' +
            '<p class="wed__place">' + c.place + ' &middot; ' + c.kind + '</p>' +
            '<h3 class="wed__couple">' + c.couple + '</h3>' +
            '<p class="wed__story">' + c.story + '</p>' +
            '<span class="wed__go">See the album <i aria-hidden="true">&rarr;</i></span>' +
          '</div>' +
        '</a>';
      })
      .join('');

    let down = false, x0 = 0, s0 = 0, moved = 0;
    box.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      down = true; moved = 0; x0 = e.clientX; s0 = box.scrollLeft;
      box.style.cursor = 'grabbing';
    });
    const stop = () => { down = false; box.style.cursor = ''; };
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    box.addEventListener('pointermove', (e) => {
      if (!down) return;
      moved = Math.abs(e.clientX - x0);
      box.scrollLeft = s0 - (e.clientX - x0);
    });
    /* a drag should scroll the rail, not follow the card underneath */
    box.addEventListener('click', (e) => { if (moved > 6) e.preventDefault(); });
  })();

  /* ---------------------------------------------------------
     Testimonials — a page may ask for a shorter set
     --------------------------------------------------------- */
  (function testimonials() {
    const box = $('#says');
    if (!box) return;
    const limit = parseInt(box.dataset.limit, 10);
    const list = limit > 0 ? AKV.testimonials.slice(0, limit) : AKV.testimonials;

    box.innerHTML = list
      .map((t) =>
        '<figure class="say reveal">' +
          '<div class="say__stars" aria-label="Five out of five">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' +
          '<blockquote class="say__q">&ldquo;' + t.quote + '&rdquo;</blockquote>' +
          '<figcaption>' +
            '<p class="say__by">' + t.name + '</p>' +
            '<p class="say__meta">' + t.meta + (t.src ? ' &middot; ' + t.src : '') + '</p>' +
          '</figcaption>' +
        '</figure>')
      .join('');
  })();

  /* ---------------------------------------------------------
     Contact — one form, mounted on every page
     --------------------------------------------------------- */
  (function contact() {
    const host = $('#contact');
    if (!host) return;

    host.innerHTML =
      '<div class="wrap contact__grid">' +
        '<div class="contact__side">' +
          '<p class="eyebrow reveal">Enquire</p>' +
          '<h2 class="h2 reveal">Tell us about<br><em>your day</em></h2>' +
          '<p class="contact__lede reveal">Send the dates and the functions you need covered. ' +
            'We reply with availability and a package built around them.</p>' +
          '<ul class="contact__list reveal">' +
            '<li><b>Call the studio</b><a href="' + C.phoneHref + '">' + C.phone + '</a>' +
              '<a href="' + C.phone2Href + '">' + C.phone2 + '</a></li>' +
            '<li><b>Studio</b><span>' + C.addressLine1 + '<br>' + C.addressLine2 + '<br>' +
              C.addressLine3 + '</span></li>' +
            '<li><b>Hours</b><span>' + C.hours + '</span></li>' +
          '</ul>' +
          '<div class="socrow reveal" data-social="pill"></div>' +
        '</div>' +

        '<form class="form reveal" id="form" novalidate>' +
          '<div class="form__row">' +
            '<div class="field">' +
              '<label for="f-name">Your name <span aria-hidden="true">*</span></label>' +
              '<input id="f-name" name="name" type="text" autocomplete="name" required>' +
              '<p class="field__err" id="e-name" role="alert"></p>' +
            '</div>' +
            '<div class="field">' +
              '<label for="f-phone">Phone <span aria-hidden="true">*</span></label>' +
              '<input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required>' +
              '<p class="field__err" id="e-phone" role="alert"></p>' +
            '</div>' +
          '</div>' +
          '<div class="form__row">' +
            '<div class="field">' +
              '<label for="f-email">Email</label>' +
              '<input id="f-email" name="email" type="email" autocomplete="email">' +
              '<p class="field__err" id="e-email" role="alert"></p>' +
            '</div>' +
            '<div class="field">' +
              '<label for="f-date">Event date</label>' +
              '<input id="f-date" name="date" type="date">' +
              '<p class="field__hint">Not fixed yet? Leave it blank.</p>' +
            '</div>' +
          '</div>' +
          '<div class="field">' +
            '<label for="f-type">What are we shooting?</label>' +
            '<div class="select">' +
              '<select id="f-type" name="type">' +
                '<option>Wedding — photo &amp; video</option>' +
                '<option>Wedding — photo only</option>' +
                '<option>Wedding film only</option>' +
                '<option>Pre-wedding shoot</option>' +
                '<option>Engagement / reception</option>' +
                '<option>Mehendi, haldi or sangeet</option>' +
                '<option>Maternity or newborn</option>' +
                '<option>Baby shower or naming ceremony</option>' +
                '<option>First birthday</option>' +
                '<option>Threading ceremony or house warming</option>' +
                '<option>Portfolio / fashion</option>' +
                '<option>Other function</option>' +
              '</select>' +
            '</div>' +
          '</div>' +
          '<div class="field">' +
            '<label for="f-msg">Anything else we should know?</label>' +
            '<textarea id="f-msg" name="message" rows="4" ' +
              'placeholder="Venue, number of functions, family traditions to cover&hellip;"></textarea>' +
          '</div>' +
          '<button class="btn btn--block" id="submit" type="submit">' +
            '<span class="btn__label">Send enquiry</span>' +
            '<span class="btn__spin" aria-hidden="true"></span>' +
          '</button>' +
          '<p class="form__note" id="form-note" role="status" aria-live="polite"></p>' +
        '</form>' +
      '</div>';

    $$('[data-social]', host).forEach((el) => { el.innerHTML = socialHtml(el.dataset.social); });

    const f = $('#form');
    const btn = $('#submit');
    const note = $('#form-note');

    const setErr = (id, msg) => {
      const field = $('#f-' + id).closest('.field');
      field.classList.toggle('is-bad', !!msg);
      $('#e-' + id).textContent = msg || '';
      return !msg;
    };

    const validate = () => {
      let ok = true;
      const name = $('#f-name').value.trim();
      const phone = $('#f-phone').value.trim();
      const email = $('#f-email').value.trim();

      ok = setErr('name', name.length < 2 ? 'Please tell us your name.' : '') && ok;
      ok = setErr('phone', phone.replace(/\D/g, '').length < 10 ? 'A 10-digit number, please.' : '') && ok;
      ok = setErr('email', email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? 'That email does not look right.' : '') && ok;
      return ok;
    };

    ['name', 'phone', 'email'].forEach((id) => {
      $('#f-' + id).addEventListener('blur', validate);
    });

    f.addEventListener('submit', (e) => {
      e.preventDefault();
      note.textContent = '';
      if (!validate()) {
        const bad = $('.field.is-bad input');
        if (bad) bad.focus();
        note.textContent = 'Please fix the highlighted fields.';
        return;
      }
      const S = CFG;
      const F = S.formFields || {};

      /* Nothing is wired up yet. Rather than accept an enquiry and drop
         it, hand the visitor a channel that works. */
      if (!S.formAction) {
        note.innerHTML = 'The enquiry form is not connected yet &mdash; please call ' +
          '<a href="' + C.phoneHref + '">' + C.phone + '</a> or ' +
          '<a href="' + C.whatsappHref + '" target="_blank" rel="noopener">message the ' +
          'studio on WhatsApp</a>, and we will come back with availability the same day.';
        return;
      }

      btn.classList.add('is-busy');
      $('.btn__label', btn).textContent = 'Sending';

      /* Posted straight to the studio's Google Form, so the response
         lands in their sheet and the visitor never leaves the page.
         The form is opaque by design (no-cors), so a resolved request
         is the only success signal there is. */
      const body = new FormData();
      const add = (key, value) => { if (F[key] && value) body.append(F[key], value); };
      add('name', $('#f-name').value.trim());
      add('phone', $('#f-phone').value.trim());
      add('email', $('#f-email').value.trim());
      add('date', $('#f-date').value);
      add('type', $('#f-type').value);
      add('message', $('#f-msg').value.trim());

      const reset = () => { $('.btn__label', btn).textContent = 'Send enquiry'; };

      fetch(S.formAction, { method: 'POST', mode: 'no-cors', body: body })
        .then(() => {
          btn.classList.remove('is-busy');
          $('.btn__label', btn).textContent = 'Enquiry sent';
          note.textContent = 'Thank you. We will come back to you with availability within one working day.';
          f.reset();
          setTimeout(reset, 4200);
        })
        .catch(() => {
          btn.classList.remove('is-busy');
          reset();
          note.innerHTML = 'That did not go through &mdash; please call ' +
            '<a href="' + C.phoneHref + '">' + C.phone + '</a> or ' +
            '<a href="' + C.whatsappHref + '" target="_blank" rel="noopener">message us ' +
            'on WhatsApp</a> instead.';
        });
    });
  })();

  /* ---------------------------------------------------------
     Founder portrait — the About card keeps an empty 4:5 frame
     until the studio sends a photograph of Anil. Set
     SETUP.founderPhoto and it fills that frame, no layout shift.
     --------------------------------------------------------- */
  (function founder() {
    const slot = $('#founder-portrait');
    if (!slot || !CFG.founderPhoto) return;
    slot.innerHTML = '<img src="' + CFG.founderPhoto + '" alt="' + AKV.brand.founder +
      ', founder of ' + AKV.brand.name + '" loading="lazy" decoding="async">';
    slot.classList.add('is-filled');
    slot.removeAttribute('aria-hidden');
  })();

  /* ---------------------------------------------------------
     Footer
     --------------------------------------------------------- */
  (function footer() {
    const explore = $('#foot-explore');
    if (explore) {
      explore.innerHTML = AKV.nav
        .map((n) => '<a href="' + n.file + '">' + n.label + '</a>')
        .join('');
    }

    const set = (id, fn) => { const el = $(id); if (el) fn(el); };
    set('#foot-tag', (el) => {
      el.textContent = AKV.brand.tagline + '. ' + AKV.brand.promise;
    });
    set('#foot-hours', (el) => { el.textContent = C.hours; });
    set('#foot-addr', (el) => { el.innerHTML = C.addressLine2 + '<br>' + C.addressLine3; });
    set('#foot-map', (el) => { el.href = C.mapHref; });
    set('#foot-phone', (el) => { el.href = C.phoneHref; el.textContent = C.phone; });
    set('#year', (el) => { el.textContent = new Date().getFullYear(); });
  })();

  /* ---------------------------------------------------------
     Go
     --------------------------------------------------------- */
  watchReveals(document);

  /* A deep link should land on its target, clear of the nav pill.
     Album grids above the target settle as their frames arrive, so the
     position is re-applied a couple of times before we let go. */
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      const land = () => window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 108,
        behavior: 'auto'
      });
      requestAnimationFrame(land);
      window.addEventListener('load', land);
      setTimeout(land, 400);
      setTimeout(land, 1200);
    }
  }
})();
