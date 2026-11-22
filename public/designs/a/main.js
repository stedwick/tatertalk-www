(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (id) => document.getElementById(id);

  /* ---------- Altimeter: the menu shows how far you have fallen ---------- */
  const num = $('altiNum'), zone = $('altiZone'), needle = $('altiNeedle'), bar = $('bar');
  const zones = [...document.querySelectorAll('[data-zone]')];
  const stars = document.querySelector('.stars');
  function fmt(m) {
    if (m >= 1000) return Math.round(m / 1000).toLocaleString() + ' km';
    if (m >= 1) return Math.round(m) + ' m';
    return '0 m';
  }
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    const alt = 400000 * Math.pow(1 - p, 3.2);
    num.textContent = p > 0.985 ? '0 m' : fmt(alt);
    const mid = innerHeight * 0.5;
    let z = zones[0];
    for (const el of zones) if (el.getBoundingClientRect().top < mid) z = el;
    zone.textContent = p > 0.985 ? 'Landed' : z.dataset.zone;
    needle.style.transform = `rotate(${180 + (-120 + 240 * (1 - p))}deg)`;
    bar.classList.toggle('warm', p > 0.62);
    if (stars && !reduce) stars.style.transform = `translateY(${scrollY * 0.35}px)`;
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
  // Click the altimeter to drop to the next stage of the trip.
  $('alti').addEventListener('click', () => {
    const next = zones.find((el) => el.getBoundingClientRect().top > 90);
    (next || document.querySelector('.soil')).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ---------- Transmission demo ---------- */
  const stage = document.querySelector('.beam-stage');
  const screenText = $('screenText'), modeTag = $('modeTag'), fall = $('fallLayer'), bot = $('beamBot');
  const playBtn = $('playBtn'), playLabel = $('playLabel');
  const micBtn = $('micBtn'), micLabel = $('micLabel'), micNote = $('micNote');
  const SAMPLE = 'Hello from orbit. This is Tater Talk, turning my voice into text right in the browser. No downloads, no setup. I just talk, and the words land here, ready to paste into an email, a document, or my AI chat.';
  let playing = false, timer = null, rec = null, listening = false;

  function setMode(kind, label) {
    modeTag.className = 'mode-tag ' + (kind || '');
    modeTag.textContent = label;
    stage.classList.toggle('live', kind === 'sample' || kind === 'live');
  }
  function clearScreen() { screenText.textContent = ''; }

  function dropWord(word) {
    const span = document.createElement('span');
    span.className = 'w';
    span.textContent = word + ' ';
    if (reduce || !fall) { screenText.appendChild(span); return; }
    const s = stage.getBoundingClientRect();
    const b = bot.getBoundingClientRect();
    const t = screenText.getBoundingClientRect();
    const f = document.createElement('span');
    f.className = 'fall';
    f.textContent = word;
    fall.appendChild(f);
    const x0 = b.left + b.width * 0.5 - s.left - 20, y0 = b.top + b.height * 0.75 - s.top;
    const x1 = t.left - s.left + 20 + Math.random() * (t.width * 0.6), y1 = t.top - s.top + 30 + Math.min(t.height - 60, screenText.scrollHeight * 0.6);
    const anim = f.animate([
      { transform: `translate(${x0}px,${y0}px) scale(.6)`, opacity: 0 },
      { transform: `translate(${(x0 + x1) / 2}px,${(y0 + y1) / 2}px) scale(1.15)`, opacity: 1, offset: .45 },
      { transform: `translate(${x1}px,${y1}px) scale(.8)`, opacity: 0 }
    ], { duration: 900, easing: 'cubic-bezier(.4,0,.7,1)' });
    anim.onfinish = () => f.remove();
    setTimeout(() => { screenText.appendChild(span); screenText.scrollTop = screenText.scrollHeight; }, 700);
  }

  function stopSample() {
    playing = false; clearTimeout(timer);
    playBtn.classList.remove('on');
    playLabel.textContent = 'Play sample transmission';
  }
  function playSample() {
    if (listening) stopMic();
    if (playing) { stopSample(); setMode('', 'Sample paused'); return; }
    playing = true; clearScreen();
    playBtn.classList.add('on');
    playLabel.textContent = 'Stop sample';
    setMode('sample', 'Sample transmission (scripted)');
    const words = SAMPLE.split(' ');
    let i = 0;
    const step = () => {
      if (!playing) return;
      if (i >= words.length) { stopSample(); setMode('', 'Sample landed'); return; }
      dropWord(words[i++]);
      timer = setTimeout(step, reduce ? 90 : 230 + Math.random() * 120);
    };
    step();
  }
  playBtn.addEventListener('click', playSample);

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function stopMic() {
    listening = false;
    try { rec && rec.stop(); } catch (e) {}
    micBtn.classList.remove('on');
    micLabel.textContent = 'Use my mic';
    if (modeTag.classList.contains('live')) setMode('', 'Mic off');
  }
  function startMic() {
    if (!SR) {
      micNote.textContent = 'Your browser does not offer speech recognition on this page. Try Chrome or Safari, or open the real app at v2.tatertalk.app. The sample above still works.';
      setMode('', 'No mic support here');
      return;
    }
    if (playing) stopSample();
    rec = new SR();
    rec.continuous = true; rec.interimResults = true; rec.lang = navigator.language || 'en-US';
    let finalText = '';
    clearScreen();
    const interim = document.createElement('span'); interim.className = 'interim';
    rec.onresult = (e) => {
      let tmp = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          r[0].transcript.trim().split(/\s+/).forEach((w) => dropWord(w));
          finalText += r[0].transcript;
        } else tmp += r[0].transcript;
      }
      interim.textContent = tmp;
      screenText.appendChild(interim);
    };
    rec.onerror = (e) => {
      const msg = e.error === 'not-allowed' || e.error === 'service-not-allowed'
        ? 'The microphone was blocked. Allow it in your browser\'s address bar and try again.'
        : e.error === 'no-speech' ? 'No speech heard. Try again a little closer to the mic.'
        : 'Speech recognition stopped (' + e.error + '). The real app at v2.tatertalk.app may work better.';
      micNote.textContent = msg;
    };
    rec.onend = () => { if (listening) stopMic(); };
    try {
      rec.start();
      listening = true;
      micBtn.classList.add('on');
      micLabel.textContent = 'Stop my mic';
      setMode('live', 'Live: your mic');
      micNote.textContent = 'Listening. Say a sentence, then watch it land. Nothing is saved on this page.';
      screenText.innerHTML = '<span class="ph">Listening… start talking.</span>';
    } catch (e) {
      micNote.textContent = 'Could not start the microphone here. Try the real app at v2.tatertalk.app.';
    }
  }
  micBtn.addEventListener('click', () => (listening ? stopMic() : startMic()));
  if (!SR) micNote.textContent += ' (Heads up: this browser has no speech recognition, so only the sample will work here.)';

  /* ---------- Launch: 3-2-1 countdown, then off to the app ---------- */
  const launch = $('launchBtn'), launchLabel = $('launchLabel');
  launch.addEventListener('click', (e) => {
    if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || launch.classList.contains('counting')) return;
    e.preventDefault();
    launch.classList.add('counting');
    const seq = ['3…', '2…', '1…', 'Liftoff!'];
    seq.forEach((t, i) => setTimeout(() => { launchLabel.textContent = t; }, i * 650));
    setTimeout(() => { location.href = launch.href; }, seq.length * 650);
  });
})();
