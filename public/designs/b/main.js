// Tater Talk · Series 1 — demo, collect-all-7 checklist, barcode
(() => {
  const $ = (s) => document.querySelector(s);
  const out = $("#out"), tape = $("#tape"), status = $("#status"), mode = $("#mode");
  const btnSample = $("#btnSample"), btnMic = $("#btnMic"), fig = document.querySelector(".pushfig");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SAMPLE = "Hello, this is a demonstration of Tater Talk. I talk, and my words appear in the box as I speak. No downloads, no setup. Just talk.";
  let timer = null, rec = null, finalText = "";

  function render(finalPart, interim) {
    out.innerHTML = "";
    const f = document.createTextNode(finalPart);
    out.appendChild(f);
    if (interim) { const s = document.createElement("span"); s.className = "interim"; s.textContent = interim; out.appendChild(s); }
    const c = document.createElement("span"); c.className = "caret"; out.appendChild(c);
    out.scrollTop = out.scrollHeight;
    const all = (finalPart + (interim || "")).trim();
    tape.innerHTML = "<span></span>"; tape.firstChild.textContent = all ? all.slice(-90) : "· · · words print here · · ·";
  }

  function stopAll(msg) {
    clearTimeout(timer); timer = null;
    if (rec) { try { rec.stop(); } catch (e) {} rec = null; }
    btnSample.setAttribute("aria-pressed", "false");
    btnMic.setAttribute("aria-pressed", "false");
    btnSample.querySelector("b").textContent = "Play sample";
    btnMic.querySelector("b").textContent = "Use my mic";
    fig.classList.remove("talking");
    if (msg) status.textContent = msg;
  }

  btnSample.addEventListener("click", () => {
    if (timer) return stopAll("Sample stopped.");
    stopAll();
    mode.textContent = "SAMPLE"; mode.classList.remove("live");
    btnSample.setAttribute("aria-pressed", "true");
    btnSample.querySelector("b").textContent = "Stop sample";
    status.textContent = "Playing a scripted sample. Your mic is off.";
    fig.classList.add("talking");
    const words = SAMPLE.split(" ");
    if (reduce) { render(SAMPLE + " ", ""); return stopAll("Sample shown. Your mic stayed off."); }
    let i = 0;
    const step = () => {
      if (i >= words.length) { render(SAMPLE + " ", ""); return stopAll("That was the sample. Now try your own voice →"); }
      const done = words.slice(0, i).join(" ");
      render(done + (done ? " " : ""), words[i]);
      i++;
      timer = setTimeout(step, 180 + Math.random() * 160);
    };
    step();
  });

  btnMic.addEventListener("click", () => {
    if (rec) return stopAll("Mic off.");
    stopAll();
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      status.innerHTML = 'Your browser has no built-in speech recognition. Try Chrome, or <a href="https://v2.tatertalk.app">open the real app</a>.';
      return;
    }
    mode.textContent = "LIVE MIC"; mode.classList.add("live");
    finalText = "";
    render("", "");
    rec = new SR();
    rec.continuous = true; rec.interimResults = true; rec.lang = navigator.language || "en-US";
    rec.onstart = () => { status.textContent = "Listening. Say something. Click again to stop."; fig.classList.add("talking"); };
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t + " "; else interim += t;
      }
      render(finalText, interim);
    };
    rec.onerror = (e) => {
      const why = e.error === "not-allowed" ? "Mic permission was blocked. Allow the mic and try again."
        : e.error === "no-speech" ? "I heard nothing. Try again a little louder."
        : "The mic stopped (" + e.error + "). The real app may work better: v2.tatertalk.app";
      stopAll(why);
    };
    rec.onend = () => { if (rec) stopAll(finalText ? "Mic off. Like it? Talk now in the real app." : "Mic off."); };
    btnMic.setAttribute("aria-pressed", "true");
    btnMic.querySelector("b").textContent = "Stop mic";
    status.textContent = "Asking your browser for the mic…";
    try { rec.start(); } catch (e) { stopAll("Could not start the mic in this browser."); }
  });

  // ---------- Collect all 7 ----------
  const card = $("#collect"), count = $("#count");
  const got = new Set();
  const mark = (n) => {
    if (got.has(n)) return;
    got.add(n);
    const a = card.querySelector(`[data-f="${n}"]`);
    if (a) { a.classList.add("got"); if (n === "7") a.querySelector("span").textContent = "Gold"; }
    count.textContent = got.size + "/7";
    if (got.size === 7) card.classList.add("full");
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) mark(e.target.dataset.fig); }), { threshold: 0.45 });
    document.querySelectorAll("[data-fig]").forEach((el) => io.observe(el));
  }
  card.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => mark(a.dataset.f)));

  // ---------- Barcode ----------
  const bc = $("#barcode");
  if (bc) {
    const pat = "3121411232113211213113211141123121131211423111";
    [...pat].forEach((d, i) => { const el = document.createElement("i"); el.style.width = d + "px"; el.style.marginRight = ((i * 7) % 3 + 1) + "px"; bc.appendChild(el); });
  }
})();
