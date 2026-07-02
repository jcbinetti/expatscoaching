(function () {
  var L = (document.documentElement.lang === 'de') ? 'de' : 'ru';
  var T = {
    ru: {
      title: 'Костя', sub: 'Бот-ассистент Анны',
      greet: 'Привет! Меня зовут Константин, я бот-ассистент Анны Леоненко. Ты можешь называть меня просто Костя.\n\nЯ помогу тебе сориентироваться на сайте: узнать об услугах, консультациях, тренингах, записи, оплате и даже по вопросам самозанятости в Германии.\n\nЯ отвечаю на основе материалов, опыта и экспертизы Анны, но не заменяю юридическую, налоговую, финансовую или страховую консультацию.\n\nСпроси меня что-нибудь. 😊',
      ph: 'Ваш вопрос…', open: 'Спросить Костю', note: 'ИИ-ассистент · не заменяет проф. консультацию',
      err: 'Упс, что-то пошло не так. Попробуйте ещё раз или напишите Анне.',
      dictate: 'Диктовать голосом', rec: 'Остановить запись', transcribing: 'Распознаю…', micerr: 'Нет доступа к микрофону.'
    },
    de: {
      title: 'Kostja', sub: 'Bot-Assistent von Anna',
      greet: 'Hallo! Ich heiße Konstantin, der Bot-Assistent von Anna Leonenko — du kannst mich einfach Kostja nennen.\n\nIch helfe dir, dich auf der Website zurechtzufinden: Angebote, Beratungen, Trainings, Anmeldung, Bezahlung und sogar Fragen rund um die Selbstständigkeit in Deutschland.\n\nIch antworte auf Basis von Annas Materialien, Erfahrung und Expertise — ersetze aber keine rechtliche, steuerliche, finanzielle oder versicherungsbezogene Beratung.\n\nFrag mich einfach etwas. 😊',
      ph: 'Ihre Frage…', open: 'Kostja fragen', note: 'KI-Assistent · ersetzt keine prof. Beratung',
      err: 'Ups, etwas ging schief. Bitte erneut versuchen oder Anna schreiben.',
      dictate: 'Per Sprache diktieren', rec: 'Aufnahme stoppen', transcribing: 'Erkenne…', micerr: 'Kein Mikrofon-Zugriff.'
    }
  }[L];

  var css = [
    '.ksj-fab{position:fixed;right:20px;bottom:20px;z-index:9998;display:flex;align-items:center;gap:9px;background:#e8932f;color:#fff;border:0;cursor:pointer;font:600 15px/1 -apple-system,Segoe UI,Roboto,Arial,sans-serif;padding:13px 18px;border-radius:999px;box-shadow:0 8px 24px rgba(31,42,46,.28);transition:.2s}',
    '.ksj-fab:hover{background:#cf7d1c;transform:translateY(-1px)}.ksj-fab svg{width:20px;height:20px}',
    '.ksj-panel{position:fixed;right:20px;bottom:20px;z-index:9999;width:370px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 40px);background:#fff;border:1px solid #e3e8f0;border-radius:18px;box-shadow:0 24px 60px rgba(31,42,46,.3);display:none;flex-direction:column;overflow:hidden;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif}',
    '.ksj-panel.open{display:flex}',
    '.ksj-head{background:#27406e;color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px}',
    '.ksj-ava{width:36px;height:36px;border-radius:50%;background:#e8932f;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex:0 0 auto}',
    '.ksj-head .t{font-weight:800;font-size:15px}.ksj-head .s{font-size:11.5px;opacity:.8}',
    '.ksj-x{margin-left:auto;background:none;border:0;color:#fff;font-size:22px;cursor:pointer;line-height:1;opacity:.85}.ksj-x:hover{opacity:1}',
    '.ksj-body{flex:1;overflow-y:auto;padding:16px;background:#f5f7fb;display:flex;flex-direction:column;gap:10px}',
    '.ksj-msg{max-width:84%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}',
    '.ksj-bot{align-self:flex-start;background:#fff;border:1px solid #e3e8f0;color:#1a2233;border-bottom-left-radius:4px}',
    '.ksj-user{align-self:flex-end;background:#27406e;color:#fff;border-bottom-right-radius:4px}',
    '.ksj-typing{align-self:flex-start;color:#5b6678;font-size:13px;font-style:italic;padding:4px 6px}',
    '.ksj-foot{border-top:1px solid #e3e8f0;padding:10px;background:#fff}',
    '.ksj-row{display:flex;gap:8px;align-items:center}',
    '.ksj-in{flex:1;border:1px solid #d9e0ea;border-radius:999px;padding:10px 14px;font:14px -apple-system,Segoe UI,Roboto,Arial;outline:none}',
    '.ksj-in:focus{border-color:#27406e}',
    '.ksj-mic,.ksj-send{border:0;border-radius:50%;width:40px;height:40px;cursor:pointer;font-size:16px;flex:0 0 auto}',
    '.ksj-mic{background:#eef2f8;color:#27406e}',
    '.ksj-mic:hover{background:#e2e9f3}',
    '.ksj-mic.rec{background:#e23b3b;color:#fff;animation:ksjpulse 1.2s infinite}',
    '@keyframes ksjpulse{0%{box-shadow:0 0 0 0 rgba(226,59,59,.5)}70%{box-shadow:0 0 0 8px rgba(226,59,59,0)}100%{box-shadow:0 0 0 0 rgba(226,59,59,0)}}',
    '.ksj-send{background:#e8932f;color:#fff}.ksj-send:disabled,.ksj-mic:disabled{opacity:.5;cursor:default}',
    '.ksj-note{font-size:10.5px;color:#8a93a3;text-align:center;margin-top:7px}'
  ].join('');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var chatIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>';

  var fab = document.createElement('button');
  fab.className = 'ksj-fab'; fab.innerHTML = chatIcon + '<span>' + T.open + '</span>';
  document.body.appendChild(fab);

  var hasMic = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  var micBtn = hasMic ? '<button class="ksj-mic" id="ksjMic" title="' + T.dictate + '" aria-label="' + T.dictate + '">🎤</button>' : '';

  var panel = document.createElement('div');
  panel.className = 'ksj-panel';
  panel.innerHTML =
    '<div class="ksj-head"><div class="ksj-ava">К</div><div><div class="t">' + T.title + '</div><div class="s">' + T.sub + '</div></div><button class="ksj-x" aria-label="close">×</button></div>' +
    '<div class="ksj-body" id="ksjBody"></div>' +
    '<div class="ksj-foot"><div class="ksj-row">' + micBtn + '<input class="ksj-in" id="ksjIn" placeholder="' + T.ph + '" autocomplete="off"><button class="ksj-send" id="ksjSend" aria-label="send">▶</button></div><div class="ksj-note">' + T.note + '</div></div>';
  document.body.appendChild(panel);

  var body = panel.querySelector('#ksjBody');
  var input = panel.querySelector('#ksjIn');
  var sendBtn = panel.querySelector('#ksjSend');
  var mic = panel.querySelector('#ksjMic');
  var convo = [];
  var greeted = false;

  function bubble(text, who) {
    var d = document.createElement('div');
    d.className = 'ksj-msg ' + (who === 'user' ? 'ksj-user' : 'ksj-bot');
    d.textContent = text;
    body.appendChild(d); body.scrollTop = body.scrollHeight;
    return d;
  }
  function openPanel() {
    panel.classList.add('open'); fab.style.display = 'none';
    if (!greeted) { bubble(T.greet, 'bot'); greeted = true; }
    setTimeout(function () { input.focus(); }, 50);
  }
  function closePanel() { panel.classList.remove('open'); fab.style.display = 'flex'; }
  fab.addEventListener('click', openPanel);
  panel.querySelector('.ksj-x').addEventListener('click', closePanel);

  function send() {
    var text = input.value.trim();
    if (!text) return;
    bubble(text, 'user');
    convo.push({ role: 'user', content: text });
    input.value = ''; sendBtn.disabled = true; input.disabled = true;
    var typing = document.createElement('div');
    typing.className = 'ksj-typing'; typing.textContent = '…'; body.appendChild(typing); body.scrollTop = body.scrollHeight;
    fetch('kostja.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: convo }) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        typing.remove();
        if (res.ok && res.j.reply) { bubble(res.j.reply, 'bot'); convo.push({ role: 'assistant', content: res.j.reply }); }
        else { bubble((res.j && res.j.error) ? res.j.error : T.err, 'bot'); }
      })
      .catch(function () { typing.remove(); bubble(T.err, 'bot'); })
      .then(function () { sendBtn.disabled = false; input.disabled = false; input.focus(); });
  }
  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); send(); } });

  // --- Mikrofon-Diktierung (MediaRecorder -> Whisper via transcribe.php) ---
  if (mic) {
    var recorder = null, chunks = [], stream = null, recording = false;
    mic.addEventListener('click', function () {
      if (recording) { stopRec(); return; }
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (s) {
        stream = s; chunks = [];
        recorder = new MediaRecorder(s);
        recorder.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); };
        recorder.onstop = transcribe;
        recorder.start(1000);
        recording = true; mic.classList.add('rec'); mic.textContent = '⏹'; mic.title = T.rec;
      }).catch(function () { bubble(T.micerr, 'bot'); });
    });
    function stopRec() {
      recording = false; mic.classList.remove('rec'); mic.textContent = '🎤'; mic.title = T.dictate;
      try { recorder.stop(); } catch (e) {}
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
    }
    function transcribe() {
      if (!chunks.length) return;
      var blob = new Blob(chunks, { type: (recorder && recorder.mimeType) || 'audio/webm' });
      var prevPh = input.placeholder; input.placeholder = T.transcribing; input.disabled = true; mic.disabled = true;
      var fd = new FormData();
      fd.append('audio', blob, 'audio.webm');
      fd.append('lang', L);
      fetch('transcribe.php', { method: 'POST', body: fd })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && res.j.text) { input.value = (input.value ? input.value + ' ' : '') + res.j.text.trim(); }
          else { bubble((res.j && res.j.error) ? res.j.error : T.err, 'bot'); }
        })
        .catch(function () { bubble(T.err, 'bot'); })
        .then(function () { input.placeholder = prevPh; input.disabled = false; mic.disabled = false; input.focus(); });
    }
  }
})();
