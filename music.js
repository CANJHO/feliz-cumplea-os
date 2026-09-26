(() => {
  const audio = document.getElementById('background-music');
  if (!audio) return;

  const toggle = document.getElementById('music-toggle');
  const storageKey = 'alessia-music-paused';
  let pausedByVisitor = false;
  try { pausedByVisitor = sessionStorage.getItem(storageKey) === 'true'; } catch (_) { /* Local previews may block storage. */ }
  audio.volume = 0.45;

  function rememberPause(value) {
    try {
      if (value) sessionStorage.setItem(storageKey, 'true');
      else sessionStorage.removeItem(storageKey);
    } catch (_) { /* Music still works without storage. */ }
  }

  function updateToggle() {
    if (!toggle) return;
    const playing = !audio.paused;
    toggle.classList.toggle('is-playing', playing);
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pausar música' : 'Activar música');
    toggle.querySelector('.music-label').textContent = playing ? 'Pausar música' : 'Activar música';
  }

  function startMusic() {
    if (pausedByVisitor || !audio.paused) return;
    const attempt = audio.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(updateToggle);
  }

  window.startInvitationMusic = () => {
    pausedByVisitor = false;
    rememberPause(false);
    startMusic();
  };

  audio.addEventListener('play', updateToggle);
  audio.addEventListener('pause', updateToggle);
  toggle?.addEventListener('click', () => {
    if (audio.paused) {
      window.startInvitationMusic();
    } else {
      pausedByVisitor = true;
      rememberPause(true);
      audio.pause();
    }
    updateToggle();
  });

  // Some browsers require the visitor's first interaction before sound can play.
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('#music-toggle')) startMusic();
  }, { passive: true });
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') startMusic();
  });

  updateToggle();
  startMusic();
})();
