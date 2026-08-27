/* ===========================================================
   AKV Photography — behaviour
   Vanilla. No build step, no dependencies, no third-party embeds.
   =========================================================== */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const C = AKV.contact;

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

  /* ---------------------------------------------------------
     Nav
     --------------------------------------------------------- */
  const nav = $('#nav');
  const burger = $('#burger');
  const menu = $('#mobilemenu');

  const onScrollNav = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  const setMenu = (open) => {
    menu.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('locked', open);
  };
  burger.addEventListener('click', () => setMenu(menu.hidden));
  $$('#mobilemenu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

  $('#mm-ig').href = C.instagram;
  $('#mm-fb').href = C.facebook;

  /* ---------------------------------------------------------
     Hero copy
     --------------------------------------------------------- */
  $('#hero-eyebrow').innerHTML = AKV.hero.eyebrow;
  $('#hero-title').innerHTML =
    AKV.hero.titleA + ' <em>' + AKV.hero.titleItalic + '</em><br>' + AKV.hero.titleB;
  $('#hero-lede').textContent = AKV.hero.body;

  $('#hero-stats').innerHTML = AKV.hero.stats
    .map((s) => '<div><dt>' + s.value + '</dt><dd>' + s.label + '</dd></div>')
    .join('');

  $$('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 220 + i * 120);
  });

  /* ---------------------------------------------------------
     Hero panel — the signature: a contact sheet advancing
     frame by frame, with a film counter tracking the progress.
     --------------------------------------------------------- */
  (function contactSheet() {
    const box = $('#hero-slides');
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
     Film strip marquee
     --------------------------------------------------------- */
  (function strip() {
    const track = $('#strip-track');
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
     Process — sticky stack with scrub
     --------------------------------------------------------- */
  (function process() {
    const stack = $('#stack');
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
     Services
     --------------------------------------------------------- */
  const ICONS = {
    candid: '<path d="M14.5 4h-5L8 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-1.5-3Z"/><circle cx="12" cy="13" r="3.6"/>',
    ritual: '<path d="M12 2.5 14.6 8l6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 19l1.1-6L3.4 8.8 9.4 8 12 2.5Z"/>',
    film:   '<rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="M7 4v16M17 4v16M2 12h20M2 8h5M2 16h5M17 8h5M17 16h5"/>',
    couple: '<path d="M12 20.5s-7.2-4.4-9.1-8.5C1.2 8.3 3.4 4.8 7 4.8c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 5.8 3.5 4.1 7.2-1.9 4.1-9.1 8.5-9.1 8.5Z"/>',
    bloom:  '<path d="M12 12c0-3.4 2.4-6.2 5.4-6.2C17.4 9.2 15 12 12 12Zm0 0c0-3.4-2.4-6.2-5.4-6.2C6.6 9.2 9 12 12 12Zm0 0c3.4 0 6.2 2.4 6.2 5.4C14.8 17.4 12 15 12 12Zm0 0c-3.4 0-6.2 2.4-6.2 5.4C9.2 17.4 12 15 12 12Z"/><circle cx="12" cy="12" r="1.6"/>',
    album:  '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19a1 1 0 0 1 1 1v15.5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 18V5.5Z"/><path d="M4 18a2.5 2.5 0 0 1 2.5-2.5H20"/><path d="M9 3v9l3-2 3 2V3"/>'
  };

  $('#services-grid').innerHTML = AKV.services
    .map((s) =>
      '<article class="svc reveal">' +
        '<div class="svc__icon" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" ' +
            'stroke-linecap="round" stroke-linejoin="round">' + ICONS[s.icon] + '</svg>' +
        '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.body + '</p>' +
      '</article>')
    .join('');

  /* ---------------------------------------------------------
     Gallery — filters, lazy batches, lightbox
     --------------------------------------------------------- */
  const LABELS = { w: 'Wedding', r: 'Reception', c: 'Couples & Portraits', m: 'Candid Moment' };
  const BATCH = 40;
  const masonry = $('#masonry');
  const moreBtn = $('#load-more');
  let filter = 'all';
  let shown = 0;
  let view = [];

  const shotObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      shotObserver.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -4% 0px', threshold: 0.05 });

  const computeView = () =>
    (view = filter === 'all' ? AKV.gallery.slice() : AKV.gallery.filter((g) => g[1] === filter));

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
      shotObserver.observe(b);
    });
    masonry.appendChild(frag);
    shown += slice.length;
    moreBtn.parentElement.classList.toggle('is-done', shown >= view.length);
    moreBtn.textContent = 'Load more photographs (' + (view.length - shown) + ' left)';
  };

  const resetGallery = () => {
    masonry.innerHTML = '';
    shown = 0;
    computeView();
    renderBatch();
  };

  $('#filters').innerHTML = AKV.galleryFilters
    .map((f, i) =>
      '<button type="button" role="tab" data-k="' + f.key + '" aria-selected="' + (i === 0) + '">' +
      f.label + '</button>')
    .join('');

  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-k]');
    if (!b || b.dataset.k === filter) return;
    $$('#filters button').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    filter = b.dataset.k;
    resetGallery();
  });

  moreBtn.addEventListener('click', renderBatch);
  resetGallery();

  /* lightbox */
  const lb = $('#lightbox');
  const lbImg = $('#lb-img');
  const lbCap = $('#lb-cap');
  let lbIndex = 0;
  let lastFocus = null;

  const showAt = (i) => {
    const len = view.length;
    lbIndex = (i + len) % len;
    const g = view[lbIndex];
    lbImg.src = IMG(g[0], 1600);
    lbImg.alt = LABELS[g[1]] + ' photographed by AKV Photography';
    lbCap.textContent = LABELS[g[1]] + ' — ' + (lbIndex + 1) + ' of ' + len;
  };
  const openLb = (i) => {
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.classList.add('locked');
    showAt(i);
    $('#lb-close').focus();
  };
  const closeLb = () => {
    lb.hidden = true;
    document.body.classList.remove('locked');
    lbImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  };

  masonry.addEventListener('click', (e) => {
    const b = e.target.closest('.shot');
    if (b) openLb(+b.dataset.i);
  });
  $('#lb-close').addEventListener('click', closeLb);
  $('#lb-prev').addEventListener('click', () => showAt(lbIndex - 1));
  $('#lb-next').addEventListener('click', () => showAt(lbIndex + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') showAt(lbIndex - 1);
    if (e.key === 'ArrowRight') showAt(lbIndex + 1);
  });

  /* ---------------------------------------------------------
     Real weddings rail
     --------------------------------------------------------- */
  $('#rail').innerHTML = AKV.weddings
    .map((w) =>
      '<article class="wed">' +
        '<div class="wed__media"><img src="' + w.image + '" alt="' + w.couple.replace(/&amp;/g, 'and') +
          ', photographed in Bangalore" loading="lazy" decoding="async"></div>' +
        '<div class="wed__body">' +
          '<p class="wed__place">' + w.place + '</p>' +
          '<h3 class="wed__couple">' + w.couple + '</h3>' +
          '<p class="wed__story">' + w.story + '</p>' +
        '</div>' +
      '</article>')
    .join('');

  (function dragRail() {
    const rail = $('#rail');
    let down = false, x0 = 0, s0 = 0;
    rail.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      down = true; x0 = e.clientX; s0 = rail.scrollLeft;
      rail.style.cursor = 'grabbing';
    });
    const stop = () => { down = false; rail.style.cursor = ''; };
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    rail.addEventListener('pointermove', (e) => {
      if (!down) return;
      rail.scrollLeft = s0 - (e.clientX - x0);
    });
  })();

  /* ---------------------------------------------------------
     Testimonials
     --------------------------------------------------------- */
  $('#says').innerHTML = AKV.testimonials
    .map((t) =>
      '<figure class="say reveal">' +
        '<div class="say__stars" aria-label="Five out of five">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' +
        '<blockquote class="say__q">&ldquo;' + t.quote + '&rdquo;</blockquote>' +
        '<figcaption><p class="say__by">' + t.name + '</p><p class="say__meta">' + t.meta + '</p></figcaption>' +
      '</figure>')
    .join('');

  /* ---------------------------------------------------------
     Pricing
     --------------------------------------------------------- */
  $('#plans').innerHTML = AKV.packages
    .map((p) =>
      '<article class="plan reveal' + (p.featured ? ' plan--hot' : '') + '">' +
        (p.featured ? '<span class="plan__tag">Most booked</span>' : '') +
        '<h3>' + p.name + '</h3>' +
        '<p class="plan__price"><b>&#8377;' + p.price + '</b><i>' + p.unit + '</i></p>' +
        '<ul>' + p.items.map((i) => '<li>' + i + '</li>').join('') + '</ul>' +
        '<a class="btn btn--ghost btn--sm" href="#contact">Enquire</a>' +
      '</article>')
    .join('');

  $('#notes').innerHTML = AKV.packageNotes.map((n) => '<li>' + n + '</li>').join('');

  /* ---------------------------------------------------------
     Contact panel + footer
     --------------------------------------------------------- */
  $('#contact-list').innerHTML =
    '<li><b>Call the studio</b><a href="' + C.phoneHref + '">' + C.phone + '</a></li>' +
    '<li><b>Email</b><a href="mailto:' + C.email + '">' + C.email + '</a></li>' +
    '<li><b>Studio</b><span>' + C.addressLine1 + '<br>' + C.addressLine2 + '<br>' + C.addressLine3 + '</span></li>' +
    '<li><b>Hours</b><span>' + C.hours + '</span></li>';

  $('#contact-social').innerHTML =
    '<a href="' + C.instagram + '" target="_blank" rel="noopener">Instagram</a>' +
    '<a href="' + C.facebook + '" target="_blank" rel="noopener">Facebook</a>' +
    '<a href="' + C.whatsappHref + '" target="_blank" rel="noopener">WhatsApp</a>' +
    '<a href="' + C.mapHref + '" target="_blank" rel="noopener">Directions</a>';

  $('#foot-tag').textContent = AKV.brand.tagline + '. Wedding and lifestyle photography in Bangalore since ' + AKV.brand.since + '.';
  $('#foot-hours').textContent = C.hours;
  $('#foot-addr').innerHTML = C.addressLine2 + '<br>' + C.addressLine3;
  $('#foot-map').href = C.mapHref;
  $('#foot-ig').href = C.instagram;
  $('#foot-fb').href = C.facebook;
  $('#foot-wa').href = C.whatsappHref;
  $('#year').textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Enquiry form
     --------------------------------------------------------- */
  (function form() {
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
      btn.classList.add('is-busy');
      $('.btn__label', btn).textContent = 'Sending';

      /* No backend on a static site — wire this to the studio's form handler. */
      setTimeout(() => {
        btn.classList.remove('is-busy');
        $('.btn__label', btn).textContent = 'Enquiry sent';
        note.textContent = 'Thank you. We will come back to you with availability within one working day.';
        f.reset();
        setTimeout(() => { $('.btn__label', btn).textContent = 'Send enquiry'; }, 4200);
      }, 1100);
    });
  })();

  /* ---------------------------------------------------------
     Go
     --------------------------------------------------------- */
  watchReveals(document);
})();
