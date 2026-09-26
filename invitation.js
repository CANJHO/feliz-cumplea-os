const eventDate = new Date('2026-09-27T18:00:00-05:00').getTime();
const pad = n => String(n).padStart(2, '0');
function tick() {
  const left = Math.max(0, Math.floor((eventDate - Date.now()) / 1000));
  document.getElementById('days').textContent = pad(Math.floor(left / 86400));
  document.getElementById('hours').textContent = pad(Math.floor(left % 86400 / 3600));
  document.getElementById('minutes').textContent = pad(Math.floor(left % 3600 / 60));
  document.getElementById('seconds').textContent = pad(left % 60);
  if (!left) document.getElementById('countdown').setAttribute('aria-label', '¡Hoy celebramos a Alessia!');
}
tick();
setInterval(tick, 1000);

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.shot').forEach(button => button.addEventListener('click', () => {
  const image = button.querySelector('img');
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightbox.classList.add('open');
  lightbox.querySelector('button').focus();
}));
function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.removeAttribute('src');
}
lightbox.querySelector('button').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
