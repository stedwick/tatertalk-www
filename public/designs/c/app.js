(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- the desk bell: one synthesized "ding" ---------- */
  let ac;
  function ding() {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const t = ac.currentTime;
      const out = ac.createGain(); out.gain.value = 0.22; out.connect(ac.destination);
      [[2093, 1], [5230, 0.35], [2637, 0.25], [8400, 0.08]].forEach(([f, v]) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (f > 5000 ? 0.6 : 1.8));
        o.connect(g).connect(out); o.start(t); o.stop(t + 2);
      });
    } catch (e) { /* no audio: the bell is silent, the demo still works */ }
  }
  function jiggle(el) { el.classList.remove('jiggle', 'ringing'); void el.offsetWidth; el.classList.add('jiggle', 'ringing'); }

  /* ---------- guest register demo ---------- */
  const ink = $('#ink'), rec = $('#rec'), mode = $('#mode'), note = $('#micNote');
  const sampleBtn = $('#sampleBtn'), micBtn = $('#micBtn');
  const SAMPLE = "Good evening. I'd like a room for one, please. Quiet, near the elevator, and with a desk. Also, could someone remind me to email Dana about Thursday's meeting? Thank you, potato.";
  let timer = null, recog = null, listening = false;

  function setInk(final, interim = '', caret = true) {
    ink.innerHTML = '';
    if (!final && !interim && !caret) { ink.innerHTML = '<span class="placeholder">Your words will appear here…</span>'; return; }
    ink.append(document.createTextNode(final));
    if (interim) { const s = document.createElement('span'); s.className = 'interim'; s.textContent = interim; ink.append(s); }
    if (caret) { const c = document.createElement('span'); c.className = 'caret'; ink.append(c); }
  }
  function stopAll() {
    clearInterval(timer); timer = null;
    sampleBtn.classList.remove('on');
    if (recog && listening) { try { recog.stop(); } catch (e) {} }
    listening = false; micBtn.classList.remove('on'); rec.hidden = true;
  }
  function playSample() {
    stopAll(); ding(); jiggle(sampleBtn);
    mode.textContent = 'Sample entry (scripted)';
    note.textContent = 'This is a scripted sample, not your microphone.';
    sampleBtn.classList.add('on');
    const words = SAMPLE.split(' ');
    let i = 0;
    if (reduce) { setInk(SAMPLE, '', false); sampleBtn.classList.remove('on'); return; }
    setInk('', '', true);
    timer = setInterval(() => {
      i++;
      const done = words.slice(0, i).join(' ');
      const next = i < words.length ? ' ' + words[i] : '';
      setInk(done, next ? next.slice(0, Math.ceil(next.length / 2)) : '', i < words.length);
      if (i >= words.length) { clearInterval(timer); timer = null; sampleBtn.classList.remove('on'); }
    }, 170);
  }
  sampleBtn.addEventListener('click', playSample);

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  micBtn.addEventListener('click', () => {
    if (listening) { stopAll(); note.textContent = 'Stopped. Ring again to keep talking.'; return; }
    stopAll(); ding(); jiggle(micBtn);
    if (!SR) {
      note.textContent = "This browser can't do live speech here. Try Chrome, or open the real app: v2.tatertalk.app. (The sample still works.)";
      return;
    }
    recog = new SR();
    recog.lang = navigator.language || 'en-US';
    recog.continuous = true; recog.interimResults = true;
    let finalText = '';
    recog.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript.trim() + ' ';
        else interim += r[0].transcript;
      }
      setInk(finalText, interim);
    };
    recog.onerror = (e) => {
      note.textContent = e.error === 'not-allowed' || e.error === 'service-not-allowed'
        ? 'Microphone permission was blocked. Allow it in the address bar, or try the real app.'
        : 'The microphone stopped (' + e.error + '). Ring again to retry.';
    };
    recog.onend = () => { listening = false; micBtn.classList.remove('on'); rec.hidden = true; };
    try {
      recog.start(); listening = true;
      micBtn.classList.add('on'); rec.hidden = false;
      mode.textContent = 'Your entry (live mic)';
      note.textContent = 'Listening to your microphone. Speak, then press "Use my mic" again to stop.';
      setInk('', '', true);
    } catch (e) { note.textContent = 'Could not start the microphone here. Try the real app.'; }
  });
  $('#clearBtn').addEventListener('click', () => { stopAll(); mode.textContent = "Tonight's entry"; note.textContent = ''; setInk('', '', false); });

  /* hero bell rings the sample and walks you to the register */
  document.querySelectorAll('[data-ring]').forEach(b => b.addEventListener('click', () => {
    jiggle(b);
    $('#register').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(playSample, reduce ? 0 : 700);
  }));

  /* ---------- lamp pull-chain: night shift / day shift ---------- */
  const chain = $('.chain'), tag = $('.chain-tag');
  let saved = null; try { saved = localStorage.getItem('tt-shift'); } catch (e) {}
  function setShift(day) {
    document.documentElement.dataset.theme = day ? 'day' : 'night';
    chain.setAttribute('aria-pressed', String(day));
    chain.setAttribute('aria-label', day ? 'Pull the lamp chain: switch to night shift (dark mode)' : 'Pull the lamp chain: switch to day shift (light mode)');
    tag.textContent = day ? 'Day shift' : 'Night shift';
    try { localStorage.setItem('tt-shift', day ? 'day' : 'night'); } catch (e) {}
  }
  setShift(saved === 'day');
  chain.addEventListener('click', () => {
    chain.classList.add('tug'); setTimeout(() => chain.classList.remove('tug'), 220);
    setShift(document.documentElement.dataset.theme !== 'day');
  });

  /* ---------- the night passes as you scroll: clock + re-light ---------- */
  const clockTime = $('.clock-time'), face = $('.clock-face');
  function tick() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const t = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    document.documentElement.style.setProperty('--t', t.toFixed(3));
    const mins = Math.round(t * 7 * 60); // midnight → 7:00 AM
    const h = Math.floor(mins / 60), m = mins % 60;
    clockTime.textContent = (h === 0 ? 12 : h) + ':' + String(m).padStart(2, '0') + ' AM';
    face.style.setProperty('--hdeg', ((h % 12) * 30 + m / 2) + 'deg');
    face.style.setProperty('--mdeg', (m * 6) + 'deg');
  }
  addEventListener('scroll', tick, { passive: true }); addEventListener('resize', tick); tick();
})();
